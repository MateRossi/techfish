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