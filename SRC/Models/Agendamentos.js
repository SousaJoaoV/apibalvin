const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendamentosSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    servico: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmado', 'Cancelado'],
        default: 'Confirmado'
    }
});

const Agendamentos = mongoose.model('Agendamentos', agendamentosSchema);

module.exports = Agendamentos;
