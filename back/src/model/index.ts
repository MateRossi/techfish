import Tanque from "./Tanque";
import Especie from "./Especie";
import Aparelho from "./Aparelho";
import User from "./User";
import Leitura from "./Leitura";
import Fase from "./Fase";
import Producao from "./Producao";
import HistoricoFasesProducao from "./HistoricoFasesProducao";

const models = { Aparelho, Fase, HistoricoFasesProducao, Especie, Leitura, Producao, Tanque, User };

Aparelho.associate(models);
Especie.associate(models);
Leitura.associate(models);
Tanque.associate(models);
User.associate(models);
Fase.associate(models);
HistoricoFasesProducao.associate(models);
Producao.associate(models);

export { Aparelho, Fase, HistoricoFasesProducao, Especie, Leitura, Producao, Tanque, User };