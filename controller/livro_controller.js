const cadastroLivros = require('../cadastro_livros')
const repositoryLivros = require('../repository/livro_repository')

async function listar(req, res) {
    const listaLivros = await repositoryLivros.listar();
    res.json(listaLivros);
}

async function buscarPorId(req,res) {
    const id = req.params.id;
    const livro = await repositoryLivros.buscarPorId(id);
    if(livro){
        res.json(livro);
    } 
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Livro nao encontrado."
            }
        );
    }
}

async function inserir(req, res) {
    const livro = req.body;
    if (livro && livro.nome && livro.isbn && livro.autores && livro.editora && livro.anoPublicacao){
        const livroInserido = await repositoryLivros.inserir(autor);
        res.status(201).json(livroInserido);
    }
    else {
        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros de livros estao invalidos"
            }
        );
    }
}

function atualizar(req,res) {
    const id = req.params.id;
    const livro = req.body;
    try{
        const livroAtualizado = cadastroLivros.atualizar(id,livro);
        res.json(livroAtualizado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }

}

function deletar(req,res) {
    const id = req.params.id;
    try{
        const livroDeletado = cadastroLivros.deletar(id);
        res.json(livroDeletado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir, 
    atualizar,
    deletar
}