import Tanque from "./Tanque";
import Especie from "./Especie";
import EspeciesTanque from "./EspeciesTanque";
import Aparelho from "./Aparelho";
import User from "./User";
import Leitura from "./Leitura";
import AparelhosTanque from "./AparelhosTanque";
import Ciclo from "./Ciclo";
import CiclosProducao from "./CiclosProducao";
import Producao from "./Producao";

const models = { Aparelho, AparelhosTanque, Ciclo, CiclosProducao, Especie, EspeciesTanque, Leitura, Producao, Tanque, User };

Aparelho.associate(models);
Especie.associate(models);
Leitura.associate(models);
Tanque.associate(models);
User.associate(models);
Ciclo.associate(models);
Producao.associate(models);

export { Aparelho, AparelhosTanque, Ciclo, CiclosProducao, Especie, EspeciesTanque, Leitura, Producao, Tanque, User };