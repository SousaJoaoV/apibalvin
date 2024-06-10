const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horariosSchema = new Schema({
    usuario: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    diaSemana: 
    { 
        type: String,
        required: true 
    },
    horarios: [{
        horarioInicio: 
        { 
            type: String, 
            required: true 
        }, 
        horarioFim: 
        { type: String, 
            required: true 
        }, 
    }],
    intervalo: { 
        type: Number, 
        required: true 
    } 

});

const Horarios = mongoose.model('Horarios', horariosSchema);

module.exports = Horarios;
