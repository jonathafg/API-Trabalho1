const express = require('express');

const livroRota = require('./rotas/livro_rotas');
const autorRota = require('./rotas/autor_rotas');
const clienteRota = require('./rotas/cliente_rotas');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/livros', livroRota);
app.use('/autores', autorRota);
app.use('/clientes', clienteRota);

app.listen(port, () => {
    console.log(`Servidor Iniciado na porta ${port}`);
})