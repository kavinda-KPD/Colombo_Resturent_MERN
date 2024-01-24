import axios from 'axios'

export const getAllFoods = () => dispatch => {

    dispatch({type:'GET_FOOD_REQUEST'});

    try {
        const response = axios.get('/api/foods/getfoods');
        console.log(response);
        dispatch({type:'GET_FOOD_SUCCESS',payload:response.data});
    } catch (error) {
        dispatch({type:'GET_FOOD_FAILED',payload:error});
    }


}