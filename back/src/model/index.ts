import Tanque from "./Tanque";
import Especie from "./Especie";
import EspeciesTanque from "./EspeciesTanque";
import Aparelho from "./Aparelho";
import User from "./User";
import Leitura from "./Leitura";
import AparelhosTanque from "./AparelhosTanque";

const models = { Aparelho, AparelhosTanque, Especie, EspeciesTanque, Leitura, Tanque, User };

Aparelho.associate(models);
Especie.associate(models);
Leitura.associate(models);
Tanque.associate(models);
User.associate(models);

export { Aparelho, AparelhosTanque, Especie, EspeciesTanque, Leitura, Tanque, User };