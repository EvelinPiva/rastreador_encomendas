const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

const bytes = CryptoJS.AES.decrypt(el.cpf,CHAVE_SECRETA)

let cpfDescitografado = bytes.toString(CryptoJS.enc.Utf8)

let token = req.headers['authorization']

fetch('http://localhost:3000/bicicleta',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':token
    },
    body: JSON.stringify(valores)
})

localStorage.setItem('token',dados.token)

const token2 = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}