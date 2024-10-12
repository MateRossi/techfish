import { Model, DataTypes } from "sequelize";
import { sequelize } from '../db/sequelize';
import Fase from "./Fase";
import Producao from "./Producao";

class FasesProducao extends Model {
    public id!: number;
    public dataInicio!: Date;
    public dataFim!: Date;

    public faseId!: number;
    public producaoId!: number;

    static associate(models: any) {
        this.belongsTo(models.Fase, { foreignKey: 'faseId', as: 'fase' })
        this.belongsTo(models.Producao, { foreignKey: 'producaoId', as: 'producao' })
    };
};

FasesProducao.init(
    {
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dataFim: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        faseId: {
            type: DataTypes.INTEGER,
            references: {
                model: Fase,
                key: 'id'
            },
            allowNull: false,
        },
        prpducaoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Producao,
                key: 'id'
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'FasesProducao',
        tableName: 'fases_producao'
    },
);

export default FasesProducao;