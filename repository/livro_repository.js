const { Client } = require('pg')

conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'biblioteca',
};

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros')
    const listaLivros = res.rows;
    await cliente.end();
    return listaLivros;
}

async function buscarPorId(id){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE id=$1', [id]);
    const livro = res.rows[0];
    await cliente.end();
    return livro;

}

async function inserir(livro){
    const sql = 'INSERT INTO livros (nome, isbn, autores, editora, anoPublicacao) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [livro.nome, livro.isbn, livro.autores, livro.editora, livro.anoPublicacao];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroInserido = res.rows[0];
    await cliente.end();
    return livroInserido
}

async function atualizar(id, livroAlterar){
    const sql = 'UPDATE livros SET nome = $1, isbn = $2, autores = $3, editora = $4, anoPublicacao = $5 WHERE id = $6 RETURNING *';
    const values = [livroAlterar.nome, livroAlterar.isbn, livroAlterar.autores, livroAlterar.editora, livroAlterar.anoPublicacao, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroAtualizado = res.rows[0];
    await cliente.end();
    return livroAtualizado;

}

async function deletar(id){
    const sql = 'DELETE FROM livros WHERE livrosid = $1 RETURNING *';
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroDeletado = res.rows[0];
    await cliente.end();
    return livroDeletado;

}

module.exports = { 
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}