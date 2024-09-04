import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class AparelhosTanque extends Model {
    tanqueId!: number;
    aparelhoId!: string;
};

AparelhosTanque.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'AparelhosTanque',
        tableName: 'aparelhos_tanque',
        timestamps: false,
    }
)

export default AparelhosTanque;