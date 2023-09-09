const { Router } = require('express');
const dogRouter = Router();
const { handleDogsAll, handleDogById, handleDogCreate, handleDogUpdate } = require('../handlers/dogHandler')


dogRouter.get('/', handleDogsAll)
dogRouter.get('/:idRaza', handleDogById)
dogRouter.post('/', handleDogCreate)
dogRouter.put('/', handleDogUpdate)

module.exports = dogRouter