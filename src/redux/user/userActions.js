import * as FetchAPI from '../../api/AuthRequests'
import { FETCH_USERS_FAILURE, FETCH_USERS_START, FETCH_USERS_SUCCESS } from './userTypes'



const fetchStart = () => {
    return {
        type: FETCH_USERS_START
    }
}

const fetchSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const fetchData=()=>async(dispatch)=>{
    dispatch(fetchStart())
    try {
        const data=await FetchAPI.getUser()
       
        dispatch(fetchSuccess(data.data))
    } catch (error) {
        dispatch(fetchFailure(error.response.data.message))
    }
}



