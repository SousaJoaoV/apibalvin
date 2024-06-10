const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membrosSchema = new Schema({
    usuarioPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    funcionarios: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

const Membros = mongoose.model('Membros', membrosSchema);

module.exports = Membros;
