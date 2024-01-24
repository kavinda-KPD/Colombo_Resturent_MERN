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

export const getAllOrderReducer = (state={orders:[]} , action) => {

    switch (action.type) {
        case 'GET_ORDERS_REQUEST': return {
            loading:true,
            ...state
        }
        case 'GET_ORDERS_SUCCESS': return {
            loading:false,
            orders : action.payload
        }
        case 'GET_ORDERS_FAILED': return {
            loading:false,
            error : action.payload
        }
        default: return state
    }
}

export const getFamousDishesReducer = (state={} , action) => {

    switch (action.type) {
        case 'GET_FamousFoods_REQUEST': return {
            loading:true,
            ...state
        }
        case 'GET_FamousFoods_SUCCESS': return {
            loading:false,
            famousFood : action.payload
        }
        case 'GET_FamousFoods_FAILED': return {
            loading:false,
            error : action.payload
        }
        default: return state
    }
}

export const getRevenueReducer = (state={} , action) => {

    switch (action.type) {
        case 'GET_REVENUE_REQUEST': return {
            loading:true,
            ...state
        }
        case 'GET_REVENUE_SUCCESS': return {
            loading:false,
            revenue : action.payload
        }
        case 'GET_REVENUE_FAILED': return {
            loading:false,
            error : action.payload
        }
        default: return state
    }
}

export const getWeekRevenueReducer = (state={} , action) => {

    switch (action.type) {
        case 'GET_WEEK_REVENUE_REQUEST': return {
            loading:true,
            ...state
        }
        case 'GET_WEEK_REVENUE_SUCCESS': return {
            loading:false,
            wrevenue : action.payload
        }
        case 'GET_WEEK_REVENUE_FAILED': return {
            loading:false,
            error : action.payload
        }
        default: return state
    }
}