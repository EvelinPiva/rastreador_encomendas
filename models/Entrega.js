const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull: false
    },
    destino:{
        type: DataTypes.STRING,
        allowNull: false
    },
    statusAtual:{
        type: DataTypes.ENUM('ENTREGUE','TRANSITO'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.DATE,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        references:{
            model: 'cargas',
            key: 'codCarga'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'entregas'
})
module.exports = Entrega