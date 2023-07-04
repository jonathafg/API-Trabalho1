const express = require('express');
const cadastroAutores = require('../cadastro_autores')
const autorController = require('../controller/autor_controller')

const router = express.Router();

//Recurso: autores - rota: /autores
router.get('/', autorController.listar);
router.get('/:id', autorController.buscarPorId)
router.post('/', autorController.inserir);
router.put('/:id', autorController.atualizar);
router.delete('/:id', autorController.deletar);

module.exports = router;