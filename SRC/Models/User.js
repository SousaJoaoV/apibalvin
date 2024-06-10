const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do usuário
const userSchema = new Schema({
    nome: 
    { 
        type: String, 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true 
    },
    senha: 
    { 
        type: String, 
        required: true 
    },
    fotoPerfil: 
    { 
        type: String 
    },
    telefone: 
    { 
        type: String 
    },
    nomeEmpresa: 
    { 
        type: String 
    },
    nivelHierarquia: 
    { 
        type: Number 
    },
    dataCriacao: 
    { 
        type: Date, 
        default: Date.now 
    },
    plano: 
    { 
        type: String 
    },
    dataAquisicaoPlano: 
    { 
        type: Date 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
