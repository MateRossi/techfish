import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";
import Aparelho from "./Aparelho";
import Producao from "./Producao";

class Tanque extends Model {
    public id!: number;
    public nome!: string;
    public areaTanque!: number;
    public volumeAgua!: number;

    public userId!: number;
    public aparelhos!: Aparelho[];
    public producoes!: Producao[];

    public createdAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        this.hasMany(models.Producao, { foreignKey: 'producaoId', as: 'producoes' });
        this.hasMany(models.Aparelho, { foreignKey: 'tanqueId', as: 'aparelhos' });
    };
};

Tanque.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        areaTanque: {
            type: DataTypes.DECIMAL,
        },
        volumeAgua: {
            type: DataTypes.DECIMAL,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Tanque',
        tableName: 'tanque',
    }
)

export default Tanque;