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
    
    //lincar com o ciclo atual atravéz da tabela de Histórico das Fases do Ciclo de Produção??

    static associate(models: any) {
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId', as: 'tanque' })
        this.belongsTo(models.Especie, { foreignKey: 'especieId', as: 'especie' })
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
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
    },
    {
        sequelize,
        modelName: 'Producao',
        tableName: 'producao'
    }
);

export default Producao;