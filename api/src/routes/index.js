const { Router } = require('express');
const Express = require('express')
const morgan = require('morgan')
const dogRouter = require('./dogRouter')
const temperamentsRouter = require('./temperamentsRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(Express.json())
router.use(morgan('dev'))

router.use('/dogs',dogRouter)
router.use('/temperaments', temperamentsRouter)
module.exports = router;
