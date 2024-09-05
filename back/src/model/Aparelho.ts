import { Model, DataTypes } from "sequelize";
import { sequelize } from '../db/sequelize';
import User from "./User";
import Leitura from "./Leitura";
import Tanque from "./Tanque";

class Aparelho extends Model {
    public id!: string;
    
    public userId!: number;
    public tanqueId!: number;

    leituras!: Leitura[];

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        this.hasMany(models.Leitura, { foreignKey: 'aparelhoId', as: 'leituras' });
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId', as: 'tanque' });
    };
};

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
        },
        tanqueId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tanque,
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