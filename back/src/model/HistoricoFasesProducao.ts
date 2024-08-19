import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';
import Fase from './Fase';
import Producao from './Producao';

class HistoricoFasesProducao extends Model {
    public id!: number;
    public tipoRacao!: string;
    public precoQuiloRacao!: number;
    public qntDiariaRacaoQuilos!: number;
    public dataInicio!: Date;
    public dataFim!: Date;

    public faseId!: number;
    public producaoId!: number;

    static associate(models: any) {
        this.belongsTo(models.Fase, { foreignKey: 'faseId' })
        this.belongsTo(models.Producao, { foreignKey: 'producaoId' })
    };
};

HistoricoFasesProducao.init(
    {
        tipoRacao: {
            type: DataTypes.STRING,
        },
        precoQuiloRacao: {
            type: DataTypes.DECIMAL,
        },
        qntDiariaRacaoQuilos: {
            type: DataTypes.DECIMAL,
        },
        dataInicio: {
            type: DataTypes.DATE,
        },
        dataFim: {
            type: DataTypes.DATE,
        },
        faseId: {
            type: DataTypes.INTEGER,
            references: {
                model: Fase,
                key: 'id'
            },
            allowNull: false,
        },
        producaoId: {
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
        modelName: 'HistoricoFasesProducao',
        tableName: 'historico_fases_producao'
    },
);

export default HistoricoFasesProducao;