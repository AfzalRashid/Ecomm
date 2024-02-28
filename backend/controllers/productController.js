const Product = require('../models/product.model')
const asyncHandler = require('../middleware/ayncHandler')

module.exports.getProducts = asyncHandler(async function (req,res) {
    const products = await Product.find({})
    res.json(products)
})


module.exports.getProductById = asyncHandler(async function(req,res){
    const product = await Product.findById(req.params.id)
    if (product) {
    res.json(product) }
    else {
        res.status(404)
        throw new Error('Product not found')
    }

})

