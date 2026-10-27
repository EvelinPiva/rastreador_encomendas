const Entrega = require('../models/Entrega')
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

        await Entrega.create({
            nome: valores.nome,
            cnh: valores.cnh,
            cpf: valores.cpf,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Entrega cadastrado'})
    }catch(err){
        console.error('Erro ao cadastrar entrega',err)
        return res.status(500).json({message: 'Erro ao cadastrar entrega'})
    }
}
const listar = async(req,res)=>{
    try{
        const entregas = await Entrega.findAll()
        let resultado = []

        entregas.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado,err)
            }
            resultado.push({
                codEntrega: el.codEntrega,
                nome: el.nome,
                cnh: el.cnh,
                cpf: el.cpf,
                telefone: el.telefone
            })
                 
        })
        return res.status(200).json(resultado)
    }catch(err){
        console.error('Erro ao listar Entregas',err)
        return res.status(500).json({message: 'Erro ao listar Entregas'})
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.cpf) {
            if (valores.cpf.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }

        if (valores.senha) {
            dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        }

        await Entrega.update(dadosAtualizados, { where: { codEntrega: id } })
        return res.status(200).json({ message: 'Entrega atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar Entrega:', err)
        return res.status(500).json({ message: 'Erro ao atualizar Entrega!' })
    }
}

module.exports = {cadastrar,listar,atualizar}