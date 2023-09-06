require('dotenv').config()
require("express-async-errors")

const express = require('express')
const mongoose = require("mongoose")
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./routes/auth')

const authMiddleware = require('./middleware/authMiddleware')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json())

// Authentication route
app.use("/api/auth", authRouter)

app.get("/api/test", authMiddleware, (req, res) => { res.send('HELLLLOO') }) // testing auth middleware

// error handlers
app.use(notFound)
/*
The program funnels 404 requests to the notFoundMiddleware because of the order in which middleware is applied in Express.js.
When a request is made to a route that doesn't match any of the defined routes, none of the previous middleware or route 
handlers are executed. Instead, Express.js proceeds to look for a middleware that handles 404 errors.

When you throw an error, it propagates up the middleware stack until it reaches a middleware function that can handle it. 
In your case, the errorHandlerMiddleware is such a middleware because it's defined to accept errors as its first parameter (err).
*/
app.use(errorHandler)



PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Server listening on port ${PORT}`);
})