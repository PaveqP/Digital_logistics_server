const Router = require('express')
const router = new Router()
const controller = require('../controllers/auth.controller')
const {check} = require("express-validator")

router.post('/registartion', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть пустым').notEmpty(),
    check('login', 'Логи не может быть пустым').notEmpty()
], controller.registration)
router.post('/login', controller.login)

module.exports = router