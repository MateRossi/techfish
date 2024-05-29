import { NotFoundError } from "../error/NotFoundError";
import { Tanque, Especie, Aparelho, Leitura, AparelhosTanque } from '../model';

export class TanqueService {
    static async getAllTanques() {
        return Tanque.findAll();
    };

    static async getTanqueById(id: number) {
        const tanque = await this.jaExiste(id);
        return tanque;
    };

    static async createTanque(dadosTanque: Tanque) {
        const {
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
            userId
        } = dadosTanque;

        return Tanque.create({
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
            userId
        });
    };

    static async updateTanque(id: number, dadosAtualizados: Tanque) {
        const tanque = await this.jaExiste(id);
        const {
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
            userId
        } = dadosAtualizados;

        return tanque.update({
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
            userId,
        });
    };

    static async deleteTanque(id: number) {
        const tanque = await this.jaExiste(id);;
        return tanque.destroy();
    };

    //metodos de relação entre especie e tanque
    static async addEspecieToTanque(especieId: number, tanqueId: number) {
        try {
            const especie = await Especie.findByPk(especieId);
            const tanque = await Tanque.findByPk(tanqueId);

            if (!especie) {
                throw new NotFoundError('Especie não encontrada');
            }

            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            await (tanque as any).addEspecie(especie);

            return { message: `Especie ${especie.nome} adicionada no tanque ${tanque.nome}` }
        } catch (err: any) {
            console.error('Erro ao adicionar especie no tanque ', err.message);
            throw err;
        }
    };

    //métodos de relação entre aparelho e tanque
    static async addAparelhoToTanque(aparelhoId: string, tanqueId: number) {
        try {
            const aparelho = await Aparelho.findByPk(aparelhoId);
            console.log(aparelho);
            const tanque = await Tanque.findByPk(tanqueId);

            if (!aparelho) {
                throw new NotFoundError('Aparelho não encontrado');
            }

            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            await (tanque as any).addAparelho(aparelho);

            return { message: `Aparelho ${aparelho.id_aparelho_es} adicionado ao tanque ${tanque.nome}` }
        } catch (err: any) {
            console.error('Erro ao adicionar aparelho ao tanque ', err.message);
            throw err;
        }
    };

    static async jaExiste(id: number) {
        const tanque = await Tanque.findOne({
            where: {id},
            include: {
                model: Aparelho,
            },
        });
        if (!tanque) {
            throw new Error('Tanque não encontrado');
        };
        return tanque;
    };

    //métodos mais específicos
    static async getUserTanksWithLatestValues(userId: number) {
        const tanques = await Tanque.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Aparelho,
                    attributes: {exclude: ['AparelhosTanque', 'createdAt', 'updatedAt']},
                    include: [
                        {
                            model: Leitura,
                            order: [['data_hora', 'DESC']],
                            limit: 1,                            
                        },
                    ],
                },
            ],
        });
        return tanques;
    };
};