const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  );

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:false
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReview:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    }
}, {timestamps:true})

// The name which is given within the model function is the actual name of the model which can be use for referencing into another schema i.e 'Product' under mongoose.model('Product',productSchema), the name of the variable should not be used under reference i.e. const Product
const Product = mongoose.model('Product',productSchema)

module.exports = Product