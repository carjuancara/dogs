const { Router } = require('express');
const Express = require('express')
const morgan = require('morgan')
const dogRouter = require('./dogRouter')
const temperamentsRouter = require('./temperamentsRouter')

const router = Router();

router.use(Express.json())
router.use(morgan('dev'))

router.use('/dogs',dogRouter)
router.use('/temperaments', temperamentsRouter)
module.exports = router;
