const { Router } = require('express');
const dogRouter = Router();
const { handleDogsAll, handleDogById, handleDogCreate } = require('../handlers/dogHandler')


dogRouter.get('/', handleDogsAll)
dogRouter.get('/:idRaza', handleDogById)
dogRouter.post('/', handleDogCreate)

module.exports = dogRouter