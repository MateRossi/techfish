import Tanque from "./Tanque";
import Especie from "./Especie";
import Aparelho from "./Aparelho";
import User from "./User";
import Leitura from "./Leitura";
import Fase from "./Fase";
import Producao from "./Producao";
import FasesProducao from "./FasesProducao";
import Trato from "./Trato";

const models = { Aparelho, Fase, Especie, Leitura, Producao, Tanque, User, FasesProducao, Trato };

Aparelho.associate(models);
Especie.associate(models);
Leitura.associate(models);
Tanque.associate(models);
User.associate(models);
Fase.associate(models);
Producao.associate(models);
FasesProducao.associate(models);
Trato.associate(models);

export { Aparelho, Fase, Especie, Leitura, Producao, Tanque, User, FasesProducao };