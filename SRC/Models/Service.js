const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do serviço
const serviceSchema = new Schema({
    nome: 
    { 
        type: String, 
        required: true 
    },
    icone: 
    { 
        type: String 
    },
    valor: 
    { 
        type: Number, 
        required: true 
    },
    dataCriacao: 
    { 
        type: Date, 
        default: Date.now 
    },
    usuarioCriador: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    duracao: 
    { 
        type: Number 
    }, 
    membros: 
    [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }] 
});


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
