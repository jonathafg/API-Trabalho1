const express = require('express');
const cadastroClientes = require('../cadastro_clientes')
const clienteController = require('../controller/cliente_controller')

const router = express.Router();

//Recurso: cliente - rota: /cliente
router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId)
router.post('/', clienteController.inserir);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.deletar);

module.exports = router;