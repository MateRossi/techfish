import { sequelize } from "../db/sequelize";
import { NotFoundError } from "../error/NotFoundError";
import { Especie, Producao, Tanque, User } from "../model";

export class ProducaoService {
    static async getUserProductions(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        return await Producao.findAll({
            where: { userId },
            //include?
        });
    };

    static async getUserProduction(userId: number, id: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        return await Producao.findOne({
            where: { userId, id },
            //include?
        });
    };

    static async createProducao(dadosProducao: Producao) {
        const {
            userId,
            tanqueId,
            especieId,
            idadeInicial,
            pesoMedioIndividualInicial,
            quantidadeEstimadaPeixes,
        } = dadosProducao;

        //calcular o peso total incial antes de cadastrar.
        const pesoTotalInicial = pesoMedioIndividualInicial * quantidadeEstimadaPeixes;

        const [user, tanque, especie] = await Promise.all([
            User.findByPk(userId),
            Tanque.findByPk(tanqueId),
            Especie.findByPk(especieId),
        ]);

        // Verificações de erro
        if (!user) throw new NotFoundError('Usuário não encontrado.');
        if (!tanque) throw new NotFoundError('Tanque não encontrado.');
        if (!especie) throw new NotFoundError('Espécie não encontrada.');

        return await Producao.create({
            userId,
            tanqueId,
            especieId,
            idadeInicial,
            pesoMedioIndividualInicial,
            quantidadeEstimadaPeixes,
            pesoTotalInicial,
        });
    }

}