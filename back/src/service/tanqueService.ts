import { Sequelize } from "sequelize";
import { NotFoundError } from "../error/NotFoundError";
import { Tanque, Especie, Aparelho, Leitura, User } from '../model';
import { sequelize } from "../db/sequelize";
import { ServerError } from "../error/ServerError";

export class TanqueService {
    static async getAllTanques() {
        return await Tanque.findAll({
            include: [
                {
                    model: Aparelho,
                    as: 'aparelhos',
                    attributes: ['id', 'userId'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'nome', 'email']
                }
            ],
            attributes: ['id', 'nome', 'areaTanque', 'volumeAgua']
        });
    };

    static async getTanquesByUserId(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanques = await Tanque.findAll({
            where: { userId },
            include: [
                {
                    model: Leitura,
                    as: 'leituras',
                    limit: 1,
                    order: [['data_hora', 'DESC']]
                },
                {
                    model: Aparelho,
                    as: 'aparelhos',
                    attributes: ['id'],
                },
            ],
        });

        if (tanques && tanques.length > 0) {
            const tanquesContados = tanques.map(tanque => {
                return {
                    aparelhosNoTanque: tanque?.aparelhos.length || 0,
                    ...tanque.toJSON(),
                }
            })

            return tanquesContados;
        }

        return [];
    };

    static async getUserTanqueById(userId: number, id: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanque = await Tanque.findOne({
            where: { id, userId },
            include: [
                {
                    model: Aparelho,
                    include: [
                        {
                            model: Leitura,
                            limit: 96,
                            order: [['data_hora', 'DESC']]
                        }
                    ],
                },
            ],
        });

        return tanque;
    };

    static async createTanqueByUserId(userId: number, dadosTanque: Tanque) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const {
            nome,
            areaTanque,
            volumeAgua,
        } = dadosTanque;

        return Tanque.create({
            nome,
            areaTanque,
            volumeAgua,
            userId
        });
    };

    static async updateTanqueByUserId(tanqueId: number, userId: number, dadosAtualizados: Tanque, aparelhosParaAdicionar: string[], aparelhosParaRemover: string[]) {
        const transaction = await sequelize.transaction();

        try {
            const user = await User.findByPk(userId, { transaction });

            if (!user) {
                throw new NotFoundError('User não encontrado');
            }

            const tanque = await Tanque.findByPk(tanqueId, { transaction });

            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            await tanque.update(dadosAtualizados, { transaction });

            if (aparelhosParaAdicionar && aparelhosParaAdicionar.length > 0) {
                const aparelhos = await Aparelho.findAll({
                    where: { id: aparelhosParaAdicionar },
                    transaction
                });
                await (tanque as any).addAparelhos(aparelhos, { transaction });
            }

            if (aparelhosParaRemover && aparelhosParaRemover.length > 0) {
                const aparelhos = await Aparelho.findAll({
                    where: { id: aparelhosParaRemover },
                    transaction
                });
                await (tanque as any).removeAparelhos(aparelhos, { transaction });
            }

            await transaction.commit();

            const tanqueAtualizado = await Tanque.findByPk(tanqueId, {
                include: [
                    {
                        model: Leitura,
                        as: 'leituras',
                        separate: true,
                        limit: 1,
                        order: [['data_hora', 'DESC']]
                    },
                    {
                        model: Aparelho,
                        as: 'aparelhos',
                        attributes: ['id'],
                    },
                ],
            });

            return {
                aparelhosNoTanque: tanqueAtualizado?.aparelhos.length || 0,
                ...tanqueAtualizado?.toJSON()
            }
        } catch (error: any) {
            await transaction.rollback();
            throw new ServerError('Erro ao atualizar tanque');
        }
    };

    static async deleteTanqueByUserId(userId: number, idTanque: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanque = await Tanque.findByPk(idTanque);

        if (!tanque) {
            throw new NotFoundError('Tanque não encontrado');
        }

        return await tanque.destroy();
    };

    //métodos de relação entre aparelho e tanque
    static async addAparelhoToTanque(aparelhoId: string, tanqueId: number) {
        const aparelho = await Aparelho.findByPk(aparelhoId);

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        }

        const tanque = await Tanque.findByPk(tanqueId);

        if (!tanque) {
            throw new NotFoundError('Tanque não encontrado');
        }

        const aparelhoTanque = await (tanque as any).addAparelho(aparelho);

        return aparelhoTanque;
    };

    static async getAparelhosFromTanque(tanqueId: number) {
        try {
            const tanque = await Tanque.findByPk(tanqueId);

            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            const aparelhosNoTanque = await (tanque as any).getAparelhos();

            return aparelhosNoTanque;
        } catch (err: any) {
            console.error('Erro ao obter Aparelhos do tanque', err.message);
            throw err;
        }
    };

    static async jaExiste(id: number) {
        const tanque = await Tanque.findOne({
            where: { id },
            include: [
                {
                    model: Aparelho
                },
                {
                    model: Especie
                },
            ],
        });
        if (!tanque) {
            throw new Error('Tanque não encontrado');
        };
        return tanque;
    };

    //métodos mais específicos
    /*static async getUserTanksWithLatestValues(userId: number) {
        const tanques = await Tanque.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Aparelho,
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

    */

    //TRABALHANDO AQUI

    /*
    static async getUserTanksWithLatestValues(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanques = await Tanque.findAll({
            where: { userId },
            include: [
                {
                    model: Aparelho,
                    include: [
                        {
                            model: Leitura,
                            order: [['data_hora', 'DESC']],
                            limit: 1
                        },
                    ],
                },
            ],
        });

        const result = tanques.map(tanque => {
            const aparelhos = tanque.Aparelhos;
            const aparelhosPresentes = aparelhos.length;

            // Iniciando variáveis para somar os valores das leituras
            let phTotal = 0, temperaturaTotal = 0, orpTotal = 0, tdsTotal = 0, o2Total = 0, o2MgTotal = 0, turbidezTotal = 0;
            let leituraCount = 0;

            aparelhos.forEach(aparelho => {
                const leitura = aparelho.Leituras[0];
                if (leitura) {
                    phTotal += leitura.ph;
                    temperaturaTotal += leitura.temperatura;
                    orpTotal += leitura.orp;
                    tdsTotal += leitura.tds;
                    o2Total += leitura.o2;
                    o2MgTotal += leitura.o2_mg;
                    turbidezTotal += leitura.turbidez;
                    leituraCount++;
                }
            });

            // Calculando médias
            const mediaDasLeituras = leituraCount > 0 ? {
                ph: (phTotal / leituraCount).toFixed(2),
                temperatura: (temperaturaTotal / leituraCount).toFixed(2),
                orp: (orpTotal / leituraCount).toFixed(2),
                tds: (tdsTotal / leituraCount).toFixed(2),
                o2: (o2Total / leituraCount).toFixed(2),
                o2_mg: (o2MgTotal / leituraCount).toFixed(2),
                turbidez: (turbidezTotal / leituraCount).toFixed(2)
            } : null;

            return {
                id: tanque.id,
                nome: tanque.nome,
                areaTanque: tanque.areaTanque,
                volumeAgua: tanque.volumeAgua,
                userId: tanque.userId,
                createdAt: tanque.createdAt,
                updatedAt: tanque.updatedAt,
                aparelhosPresentes,
                mediaDasLeituras
            };
        });

        return result;
    }
        */

};