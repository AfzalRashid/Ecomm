const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const productRouter = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

connectDB()

const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', function(req,res){
    res.send('Welcome to Backend')
})

//Cookie parser middleware
app.use(cookieParser())



app.use('/products', productRouter);
app.use('/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, function(){
    console.log(`Listening at port: ${port}`)
})