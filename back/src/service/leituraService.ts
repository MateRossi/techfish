import { Op } from "sequelize";
import Leitura from "../model/Leitura";
import { Aparelho, Tanque } from "../model";
import { NotFoundError } from "../error/NotFoundError";
import { PreconditionError } from "../error/PreconditionError";

export class LeituraService {
    static async getAllLeituras(page = 1, limit = 50) {
        const offset = (page - 1) * limit;
        return await Leitura.findAll({
            limit: limit,
            offset
        });
    };

    static async getLeituraById(id: number) {
        const leitura = await this.jaExiste(id);
        return leitura;
    };

    static async getLeiturasByAparelhoIdTanqueId(page = 1, limit = 96, aparelhoId: string, tanqueId: number) {
        const offset = (page - 1) * limit;
        return await Leitura.findAll({
            where: { aparelhoId, tanqueId },
            limit: limit,
            offset,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    };

    static async createLeitura(dadosLeitura: Leitura, aparelhoId: string) {
        const {
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        } = dadosLeitura;

        const aparelho = await Aparelho.findByPk(aparelhoId);

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        }

        if (!aparelho.tanqueId) {
            throw new PreconditionError('O Aparelho não está associado a um Tanque. Não é possível salvar a leitura.');
        }

        const leitura = await Leitura.create({
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
            aparelhoId,
            tanqueId: aparelho.tanqueId
        });

        return leitura;
    }

    static async updateLeitura(id: number, dadosAtualizados: Leitura, aparelhoId: string) {
        const leitura = await this.jaExiste(id);
        const {
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        } = dadosAtualizados;

        return leitura.update({
            aparelhoId,
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        });
    };

    static async deleteLeitura(id: number) {
        const leitura = await this.jaExiste(id);;
        return leitura.destroy();
    };

    static async getLeiturasPorData(data: string) {
        if (!data) {
            throw new Error('Erro ao filtrar, data inválida');
        };
        const dataAlvo = new Date(data);
        const fimDia = new Date(dataAlvo);
        fimDia.setDate(dataAlvo.getDate() + 1);
        const { count, rows } = await Leitura.findAndCountAll({
            where: {
                data_hora: {
                    [Op.between]: [dataAlvo, fimDia],
                },
            },
        });

        return { count, rows };
    };

    //métodos de consulta às leituras de monitoramento de um aparelho.
    static async getUltimasLeiturasPorAparelhoId(aparelhoId: string) {
        const aparelho = await Aparelho.findByPk(aparelhoId);

        if (!aparelho) {
            throw new NotFoundError('Aparelho não encontrado');
        }

        const leituras = await Leitura.findAll({
            where: { aparelhoId },
            order: [['data_hora', 'DESC']],
            limit: 96,
            attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
        });

        return leituras.reverse();
    };

    static async getLeiturasMensaisPorAparelhoId(aparelhoId: string) {
        return 'teste'
    }

    static async jaExiste(id: number) {
        const leitura = await Leitura.findByPk(id);
        if (!leitura) {
            throw new Error('Dados de leitura não encontrados');
        };
        return leitura;
    };
};