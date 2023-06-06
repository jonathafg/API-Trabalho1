const express = require('express');
const cadastroProdutos = require('./cadastro_produtos');
const app = express();
const port = 3000;

const produtos = [{id:1, nome: "Produto 1", preco: 30}];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World.')
})

app.listen(port, () => {
    console.log(`Servidor Iniciado na porta ${port}`);
})

app.get('/produtos', (req, res) => {
    // res.send("Listando produtos: ");
    const listaProdutos = cadastroProdutos.listar();
    res.json(listaProdutos);
})

app.get('/produtos/:id', (req, res) => {
    //res.send("Buscar pelo id: ");
    const id = req.params.id;
    try {
        const produto = cadastroProdutos.buscarPorId(id);
        res.json(produtos);
    } catch (err) {
        res.status(err.numero).json(err);
    }
})

app.post('/produtos', (req, res) => {
    //res.send("Cadastrar produto: ");
    const produto = req.body;

    try{
        const produtoInserido = cadastroProdutos.inserir();
        res.status(201).json(produtoInserido);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
})

app.put('/produtos/:id', (req, res) => {
    //res.send("Atualizar o produto com id: ");
    const id = req.params.id;
    const produto = req.body;
    try {
        const produtoAtualizado = cadastroProdutos.atualizar(id,produto);
        res.json(produtoAtualizado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
})

app.delete('/produtos/:id', (req, res) => {
    //res.send("Deletando o produto com id: ");
    const id = req.params.id;
    try {
        const produtoDeletado = cadastroProdutos.deletar(id);
        res.json(produtoDeletado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
})