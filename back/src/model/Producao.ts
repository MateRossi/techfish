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

    public idadeInicial!: number;
    public pesoMedioIndividualInicial!: number;
    public pesoTotalInicial!: number;
    public quantidadeEstimadaPeixes!: number;
    public status!: string;
    
    //quantidade estimada de peixes ao finalizar a produção
    public quantidadeFinalEstimadaPeixes?: number;
    public gastosTotais?: number;
    public totalRacaoFornecida?: number;
    public pesoIndividualFinal?: number;
    public pesoTotalFinal?: number;
    public tcaGeral?: number;
    public gpdGeral?: number;
    public dataFim?: number;

    //Buscar a fase de produção atual através do último elemento na tabela de FasesProdução.

    static associate(models: any) {
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId', as: 'tanque' })
        this.belongsTo(models.Especie, { foreignKey: 'especieId', as: 'especie' })
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        this.hasMany(models.FasesProducao, { foreignKey: 'producaoId' })
        this.hasMany(models.Trato, { foreignKey: 'producaoId' })
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

        //idade incial em quantidade de dias
        idadeInicial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        //peso médio individual incial expresso em quilos
        pesoMedioIndividualInicial: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        //peso total inicial - calculado ao criar a produção
        pesoTotalInicial: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0,
            },
        },

        quantidadeEstimadaPeixes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },

        status: {
            type: DataTypes.ENUM('EM ANDAMENTO', 'FINALIZADA'),
            defaultValue: 'EM ANDAMENTO',
            allowNull: false,
        },

        quantidadeFinalEstimadaPeixes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        //valor total gasto - calculado apenas quando a produção é finalizada.
        gastosTotais: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //quantidade de ração total gasta em quilos (não leva em consideração o tipo de ração) - calculado ao finalizar a produção.
        totalRacaoFornecida: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //peso final dos peixes (kg), obtido ao finalizar a producao.
        pesoIndividualFinal: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //peso total final (quantidadePexies * pesoIndividual) = utilizado no cálculo do tca
        pesoTotalFinal: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //TCA (taxa de conversão alimentar) geral = totalRacao(kg)/ganho de peso total
        tcaGeral: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //GPD (ganho de peso diário) geral = peso inicial (g) - peso final (g) / dias de crescimento.
        gpdGeral: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },

        //data fim - valor armazenado quando a produção é finalizada.
        dataFim: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Producao',
        tableName: 'producao'
    }
);

export default Producao;