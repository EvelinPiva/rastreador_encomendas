const Funcionario = require('../models/Funcionario')

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

        await Funcionario.create({
            nome: valores.nome,
            cnh: valores.cnh,
            cpf: valores.cpf,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Funcionario cadastrado'})
    }catch(err){
        console.error('Erro ao cadastrar Funcionario',err)
        return res.status(500).json({message: 'Erro ao cadastrar Funcionario'})
    }
}
module.exports = {cadastrar}
