const Carga = require('../models/Carga')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio|| !idMotorista){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }
   

    try{
       
        await Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            codRastreio: valores.codRastreio,
            idMotorista: valores.idMotorista
        })
        return res.status(201).json({message: 'Carga cadastrado'})
    }catch(err){
        console.error('Erro ao cadastrar Carga',err)
        return res.status(500).json({message: 'Erro ao cadastrar Carga'})
    }
}
const listar = async(req,res)=>{
    try{
        const cargas = await Carga.findAll()
        let resultado = []

        cargas.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado,err)
            }
            resultado.push({
                codCarga: el.codCarga,
                descricao: el.descricao,
                peso: el.peso,
                volume: el.volume,
                codRastreio: el.codRastreio,
                idMotorista: el.idMotorista
            })
                 
        })
        return res.status(200).json(resultado)
    }catch(err){
        console.error('Erro ao listar Cargas',err)
        return res.status(500).json({message: 'Erro ao listar Cargas'})
    }
}
module.exports = {cadastrar,listar}