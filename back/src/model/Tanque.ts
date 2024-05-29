import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";

class Tanque extends Model {
    public id!: number;
    public nome!: string;
    public areaTanque!: number;
    public volumeAgua!: number;
    public totalPeixes!: number;

    public userId!: number;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' })
        this.belongsToMany(models.Especie, { through: models.EspeciesTanque, foreignKey: 'especieId' });
        this.belongsToMany(models.Aparelho, { through: models.AparelhosTanque, foreignKey: 'aparelhoId' });
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
        totalPeixes: {
            type: DataTypes.INTEGER,
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