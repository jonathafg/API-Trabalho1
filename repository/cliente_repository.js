const { Client } = require('pg')

conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca',
};

async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM clientes')
    const listaClientes = res.rows;
    await cliente.end();
    return listaClientes;
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM clientes WHERE id=$1', [id]);
    const clientes = res.rows[0];
    await cliente.end();
    return clientes;

}

async function inserir(cliente){
    const sql = 'INSERT INTO clientes (nome, matricula, telefone) VALUES ($1, $2, $3) RETURNING *';
    const values = [cliente.nome, cliente.matricula, cliente.telefone];

    const Cliente = new Client(conexao);
    await Cliente.connect();
    const res = await Cliente.query(sql,values);
    const clienteInserido = res.rows[0];
    await Cliente.end();
    return clienteInserido
}

async function atualizar(id, clienteAlterar){
    const sql = 'UPDATE clientes SET nome = $1, matricula = $2, telefone = $3 WHERE id = $4 RETURNING *';
    const values = [clienteAlterar.nome, clienteAlterar.matricula, clienteAlterar.telefone, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const clienteAtualizado = res.rows[0];
    await cliente.end();
    return clienteAtualizado;

}

async function deletar(id){
    const sql = 'DELETE FROM clientes WHERE id = $1 RETURNING *';
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const clienteDeletado = res.rows[0];
    await cliente.end();
    return clienteDeletado;

}

module.exports = { 
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}