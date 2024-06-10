const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../Models/User");
const verifyToken = require('../Middleware/Verificartoken');

router.post('/cadastrar', async (req, res) => {
    try {
        const { nome, email, senha, telefone, nomeEmpresa, plano } = req.body;

        const nivelHierarquia = '1';
        const dataCriacao = new Date();
        const dataAquisicaoPlano = dataCriacao;

        const newUser = new User({
            nome,
            email,
            senha,
            telefone,
            nomeEmpresa,
            nivelHierarquia,
            dataCriacao,
            plano,
            dataAquisicaoPlano
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ email, senha });
    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, 'seuSegredo', { expiresIn: '365d' });

    res.json({ token });
});

router.post('/esqueceu-senha', async (req, res) => {
    try {
        const { email, novaSenha } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'E-mail não encontrado' });
        }

        user.senha = novaSenha;
        await user.save();

        res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao redefinir a senha' });
    }
});

router.get('/meus-dados', async (req, res) => {
    try {
        const emailUsuario = 'joaovictorferreiramatias01@gmail.com';

        const user = await User.findOne({ email: emailUsuario }, { nome: 1, email: 1, telefone: 1, nomeEmpresa: 1, nivelHierarquia: 1, plano: 1 });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os dados do usuário.' });
    }
});


module.exports = router;
