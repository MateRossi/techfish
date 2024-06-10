import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Leitura extends Model {
    public id!: number;
    public id_aparelho_es!: string;
    
    public data_hora!: Date;
    public ph!: number;
    public temperatura!: number;
    public orp!: number;
    public tds!: number;
    public o2!: number;
    public o2_mg!: number;
    public turbidez!: number;

    static associate(models: any) {
        this.belongsTo(models.Aparelho, { foreignKey: 'id_aparelho_es' })
    }
};

Leitura.init(
    {
        id_aparelho_es: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ph: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 14,
            },
        },
        temperatura: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 5,
                max: 40,
            },
        },
        orp: {
            type: DataTypes.DECIMAL,
            validate: {
                min: -400,
                max: 400,
            },
        },
        tds: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 1500,
            },
        },
        o2: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 200,
            },
        },
        o2_mg: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 20,
            },
        },
        turbidez: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 1000,
            },
        },
    },
    {
        sequelize,
        modelName: 'Leitura',
        tableName: 'leitura',
    },
);

export default Leitura;
