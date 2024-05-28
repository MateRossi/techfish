import { NotFoundError } from "../error/NotFoundError";
import { Tanque, Especie } from '../model';

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
        } = dadosTanque;

        return Tanque.create({ 
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,    
        });
    };

    static async updateTanque(id: number, dadosAtualizados: Tanque) {
        const tanque = await this.jaExiste(id);
        const { 
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
        } = dadosAtualizados;

        return tanque.update({ 
            nome,
            areaTanque,
            volumeAgua,
            totalPeixes,
        });
    };

    static async deleteTanque(id: number) {
        const tanque = await this.jaExiste(id);;
        return tanque.destroy();
    };

    //metodos de relação entre especie e tanque
    static async addEspecieToTanque(idEspecie: number, idTanque: number) {
        try {
            const especie = await Especie.findByPk(idEspecie);
            const tanque = await Tanque.findByPk(idTanque);

            if (!especie) {
                throw new NotFoundError('Especie não encontrada');
            }
            
            if (!tanque) {
                throw new NotFoundError('Tanque não encontrado');
            }

            await (tanque as any).addEspecie(especie);
            console.log('aq')
            return { message: `Especie ${especie.nome} adicionada no tanque ${tanque.nome}` }
        } catch (err: any) {
            console.error('Erro ao adicionar especie no tanque ', err.message);
            throw err;
        }
    }

    static async jaExiste(id: number) {
        const tanque = await Tanque.findByPk(id);
        if (!tanque) {
            throw new Error('Tanque não encontrado');
        };
        return tanque;
    };
};