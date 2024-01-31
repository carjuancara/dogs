const { Router } = require('express');
const allTemperaments = require('../handlers/temperamentsHandler')
const temperamentsRouter = Router();

temperamentsRouter.get('/',allTemperaments)

module.exports = temperamentsRouter