const express = require('express');
const router = express.Router();
const Service = require('../Models/Service');
const User = require('../Models/User');

router.post('/criar-servico', async (req, res) => {
    try {
        const { nome, icone, valor, duracao } = req.body;
        const emailUsuario = 'joaovictorferreiramatias01@gmail.com';

        const usuarioCriador = await User.findOne({ email: emailUsuario });
        if (!usuarioCriador) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Adicionando o usuário criador como membro por padrão
        const membros = [usuarioCriador._id];

        const novoServico = new Service({
            nome,
            icone,
            valor,
            usuarioCriador: usuarioCriador._id,
            duracao,
            membros
        });

        await novoServico.save();

        res.status(201).json({ message: 'Serviço criado com sucesso!', service: novoServico });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o serviço.' });
    }
});

router.get('/meus-servicos', async (req, res) => {
    try {
        const emailUsuario = 'joaovictorferreiramatias01@gmail.com';
        const usuarioCriador = await User.findOne({ email: emailUsuario });

        if (!usuarioCriador) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const servicos = await Service.find({ usuarioCriador: usuarioCriador._id });

        res.json({ services: servicos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os serviços.' });
    }
});

module.exports = router;
