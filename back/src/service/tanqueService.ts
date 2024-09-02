import { NotFoundError } from "../error/NotFoundError";
import { Tanque, Especie, Aparelho, Leitura, AparelhosTanque, User } from '../model';

export class TanqueService {
    static async getAllTanques() {
        return Tanque.findAll();
    };

    static async getUserTanqueById(userId: number, id: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanque = await Tanque.findOne({
            where: { id, userId: userId },
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

                //ALTERAR AQUI - ESPECIE NAO ESTÁ MAIS ASSOCIADA AO TANQUE
                {
                    model: Especie
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

    static async updateTanqueByUserId(id: number, userId: number, dadosAtualizados: Tanque) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const tanque = await Tanque.findOne({
            where: { id, userId: userId },
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
                {
                    model: Especie
                },
            ],
        });

        if (!tanque) {
            throw new NotFoundError('Tanque não encontrado');
        }

        const {
            nome,
            areaTanque,
            volumeAgua,
        } = dadosAtualizados;

        return tanque.update({
            nome,
            areaTanque,
            volumeAgua,
        });
    };

    static async deleteTanqueByUserId(userId: number, idTanque: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const tanque = await this.jaExiste(idTanque);
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

    static async getEspeciesFromTanque(tanqueId: number) {
        try {
            const tanque = await Tanque.findByPk(tanqueId);

            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            const especiesNoTanque = await (tanque as any).getEspecies();

            return especiesNoTanque;
        } catch (err: any) {
            console.error('Erro ao obter especies do tanque', err.message);
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
    
};