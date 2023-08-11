const express = require("express")
const app = express()
const router = require('./routes/routes')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// middleware 
app.use(express.static('./static'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', router)
app.use(notFound)
app.use(errorHandlerMiddleware)

// starting server
const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('CONNECTED TO MONGODB')
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }    
} 

start()