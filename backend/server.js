const express = require('express')
const colours = require('colours')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.status(200).json({something :`BRUH ${PORT}`})
})

app.use('/api/user',require('./routes/userRouter'))
app.use(errorHandler)


app.listen(PORT , ()=>console.log(`Server started on ${PORT}`))

