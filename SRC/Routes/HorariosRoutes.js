const express = require('express');
const router = express.Router();
const Horarios = require('../Models/Horarios');
const User = require('../Models/User');

router.post('/definir-horarios', async (req, res) => {
    try {
        const emailUsuario = 'joaovictorferreiramatias01@gmail.com';
        
        const user = await User.findOne({ email: emailUsuario });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { horarios } = req.body;

        for (const horario of horarios) {
            const { diaSemana, horarioInicio, horarioFim, intervalo } = horario;

            const novoHorario = new Horarios({
                usuario: user._id,
                diaSemana,
                horarios: [{ horarioInicio, horarioFim }],
                intervalo
            });

            await novoHorario.save();
        }

        res.status(201).json({ message: 'Horários de atendimento definidos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao definir os horários de atendimento.' });
    }
});

router.get('/exibir-horarios', async (req, res) => {
    try {
        const emailUsuario = 'joaovictorferreiramatias01@gmail.com';
        
        const user = await User.findOne({ email: emailUsuario });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const horarios = await Horarios.find({ usuario: user._id });

        let horariosSeparadosPorDia = {
            domingo: [],
            segunda: [],
            terça: [],
            quarta: [],
            quinta: [],
            sexta: [],
            sabado: []
        };

        const diasDaSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
        for (const dia of diasDaSemana) {
            if (!horariosSeparadosPorDia[dia]) {
                horariosSeparadosPorDia[dia] = [];
            }
        }

        for (const horario of horarios) {
            for (let i = new Date(`2022-01-01T${horario.horarios[0].horarioInicio}`); i <= new Date(`2022-01-01T${horario.horarios[0].horarioFim}`); i.setMinutes(i.getMinutes() + horario.intervalo)) {
                if (!horariosSeparadosPorDia[horario.diaSemana]) {
                    horariosSeparadosPorDia[horario.diaSemana] = [];
                }
                horariosSeparadosPorDia[horario.diaSemana].push(i.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
            }
        }

        res.json({ horarios: horariosSeparadosPorDia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao exibir os horários de atendimento.' });
    }
});


module.exports = router;
