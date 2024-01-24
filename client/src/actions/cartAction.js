export const addToCart =(food,quantity)=>(dispatch,getState)=>{
    var cartItem = {
        name : food.name,
        _id : food._id,
        immage: food.image,
        quantity: quantity,
        unitPrice: food.price,
        price: food.price*quantity
    }

    dispatch({type:'ADD_TO_CART', payload:cartItem})

    const cartItems = getState().cartReducer.cartItems

    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}