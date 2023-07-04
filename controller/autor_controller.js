const cadastroAutores = require('../cadastro_autores')
const repositoryAutores = require('../repository/autor_repository')


async function listar(req, res) {
    const listaAutores = await repositoryAutores.listar();
    res.json(listaAutores);
}

async function buscarPorId(req,res) {
    const id = req.params.id;
    const autor = await repositoryAutores.buscarPorId(id);
    if(autor){
        res.json(autor);
    } 
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Autor nao encontrado."
            }
        );
    }
}

async function inserir(req, res) {
    const autor = req.body;
    if (autor && autor.nome && autor.paisOrigem){
        const autorInserido = await repositoryAutores.inserir(autor);
        res.status(201).json(autorInserido);
    }
    else {
        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros de produto estao invalidos"
            }
        );
    }
}

function atualizar(req,res) {
    const id = req.params.id;
    const autor = req.body;
    try{
        const autorAtualizado = cadastroAutores.atualizar(id,autor);
        res.json(autorAtualizado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }

}

function deletar(req,res) {
    const id = req.params.id;
    try{
        const autorDeletado = cadastroAutores.deletar(id);
        res.json(autorDeletado);
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