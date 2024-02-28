export const updateCart = function(state) {
    state.itemsPrice = state.cartItems.reduce(function(acc, x){
        return acc + x.price * x.qty
    }, 0)

    state.shippingPrice = state.itemsPrice > 100 ? 0 : 10

    state.taxPrice = state.itemsPrice * 0.15

    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)


    localStorage.setItem('cart',JSON.stringify(state))
}