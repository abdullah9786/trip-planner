
const express = require('express')
require('express-async-errors');
const connectDB = require('./src/Config/DatabaseConfig')
// const notFound = require('./src/api/v1/middleware/not-found');
const errorHandlerMiddleware = require('./src/Errors/error-handler-middlerware');
require ('dotenv').config()

const port = 3003

const app = express()
var cors = require('cors')
app.set('trust proxy', 1);
app.use('/api/v1/webhook',express.raw({type: 'application/json'}) ,require('./src/api/v1/Routes/webhook'))

app.use(express.json())
app.use(cors())

// available routes
// app.use('/api/v1/websites', require('./src/api/v1/Routes/websites'))
app.use('/api/v1/users', require('./src/api/v1/Routes/users'))
app.use('/api/v1/coupons', require('./src/api/v1/Routes/coupons'))
app.use('/api/v1/ai', require('./src/api/v1/Routes/ai-response'))
app.use('/api/v1/payment', require('./src/api/v1/Routes/payment'))

// Middlewares
// app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {console.log(`Server started on port ${port}...`)})
    } catch (error) {
        console.log(error);
    }
}
start()

