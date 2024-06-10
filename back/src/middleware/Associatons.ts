
import Especie from "../model/Especie";
import Tanque from "../model/Tanque";
import EspeciesTanque from "../model/EspeciesTanque";

export default function associateModels() {
    Especie.associate(EspeciesTanque);
    Tanque.associate(EspeciesTanque);
}

