const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const Membros = require('../Models/Membros')

router.get('/financeiro-membros', async (req, res) => {
    try {
        const usuario = await User.findOne({ email: 'joaovictorferreiramatias01@gmail.com' });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const numMembros = await Membros.countDocuments({ usuarioPrincipal: usuario._id });

        res.status(200).json({ numeroMembros: numMembros });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar o número de membros do usuário.' });
    }
});

module.exports = router;