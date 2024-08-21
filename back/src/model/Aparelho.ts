import { Model, DataTypes } from "sequelize";
import { sequelize } from '../db/sequelize';
import User from "./User";
import Leitura from "./Leitura";

class Aparelho extends Model {
    public id_aparelho_es!: string;
    public userId!: number;

    Leituras!: Leitura[];

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' })
        this.hasMany(models.Leitura, { foreignKey: 'id_aparelho_es' })
        this.belongsToMany(models.Tanque, { through: models.AparelhosTanque, foreignKey: 'tanqueId'});
    }
}

Aparelho.init(
    {
        id_aparelho_es : {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
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