const router = require('express').Router()
const shortController = require('../controller/ShortController')
const accessController = require('../controller/AccessController')

router.post('/', shortController.autoShort)
router.post('/customize', shortController.customizeShort)
router.get('/:link', accessController.getAccess)

router.use(notFound)
router.use(errorHandling)

function notFound(req, res, next) {
    const error = new Error('Page not found')
    error.statusCode = 404
    next(error)
}

function errorHandling(req, res) {
    const error = new Error('Internal server error')
    error.statusCode = 500
    return (error)
}

module.exports = router