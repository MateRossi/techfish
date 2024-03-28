import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Monitoramento extends Model {
    public id!: number;
    public id_cliente!: string;
    public id_aparelho!: string;
    public data_hora!: Date;

    public ph!: number;
    public temperatura!: number;
    public orp!: number;
    public tds!: number;
    public o2!: number;
    public o2_mg!: number;
    public turbidez!: number;
};

Monitoramento.init(
    {
        id_cliente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_aparelho: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ph: {
            type: DataTypes.DECIMAL,
        },
        temperatura: {
            type: DataTypes.DECIMAL,
        },
        orp: {
            type: DataTypes.DECIMAL,
        },
        tds: {
            type: DataTypes.DECIMAL,
        },
        o2: {
            type: DataTypes.DECIMAL,
        },
        o2_mg: {
            type: DataTypes.DECIMAL,
        },
        turbidez: {
            type: DataTypes.DECIMAL,
        }
    },
    {
        sequelize,
        modelName: 'Monitoramento',
        tableName: 'monitoramento',
        timestamps: false,
    },
);

export default Monitoramento;
