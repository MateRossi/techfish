import { NotFoundError } from "../error/NotFoundError";
import { Aparelho, Leitura, User } from '../model';

export class AparelhoService {
    static async getAllAparelhos() {
        return Aparelho.findAll({
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

    static async createAparelho(dadosAparelho: Aparelho) {
        const {
            id_aparelho_es,
            userId
        } = dadosAparelho;

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return Aparelho.create({
            id_aparelho_es,
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

        return aparelho.update({
            id_aparelho_es,
            userId   
        });
    };

    static async deleteAparelho(id: string) {
        const aparelho = await this.jaExiste(id);;
        return aparelho.destroy();
    };

    static async jaExiste(id: string) {
        const aparelho = await Aparelho.findByPk(id);
        if (!aparelho) {
            throw new Error('Aparelho não encontrado');
        };
        return aparelho;
    };
};