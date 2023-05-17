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

app.get('/produtos/id', (req, res) => {
    res.send("procurando produto: ");
})

app.post('/produtos', (req, res) => {
    res.send("Criando produto: ");
})

app.put('/produtos/id', (req, res) => {
    res.send("Editando produto: ");
})

app.delete('/produtos/id', (req, res) => {
    res.send("Deletando produto: ");
})