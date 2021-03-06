import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'


// @desc Get Cart from ID
// @route GET /api/cart/:id
// @access Public
const getCart = asyncHandler(async (req, res) => {
    const cartID = req.params.id
    // console.log(cartID)
    const savedCart = await Cart.findById(req.params.id)
    res.json({
        cartID: savedCart._id,
        cartItems: savedCart.cartItems
    })
})

// @desc Save Cart to DB
// @route POST /api/cart
// @access Staff
const saveCart = asyncHandler(async (req, res) => {
    const cartItems = req.body
    const savedCart = await Cart.create({
        cartItems: cartItems
    })
    if (savedCart) {
        res.json({
            cartID: savedCart._id,
            cartItems: savedCart.cartItems
        })
    } else {
        res.status(400)
        throw new Error('Invalid Cart Data')
    }
})


export {
    getCart,
    saveCart
}