const cadastroClientes = require('../cadastro_clientes')
const repositoryClientes = require('../repository/cliente_repository')

async function listar(req, res) {
    const listaClientes = await repositoryClientes.listar();
    res.json(listaClientes);
}

async function buscarPorId(req,res) {
    const id = req.params.id;
    const cliente = await repositoryClientes.buscarPorId(id);
    if(cliente){
        res.json(cliente);
    } 
    else {
        res.status(404).json(
            {
                numero: 404,
                msg: "Erro: Cliente nao encontrado."
            }
        );
    }
}

async function inserir(req, res) {
    const cliente = req.body;
    if (cliente && cliente.nome && cliente.matricula && cliente.telefone){
        const clienteInserido = await repositoryClientes.inserir(cliente);
        res.status(201).json(clienteInserido);
    }
    else {
        res.status(400).json(
            {
                numero: 400,
                msg: "Erro: Os parametros de cliente estao invalidos"
            }
        );
    }
}

function atualizar(req,res) {
    const id = req.params.id;
    const cliente = req.body;
    try{
        const clienteAtualizado = cadastroClientes.atualizar(id,cliente);
        res.json(clienteAtualizado);
    }
    catch (err) {
        res.status(err.numero).json(err);
    }

}

function deletar(req,res) {
    const id = req.params.id;
    try{
        const clienteDeletado = cadastroClientes.deletar(id);
        res.json(clienteDeletado);
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