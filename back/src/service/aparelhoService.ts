import { NotFoundError } from "../error/NotFoundError";
import { Aparelho, Leitura, Tanque, User } from '../model';

export class AparelhoService {
    static async getAllAparelhos() {
        return await Aparelho.findAll({
            include: {
                model: User,
                attributes: ['nome', 'email']
            },
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
            where: { userId },
            include: [
                {
                    model: Tanque,
                    as: 'tanque',
                    attributes: ['nome'],
                }
            ]
        });
    };

    static async getAparelhoByUserId(userId: number, aparelhoId: string) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        };

        const aparelho = await Aparelho.findOne({
            where: { userId, id: aparelhoId }
        });

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        };

        return aparelho;
    };

    static async createAparelho(dadosAparelho: Aparelho) {
        const {
            userId,
            id,
            tanqueId
        } = dadosAparelho;
        
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if (tanqueId) {
            const tanque = await Tanque.findByPk(tanqueId);
            
            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }
        };

        return await Aparelho.create({
            id,
            userId,
            tanqueId
        });
    };

    static async updateAparelho(aparelhoId: string, userId: number) {
        const aparelho = await this.jaExiste(aparelhoId);

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await aparelho.update({
            aparelhoId,
            userId   
        });
    };

    //verificar AQUI.
    static async deleteAparelhoByUserId(userId: number, aparelhoId: string) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const aparelho = await Aparelho.findOne({
            where: { userId, id: aparelhoId }
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