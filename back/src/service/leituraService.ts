import { Op } from "sequelize";
import Leitura from "../model/Leitura";
import { sequelize } from "../db/sequelize";

export class LeituraService {
    static async getAllLeituras() {
        return Leitura.findAll();
    };

    static async getLeituraById(id: number) {
        const leitura = await this.jaExiste(id);
        return leitura;
    };

    static async createLeitura(dadosLeitura: Leitura) {
        const { 
            id_aparelho_es,
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        } = dadosLeitura;

        return Leitura.create({ 
            id_aparelho_es,
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

    static async updateLeitura(id: number, dadosAtualizados: Leitura) {
        const leitura = await this.jaExiste(id);
        const { 
            id_aparelho_es,
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
            id_aparelho_es,
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
            throw new Error ('Erro ao filtrar, data inválida');
        };
        const dataAlvo = new Date(data);
        const fimDia = new Date(dataAlvo);
        fimDia.setDate(dataAlvo.getDate() + 1);
        const {count, rows} = await Leitura.findAndCountAll({
            where: {
                data_hora: {
                    [Op.between]: [dataAlvo, fimDia],
                },
            },
        });

        return { count, rows };
    };

    static async jaExiste(id: number) {
        const leitura = await Leitura.findByPk(id);
        if (!leitura) {
            throw new Error('Dados de leitura não encontrados');
        };
        return leitura;
    };
};