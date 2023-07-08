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

async function atualizar(req,res) {
    const id = req.params.id;
    const autor = req.body;

    if(autor && autor.nome && autor.paisOrigem)
    {
        const autorAlterado = 
            await repositoryAutores.atualizar(id,autor);
        if(autorAlterado){
            res.json(autorAlterado);
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
    else {
        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros de autor estao invalidos"
            }
        );
    }
}

async function deletar(req,res) {
    const id = req.params.id;
    const autorDeletado = 
        await repositoryAutores.deletar(id);
    if(autorDeletado){
        res.json(autorDeletado);
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

module.exports = {
    listar,
    buscarPorId,
    inserir, 
    atualizar,
    deletar
}