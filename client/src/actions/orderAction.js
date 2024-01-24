import axios from "axios";

export const placeOrder = () => async (dispatch,getState) => {
    
    dispatch({type:'PLACE_ORDER_REQUEST'})

    const orderItems = getState().cartReducer.cartItems;

    try {
        const response = await axios.post('/api/orders/placeorder', orderItems)    
        dispatch({type:'PLACE_ORDER_SUCCESS'})
        alert("Order Sent To the Kichen");
        console.log(response);
    } catch (error) {
        dispatch({type:'PLACE_ORDER_FAILD'})
        alert("Order Sent To the Kichen");
        console.log(error);
    }
}