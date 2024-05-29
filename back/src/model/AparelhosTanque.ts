import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import Tanque from "./Tanque";
import Aparelho from "./Aparelho";

class AparelhosTanque extends Model {
    tanqueId!: number;
    aparelhoId!: string;
};

AparelhosTanque.init(
    {
        tanqueId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tanque,
                key: 'id',
            },
        },
        aparelhoId: {
            type: DataTypes.STRING,
            references: {
                model: Aparelho,
                key: 'id_aparelho_es'
            },
        },
    },
    {
        sequelize,
        modelName: 'AparelhosTanque',
        tableName: 'aparelhos_tanque'
    }
)

export default AparelhosTanque;