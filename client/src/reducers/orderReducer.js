export const placeOrderReducer = (state={} , action) => {

    switch (action.type) {
        case 'PLACE_ORDER_REQUEST': return {
            loading:true,
      
        }
        case 'PLACE_ORDER_SUCCESS': return {
            loading:false,
            success : true
        }
        case 'PLACE_ORDER_FAILD': return {
            loading:false,
            success : false
        }
        default: return state
    }
}