import Tanque from "./Tanque";
import Especie from "./Especie";
import EspeciesTanque from "./EspeciesTanque";

const models = { Tanque, Especie, EspeciesTanque };

Tanque.associate(models);
Especie.associate(models);

export { Tanque, Especie, EspeciesTanque };