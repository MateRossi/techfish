import Especie from "../model/Especie";

export class EspecieService {
    static async getAllEspecies() {
        return Especie.findAll();
    };

    static async getEspecieById(id: number) {
        const especie = await this.jaExiste(id);
        return especie;
    };

    static async createEspecie(dadosEspecie: Especie) {
        const { 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,
        } = dadosEspecie;

        return Especie.create({ 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,    
        });
    };

    static async updateEspecie(id: number, dadosAtualizados: Especie) {
        const especie = await this.jaExiste(id);
        const { 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,
        } = dadosAtualizados;

        return especie.update({ 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,
        });
    };

    static async deleteEspecie(id: number) {
        const especie = await this.jaExiste(id);;
        return especie.destroy();
    };

    static async jaExiste(id: number) {
        const especie = await Especie.findByPk(id);
        if (!especie) {
            throw new Error('Especie não encontrada');
        };
        return especie;
    };
};