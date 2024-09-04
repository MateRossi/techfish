import { Model, DataTypes } from "sequelize";
import { sequelize } from '../db/sequelize';
import User from "./User";
import Leitura from "./Leitura";

class Aparelho extends Model {
    public id!: string;
    public userId!: number;

    Leituras!: Leitura[];

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
        this.hasMany(models.Leitura, { foreignKey: 'aparelhoId' });
        this.belongsToMany(models.Tanque, { through: models.AparelhosTanque });
    }
}

Aparelho.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Aparelho',
        tableName: 'aparelho'
    }
);

export default Aparelho;