const express = require('express')
const router = express.Router()


app = express()
app.use(express.json())


const userRouter = require('./routes/userRouter')
app.use('/api/user', userRouter)


const booksRouter = require('./routes/booksRouter')
app.use('/api/books', booksRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log('server is running on http://localhost:3000/')
