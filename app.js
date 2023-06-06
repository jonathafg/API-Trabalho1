const express = require('express');
const produtoRota = require('.rotas/produto_rotas')

const app = express();
const port = 3000;

// const produtos = [{id:1, nome: "Produto 1", preco: 30}];

app.use(express.json());

app.use('/produtos', produtoRota)

app.listen(port, () => {
    console.log(`Servidor Iniciado na porta ${port}`);
})