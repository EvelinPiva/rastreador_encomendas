const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    peso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    volume:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    codRastreio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        references:{
            model: 'motoristas',
            key: 'codMotorista'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'cargas'
})
module.exports = Carga