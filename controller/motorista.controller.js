const Motorista = require('../models/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }
    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'O cpf deve conter 11 dígitos'})
    }

    try{
        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const senhaCriptografada = Crypto.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: valores.cnh,
            cpf: valores.cpf,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Motorista cadastrado'})
    }catch(err){
        console.error('Erro ao cadastrar motorista',err)
        return res.status(500).json({message: 'Erro ao cadastrar motorista'})
    }
}
const listar = async(req,res)=>{
    try{
        const motoristas = await Motorista.findAll()
        let resultado = []

        motoristas.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado,err)
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: el.cnh,
                cpf: el.cpf,
                telefone: el.telefone
            })
                 
        })
        return res.status(200).json(resultado)
    }catch(err){
        console.error('Erro ao listar motoristas',err)
        return res.status(500).json({message: 'Erro ao listar motoristas'})
    }
}
module.exports = {cadastrar,listar}