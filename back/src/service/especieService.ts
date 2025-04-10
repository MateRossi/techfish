import { NotFoundError } from "../error/NotFoundError";
import { User } from "../model";
import Especie from "../model/Especie";

export class EspecieService {
    static async getAllEspecies() {
        return Especie.findAll();
    };

    static async getEspecieById(id: number) {
        const especie = await this.jaExiste(id);
        return especie;
    };

    static async getEspeciesByUserId(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await Especie.findAll({
            where: {
                userId
            }
        });
    };

    static async getEspecieByUserId(userId: number, especieId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return Especie.findOne({
            where: { userId, id: especieId }
        });
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
            imgUrl,
            userId,
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
            imgUrl,
            userId
        });
    };

    static async createEspecieByUserId(userId: number, dadosEspecie: Especie) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const { 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,
            imgUrl,
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
            imgUrl,
            userId 
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
            imgUrl,
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
            imgUrl,
        });
    };

    static async updateEspecieByUserId(userId: number, especieId: number, dadosAtualizados: Especie) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const especie = await this.jaExiste(especieId);
        const { 
            nome,
            phIdeal,
            temperaturaIdeal,
            orpIdeal,
            tdsIdeal,
            o2Ideal,
            o2_mgIdeal,
            turbidezIdeal,
            imgUrl,
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
            imgUrl,
        });
    };

    static async deleteEspecie(id: number) {
        const especie = await this.jaExiste(id);;
        return especie.destroy();
    };

    static async deleteEspecieByUserId(userId: number, especieId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const especie = await this.jaExiste(especieId);
        return especie.destroy();
    };

    static async uploadEspecieImage(especieId: number, imgUrl: string) {
        const especie = await Especie.findByPk(especieId);

        if (!especie) {
            throw new NotFoundError('Especie não encontrada.');
        }

        especie.imgUrl = imgUrl;

        return await especie.save({ fields: ['imgUrl'] });
    }

    static async jaExiste(id: number) {
        const especie = await Especie.findByPk(id);
        if (!especie) {
            throw new Error('Especie não encontrada');
        };
        return especie;
    };
};