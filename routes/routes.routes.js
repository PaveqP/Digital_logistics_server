const Router = require('express')
const router = new Router()
const RoutesController = require('../controllers/routes.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/routes', authMiddleware, RoutesController.createRoute)
router.get('/routes', authMiddleware, RoutesController.getRoutesByUser)
router.delete('/routes', authMiddleware, RoutesController.deleteRoute)
router.put('/routes', authMiddleware, RoutesController.updateRoute)

module.exports = router