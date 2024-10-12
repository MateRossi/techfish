import { NotFoundError } from "../error/NotFoundError";
import { Fase } from '../model';

export class FaseService {
    static async getAllFases() {
        return await Fase.findAll();
    };

    static async getFaseById(id: number) {
        const fase = await this.jaExiste(id);
        return fase;
    };

    static async createFase(dadosFase: Fase) {
        const {
            nome,
            instrucoes,
        } = dadosFase;

        return await Fase.create({
            nome,
            instrucoes,
        });
    };

    static async updateFase(id: number, dadosAtualizados: Fase) {
        const fase = await this.jaExiste(id);
        const {
            nome,
            instrucoes,
        } = dadosAtualizados;

        return await fase.update({
            nome,
            instrucoes,
        });
    };

    static async deleteFase(id: number) {
        const fase = await this.jaExiste(id);
        return await fase.destroy();
    };

    static async jaExiste(id: number) {
        const fase = await Fase.findByPk(id);
        if (!fase) {
            throw new NotFoundError('Fase não encontrada');
        };
        return fase;
    };
};