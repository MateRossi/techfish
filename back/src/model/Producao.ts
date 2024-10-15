import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../db/sequelize';
import Tanque from './Tanque';
import Especie from './Especie';
import User from './User';

class Producao extends Model {
    public id!: number;
    
    public tanqueId!: number;
    public especieId!: number;
    public userId!: number;
    public idadePeixes!: number;
    public pesoMedioIndividual!: number;
    public pesoTotal!: number;
    public tca!: number;
    public gpd!: number;

    public status!: string;

    //Buscar a fase de produção atual através do último elemento na tabela de FasesProdução.

    static associate(models: any) {
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId', as: 'tanque' })
        this.belongsTo(models.Especie, { foreignKey: 'especieId', as: 'especie' })
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        this.hasMany(models.FasesProducao, { foreignKey: 'producaoId' })
    };
};

Producao.init(
    {
        tanqueId: {
            type:DataTypes.INTEGER,
            references: {
                model: Tanque,
                key: 'id'
            },
            allowNull: false,
        },
        especieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Especie,
                key: 'id',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },

        //https://www.cnabrasil.org.br/assets/arquivos/263-Piscicultura-Alimenta%C3%A7%C3%A3o_191025_203233.pdf

        //idade expressa em dias
        idadePeixes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        //peso médio individual em quilos
        pesoMedioIndividual: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        //peso total em quilos
        pesoTotal: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        //taxa de conversão alimentar - quantidade total de ração fornecida(kg)/ganho de peso total dos peixes(kg)
        tca: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        //ganho de peso diário - peso médio atual (g) - peso médio anterior(g) / número de dias de cresimento
        gpd: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM('em andamento', 'finalizada'),
            defaultValue: 'em andamento',
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Producao',
        tableName: 'producao'
    }
);

export default Producao;