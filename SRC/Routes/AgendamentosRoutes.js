const express = require('express');
const router = express.Router();
const Service = require('../Models/Service');
const Horarios = require('../Models/Horarios');
const Agendamento = require('../Models/Agendamentos');
const User = require('../Models/User');

router.post('/agendar-servico', async (req, res) => {
    try {
        const { idUsuarioRecebedor, idServico, dataDesejada, horarioDesejado } = req.body;

        // Verificar se o serviço existe
        const servico = await Service.findById(idServico);
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }

        // Converter a string de data para um objeto Date
        const data = new Date(dataDesejada);

        // Verificar disponibilidade do horário para o usuário recebedor do agendamento no dia da semana selecionado
        const horarioDisponivel = await Horarios.findOne({
            diaSemana: getDiaSemanaPorData(data), // Função para obter o dia da semana a partir da data
            usuario: idUsuarioRecebedor,
            horarios: { $elemMatch: { horarioInicio: { $lte: horarioDesejado }, horarioFim: { $gte: horarioDesejado } }
        }});

        if (!horarioDisponivel) {
            return res.status(400).json({ message: 'Horário indisponível para agendamento' });
        }

        // Marcar horário como indisponível para futuros agendamentos
        horarioDisponivel.disponivel = false;
        await horarioDisponivel.save();

        // Registrar o agendamento com o usuário recebedor
        const novoAgendamento = new Agendamento({
            usuario: idUsuarioRecebedor,
            servico: servico._id,
            data: dataDesejada,
            horario: horarioDesejado
        });
        await novoAgendamento.save();

        res.status(201).json({ message: 'Agendamento realizado com sucesso!', agendamento: novoAgendamento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao agendar o serviço.' });
    }
});

// Função para obter o dia da semana a partir de uma data
function getDiaSemanaPorData(data) {
    const diasDaSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    return diasDaSemana[data.getDay()];
}

module.exports = router;
