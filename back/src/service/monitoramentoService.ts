import Monitoramento from "../model/Monitoramento";

export class MonitoramentoService {
    static async getAllMonitoramentos() {
        return Monitoramento.findAll();
    };

    static async getMonitoramentoById(id: number) {
        const monitoramento = await this.jaExiste(id);
        return monitoramento;
    };

    static async createMonitoramento(dadosMonitoramento: Monitoramento) {
        const { 
            id_cliente,
            id_aparelho,
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        } = dadosMonitoramento;

        return Monitoramento.create({ 
            id_cliente,
            id_aparelho,
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

    static async updateMonitoramento(id: number, dadosAtualizados: Monitoramento) {
        const monitoramento = await this.jaExiste(id);
        const { 
            id_cliente,
            id_aparelho,
            data_hora,
            ph,
            temperatura,
            orp,
            tds,
            o2,
            o2_mg,
            turbidez,
        } = dadosAtualizados;

        return monitoramento.update({ 
            id_cliente,
            id_aparelho,
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

    static async deleteMonitoramento(id: number) {
        const monitoramento = await this.jaExiste(id);;
        return monitoramento.destroy();
    };

    static async jaExiste(id: number) {
        const monitoramento = await Monitoramento.findByPk(id);
        if (!monitoramento) {
            throw new Error('Dados de monitoramento não encontrados');
        };
        return monitoramento;
    };
};