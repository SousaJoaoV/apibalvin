const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const Membros = require('../Models/Membros')

router.post('/membros', async (req, res) => {
    const { nome, email, senha } = req.body; // Extrair nome, email e senha do corpo da requisição

    try {
        // Encontrar o usuário com o e-mail específico
        const usuario = await User.findOne({ email: 'joaovictorferreiramatias01@gmail.com' });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Criar um novo membro associado a esse usuário com os dados fornecidos na requisição
        const novoMembro = new Membros({
            usuarioPrincipal: usuario._id,
            funcionarios: [],
            dataCriacao: new Date(),
        });

        // Criar um novo usuário para o membro com os dados fornecidos na requisição
        const novoUsuario = new User({
            nome: nome,
            email: email,
            senha: senha,
            nivelHierarquia: 2, // Defina o nível de hierarquia apropriado
            dataCriacao: new Date(),
        });

        const usuarioSalvo = await novoUsuario.save();
        novoMembro.funcionarios.push(usuarioSalvo._id);

        const membroSalvo = await novoMembro.save();

        res.status(201).json({ message: 'Membro e usuário criados com sucesso', membro: membroSalvo, usuario: usuarioSalvo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao criar o membro e usuário.' });
    }
});

router.get('/vermembros', async (req, res) => {
    try {
        // Encontrar o usuário com o e-mail específico
        const usuario = await User.findOne({ email: 'joaovictorferreiramatias01@gmail.com' });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Encontrar os membros associados a esse usuário
        const membros = await Membros.find({ usuarioPrincipal: usuario._id }).populate('funcionarios', 'nome nivelHierarquia email');

        if (!membros || membros.length === 0) {
            return res.status(404).json({ message: 'Nenhum membro encontrado.' });
        }

        // Extrair os dados desejados dos membros
        const membrosInfo = membros.map(membro => ({
            nome: membro.funcionarios[0].nome,
            nivelHierarquia: membro.funcionarios[0].nivelHierarquia,
            email: membro.funcionarios[0].email
        }));

        res.status(200).json({ membros: membrosInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os membros do usuário.' });
    }
});


module.exports = router;
