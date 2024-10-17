import { NotFoundError } from "../error/NotFoundError";
import { User } from "../model";
import Transacao from "../model/Transacao";

export class TransacaoService {
    static async getTransacoesByUserId(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await Transacao.findAll({
            where: { userId }
        });
    };

    static async getTransacaoByUserId(userId: number, transacaoId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await Transacao.findOne({
            where: {
                userId,
                id: transacaoId,
            }
        });
    };

    static async createTransacaoByUserId(userId: number, transacao: Transacao) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const {
            tipo,
            descricao
        } = transacao;

        let valor = transacao.valor;

        if (tipo === 'DESPESA') {
            valor = valor * -1;
        }

        return await Transacao.create({
            tipo,
            valor,
            descricao,
            userId,
        });
    };

    static async updateTransacaoByUserId(userId: number, transacaoId: number, dadosAtualizados: Partial<Transacao>) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const transacao = await Transacao.findOne({
            where: { userId, id: transacaoId }
        });

        if (!transacao) {
            throw new NotFoundError('Transação não encontrada.')
        }

        const {
            tipo,
            valor,
            descricao
        } = dadosAtualizados;

        return await transacao.update({
            tipo,
            valor,
            descricao,
        });
    };

    static async deleteTransacaoByUserId(userId: number, transacaoId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const transacao = await Transacao.findOne({
            where: { userId, id: transacaoId }
        });

        if (!transacao) {
            throw new NotFoundError('Transação não encontrada.')
        }

        return await transacao.destroy();
    }
}