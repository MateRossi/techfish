import { Fase } from "../model";
import { alevinagem, recria, engorda } from "../constants/FasesProducao";

const seedFasesProducao = async () => {
    const fases = [alevinagem, recria, engorda];

    for (const fase of fases) {
        await Fase.findOrCreate({
            where: { nome: fase.nome },
            defaults: { instrucoes: fase.instrucoes }
        });
    };
}

export default seedFasesProducao;