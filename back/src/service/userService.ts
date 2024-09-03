import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import User from "../model/User";
import bcrypt from 'bcrypt';

export class UserService {
    static async getAllUsers() {
        return User.findAll({
            attributes: { exclude: ['senha', 'role', 'refreshToken'] },
        });
    };

    static async getUserById(id: number) {
        const user = await this.jaExiste(id);
        return user;
    };

    static async getUserByRefreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error ('Token inválido');
        }

        const user = await User.findOne({
            where: { refreshToken },
        });
        
        return user;
    };

    static async createUser(dadosUser: User) {
        const { nome, email, senha } = dadosUser;

        return User.create({ nome, email, senha });
    };

    static async updateUser(id: number, dadosAtualizados: User) {
        const user = await this.jaExiste(id);
        const { nome, email } = dadosAtualizados;

        return user.update({ nome, email });
    };

    static async deleteUser(id: number) {
        const user = await this.jaExiste(id);
        return user.destroy();
    };

    static async register(nome: string, email: string, senha: string, confirmarSenha: string) {
        if (senha !== confirmarSenha) {
            throw new UnauthorizedError('As senhas devem coincidir');
        }
        
        const hashedSenha = await bcrypt.hash(senha, 10);

        return User.create({ nome, email, senha: hashedSenha });
    }

    static async login(email: string, senha: string) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedError('Acesso não autorizado. Verifique seu login ou senha.');
        };

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            throw new UnauthorizedError('Acesso não autorizado. Verifique seu login ou senha.');
        };

        return user;
    };

    static async updateUserPassword(id: number, senhaAnterior: string, novaSenha: string) {
        const user = await this.jaExiste(id);
        
        if (!novaSenha || !senhaAnterior) {
            throw new Error('As senhas não podem ser nulas.'); 
        }

        if (novaSenha === user.senha) {
            throw new Error('A sua nova senha não pode ser igual à sua antiga senha.');
        }

        const isPasswordValid = await bcrypt.compare(senhaAnterior, user.senha);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Senha incorreta.');
        }

        try {
            const hashedPassword = await bcrypt.hash(novaSenha, 10);
            user.senha = hashedPassword;
        } catch (err: any) {
            throw new Error(`Erro ao encriptar senha ${err.message}`);
        }
        
        return user.save({ fields: ['password'] });
    };

    static async jaExiste(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError('Dados de usuário não encontrados');
        };
        return user;
    };
}