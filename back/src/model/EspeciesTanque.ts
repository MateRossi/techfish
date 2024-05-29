import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Tanque from "./Tanque";
import Especie from "./Especie";

class EspeciesTanque extends Model {
    idTanque!: number;
    idEspecie!: number;

    public pesoInicial!: number;
    public idade!: number;
    public quantidadePeixes!: number;
}

EspeciesTanque.init(
    {
        tanqueId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tanque,
                key: 'id',
            },
        },
        especieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Especie,
                key: 'id',
            },
        },
        pesoInicial: {
            type: DataTypes.DECIMAL,
        },
        idade: {
            type: DataTypes.INTEGER,
        },
        quantidadePeixes: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'EspeciesTanque',
        tableName: 'especies_tanque',
    }
);

export default EspeciesTanque;