import { createSlice } from "@reduxjs/toolkit"
import {updateCart} from "../utils/cartUtils"

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []}

const cartSlice = createSlice({
name : "cart",
initialState,
reducers:{
    addToCart : function (state, action) {
            const item = action.payload
            const existingItem = state.cartItems.find(function (x) {
                    return x._id === item._id
            })

            if (existingItem) {
                state.cartItems = state.cartItems.map(function(x) {
                    return existingItem._id === x._id ? item : x
                })
            } else {
                state.cartItems.push(item)
            }

            updateCart(state)
    },

    removeFromCart: function (state,action) {
        const itemID = action.payload
        state.cartItems = state.cartItems.filter((item)=>item._id !== itemID )
        updateCart(state)
    }
}
})

export const {addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer