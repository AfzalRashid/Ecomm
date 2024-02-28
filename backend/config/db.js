const mongoose = require('mongoose')

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Cnnection established ${conn.connection.host}`)
    } catch (error) {
        console.log('Error:'+ error.message)
    }

}

module.exports = connectDB