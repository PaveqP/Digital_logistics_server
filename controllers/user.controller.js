const db = require('../db')

class UserController {

    async getUsers(req, res){
        const users = await db.query('SELECT * FROM person');
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const id = req.user.id
        const user = await db.query('SELECT * FROM person where id = $1', [id]);
        res.json(user.rows[0])
    }
    async updateUser(req, res){
        const {name, surname} = req.body
        const id = req.user.id
        const userUpdated = db.query('UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id])
        res.json(userUpdated)
    }
    async deleteUser(req, res){
        const id = req.user.id
        const user = await db.query('DELETE FROM person where id = $1', [id]);
        res.json(user.rows[0])
    }
}

module.exports = new UserController()