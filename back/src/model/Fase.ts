import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Fase extends Model {
    public id!: number;
    public nome!: string;
    public instrucoes!: string;

    static associate(models: any) {
        this.hasMany(models.FasesProducao, { foreignKey: 'faseId' })
    }
};

Fase.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        instrucoes: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Fase',
        tableName: 'fase',
    },
);

export default Fase;