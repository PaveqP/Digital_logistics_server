const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')

//router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/myUser', authMiddleware, userController.getOneUser)
router.put('/user', authMiddleware, userController.updateUser)
router.delete('/user/:id', authMiddleware, userController.deleteUser)

module.exports = router