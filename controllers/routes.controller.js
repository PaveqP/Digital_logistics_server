const db = require('../db')
const jwt = require('jsonwebtoken')
const {secret} = require("../config")


class RoutesController {
    
    async createRoute(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret)
        const user_id = decodedData.id
        const {number, exit_date, enter_date, exit_city, enter_city, userId, weight, volume, duration} = req.body
        const newRoute = await db.query('INSERT INTO route (number, exit_date, enter_date, exit_city, enter_city, route_id, weight, volume, duration) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
        [number, exit_date, enter_date, exit_city, enter_city, user_id, weight, volume, duration])
        res.json(newRoute.rows[0])
    }

    async getRoutesByUser(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret)
        const user_id = decodedData.id
        const routes = await db.query('select * from route where route_id = $1', [user_id])
        res.json(routes.rows)
    }

    async deleteRoute(req, res){
        const id = req.headers.id
        await db.query('DELETE from route where id = $1', [id])
        console.log(id)
        res.json("OK")
    }

    async updateRoute(req, res){
        const {id, number, exit_date, enter_date, exit_city, enter_city, weight, volume, duration} = req.body
        const newRoute = await db.query('UPDATE route set number = $1, exit_date = $2, enter_date = $3, exit_city = $4, enter_city = $5, weight = $6, volume = $7, duration = $8 where id = $9 RETURNING *', 
        [number, exit_date, enter_date, exit_city, enter_city, weight, volume, duration, id])
        res.json(newRoute.rows[0])
    }

    
}

module.exports = new RoutesController()