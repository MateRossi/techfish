import { NotFoundError } from "../error/NotFoundError";
import { ServerError } from "../error/ServerError";
import { Especie, Fase, FasesProducao, Producao, Tanque, User } from "../model";

export class FasesProducaoService {
    static async getUserProductions(userId: number, filter: { status: string|undefined, fase: string|undefined }) {
        const { status, fase } = filter;

        console.log(`\n\nStatus: ${status}, Fase: ${fase}\n\n`);

        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        const producoes = await FasesProducao.findAll({
            include: [
                {
                    model: Producao,
                    as: 'producao',
                    include: [{
                        model: User,
                        as: 'user',
                        where: { id: userId }
                    }],
                    where: status ? { status } : undefined
                },
                {
                    model: Fase,
                    as: 'fase',
                    where: fase ? { nome: fase } : undefined
                }
            ]
        });

        return producoes;
    }

    static async getUserProduction() { }

    static async createProducao(dadosProducao: Producao, faseInicial: string) {
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

        const [user, tanque, especie, fase] = await Promise.all([
            User.findByPk(userId),
            Tanque.findByPk(tanqueId),
            Especie.findByPk(especieId),
            Fase.findOne({ where: { nome: faseInicial } })
        ]);

        // Verificações de erro
        if (!user) throw new NotFoundError('Usuário não encontrado.');
        if (!tanque) throw new NotFoundError('Tanque não encontrado.');
        if (!especie) throw new NotFoundError('Espécie não encontrada.');
        if (!fase) throw new NotFoundError('Fase de producao não encontrada.');

        const producao = await Producao.create({
            userId,
            tanqueId,
            especieId,
            idadeInicial,
            pesoMedioIndividualInicial,
            quantidadeEstimadaPeixes,
            pesoTotalInicial,
        });

        if (!producao) throw new ServerError('Erro ao criar producao.');

        return await FasesProducao.create({
            faseId: fase.id,
            producaoId: producao.id,
            dataInicio: new Date(),
        });
    }
}