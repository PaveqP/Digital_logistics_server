const express = require('express')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const RoutesRouter = require('./routes/routes.routes')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', RoutesRouter)
app.use('/api', authRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))