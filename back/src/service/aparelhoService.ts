import { NotFoundError } from "../error/NotFoundError";
import { Aparelho, Leitura, User } from '../model';

export class AparelhoService {
    static async getAllAparelhos() {
        return await Aparelho.findAll({
            include: {
                model: User,
                attributes: ['nome', 'email']
            }
        });
    };

    static async getAparelhoById(id: string) {
        const aparelho = await this.jaExiste(id);
        return aparelho;
    };

    static async getAparelhosByUserId(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        };

        return await Aparelho.findAll({
            where: { userId }
        });
    };

    static async getAparelhoByUserId(userId: number, aparelhoId: string) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        };

        const aparelho = await Aparelho.findOne({
            where: { userId, id_aparelho_es: aparelhoId }
        });

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        };

        return aparelho;
    };

    static async createAparelho(userId: number, aparelhoId: string) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await Aparelho.create({
            id_aparelho_es: aparelhoId,
            userId
        });
    };

    static async updateAparelho(id: string, dadosAtualizados: Aparelho) {
        const aparelho = await this.jaExiste(id);
        const {
            id_aparelho_es,
            userId
        } = dadosAtualizados;

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await aparelho.update({
            id_aparelho_es,
            userId   
        });
    };

    static async deleteAparelhoByUserId(userId: number, aparelhoId: string) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const aparelho = await Aparelho.findOne({
            where: { userId, id_aparelho_es: aparelhoId }
        });

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        }

        return await aparelho.destroy();
    };

    static async jaExiste(id: string) {
        const aparelho = await Aparelho.findByPk(id);
        if (!aparelho) {
            throw new Error('Aparelho não encontrado');
        };
        return aparelho;
    };
};