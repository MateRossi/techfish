import { NotFoundError } from "../error/NotFoundError";
import { Fase, User } from '../model';

export class FaseService {
    static async getAllFases() {
        return Fase.findAll();
    };

    static async getFaseById(id: number) {
        const fase = await this.jaExiste(id);
        return fase;
    };

    static async getFasesByUserId(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const fases = await Fase.findAll({
            where: { userId }
        });
        return fases;
    }

    static async getFaseByUserId(userId: number, id: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const fase = await Fase.findAll({
            where: { userId, id }
        });
        return fase;
    }

    static async createFase(dadosFase: Fase) {
        const {
            nome,
            instrucoes,
            ordem,
            userId,
        } = dadosFase;

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return Fase.create({
            nome,
            instrucoes,
            ordem,
            userId,
        });
    };

    static async createFaseByUserId(userId: number, dadosFase: Fase) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const {
            nome,
            instrucoes,
            ordem,
        } = dadosFase;

        return Fase.create({
            nome,
            instrucoes,
            ordem,
            userId,
        });
    };

    static async updateFase(id: number, dadosAtualizados: Fase) {
        const fase = await this.jaExiste(id);
        const {
            nome,
            instrucoes,
            ordem,
            userId,
        } = dadosAtualizados;

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return fase.update({
            nome,
            instrucoes,
            ordem,
            userId,
        });
    };

    static async updateFaseByUserId(id: number, userId: number, dadosAtualizados: Fase) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const fase = await this.jaExiste(id);
        const {
            nome,
            instrucoes,
            ordem,
        } = dadosAtualizados;

        return fase.update({
            nome,
            instrucoes,
            ordem,
        });
    };

    static async deleteFase(id: number) {
        const fase = await this.jaExiste(id);
        return fase.destroy();
    };

    static async deleteFaseByUserId(id: number, userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const fase = await this.jaExiste(id);
        return fase.destroy();
    }

    static async jaExiste(id: number) {
        const fase = await Fase.findByPk(id);
        if (!fase) {
            throw new Error('Fase não encontrada');
        };
        return fase;
    };
};