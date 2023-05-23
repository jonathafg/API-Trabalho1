const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World.')
})

app.listen(port, () => {
    console.log(`Servidor Iniciado na porta ${port}`)
})

app.get('/produtos', (req, res) => {
    res.send("Listando produtos: ");
})

app.get('/produtos/:id', (req, res) => {
    res.send("Buscar pelo id: ");
})

app.post('/produtos', (req, res) => {
    res.send("Cadastrar produto: ");
})

app.put('/produtos/:id', (req, res) => {
    res.send("Atualizar o produto com id: ");
})

app.delete('/produtos/:id', (req, res) => {
    res.send("Deletando o produto com id: ");
})