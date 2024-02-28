const users= require('./data/users')
const products = require('./data/products')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const Order = require('./models/order.model')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

    
    async function importData (){

        try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)
        const sampleProducts = products.map((product) => {return {... product, user: createdUser[0]._id}}
        )
        
        await Product.insertMany(sampleProducts)

        console.log("Data imported")
        process.exit()
        }
        catch(e){
            console.log(e)
            process.exit(1)
        }

    }


    async function destroyData () {
        try {
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()

            console.log('Data Destroyed !')
            process.exit()
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }

    if(process.argv[2] === '-d')
    destroyData()
    else {
    importData() }