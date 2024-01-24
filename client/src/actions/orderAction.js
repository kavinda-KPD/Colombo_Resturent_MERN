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

export const getAllOrders = () => async dispatch => {

    dispatch({type:'GET_ORDERS_REQUEST'});

    try {
        const response = await axios.get('/api/orders/getallorders');
        // console.log(response);
        dispatch({type:'GET_ORDERS_SUCCESS',payload:response.data});
    } catch (error) {
        dispatch({type:'GET_ORDERS_FAILED',payload:error});
    }
}