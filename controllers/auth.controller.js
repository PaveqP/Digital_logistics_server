const db = require('../db')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require("../config")

const generateAccessToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign({id: id}, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {name, surname, password, login} = req.body
            //const checkUser = await db.query('SELECT login FROM person WHERE login = $1', [login])
            const newPerson = await db.query('INSERT INTO person (name, surname, password, login) values ($1, $2, $3, $4) RETURNING *', [name, surname, password, login])
            res.json(newPerson.rows[0])
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await db.query(`SELECT * from person WHERE login = $1`, [username])
            if (user.rows.length == 0){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPas = user
            console.log(validPas)
            if (password !== validPas.rows[0].password){
                //res.json(validPas.rows[0])
                return res.status(400).json({message: "Введён неверный пароль"})
            }
            //console.log(user.rows[0].id, 'user ID')
            const token = generateAccessToken(user.rows[0].id)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Authorization error'})
        }
    }
}

module.exports = new authController()