const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const productRouter = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', function(req,res){
    res.send('Welcome to Backend')
})

//Body parser middleware




app.use('/products', productRouter);
app.use('/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, function(){
    console.log(`Listening at port: ${port}`)
})