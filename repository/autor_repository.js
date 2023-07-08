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
    const res = await cliente.query('SELECT * FROM autores');
    const listaAutores = res.rows;
    await cliente.end();
    return listaAutores;
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM autores WHERE id=$1', [id]);
    const autor = res.rows[0];
    await cliente.end();
    return autor;

}

async function inserir(autor){
    const sql = 'INSERT INTO autores (nome, paisOrigem) VALUES ($1, $2) RETURNING *';
    const values = [autor.nome, autor.paisOrigem];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const autorInserido = res.rows[0];
    await cliente.end();
    return autorInserido
}

async function atualizar(id, autorAlterar){
    const sql = 'UPDATE autores SET nome = $1, paisOrigem = $2 WHERE id = $3 RETURNING *';
    const values = [autorAlterar.nome, autorAlterar.paisOrigem, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const autorAtualizado = res.rows[0];
    await cliente.end();
    return autorAtualizado;

}

async function deletar(id){
    const sql = 'DELETE FROM autores WHERE id = $1 RETURNING *';
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const autorDeletado = res.rows[0];
    await cliente.end();
    return autorDeletado;

}

module.exports = { 
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}