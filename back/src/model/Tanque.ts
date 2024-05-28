import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Tanque extends Model {
    public id!: number;
    public nome!: string;
    public areaTanque!: number;
    public volumeAgua!: number;
    public totalPeixes!: number;

    static associate(models: any) {
        this.belongsToMany(models.Especie, { through: models.EspeciesTanque, foreignKey: 'especieId' });
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
        quantidadePeixes: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'Tanque',
        tableName: 'tanque',
    }
)

export default Tanque;