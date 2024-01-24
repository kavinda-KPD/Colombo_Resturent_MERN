export const addToCart =(food,quantity)=>(dispatch,getState)=>{
    var cartItem = {
        name : food.name,
        _id : food._id,
        image: food.image,
        quantity: quantity,
        unitPrice: food.price,
        price: food.price*quantity,
        category: food.category
    }

    dispatch({type:'ADD_TO_CART', payload:cartItem})

    const cartItems = getState().cartReducer.cartItems

    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}