import * as AuthAPI from '../../api/AuthRequests'
import { AUTH_FAILURE, AUTH_START, AUTH_SUCCESS, LOGOUT } from "./authTypes"
import {toast} from 'react-toastify'


export const authStart = () => {
    return {
        type:AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type:AUTH_SUCCESS,
        payload:user
    }
}

export const authFailure = error => {
    return {
        type:AUTH_FAILURE,
        payload:error
    }
}

export const logout = () => {
    return {
        type:LOGOUT
    }
}

export const signup = (formData) => async (dispatch) => {
    dispatch(authStart())
    try {
        const user = await AuthAPI.register(formData)
        dispatch(authSuccess(user.data))
    } catch (error) {
        toast.error(error.response.data.message)
        dispatch(authFailure(error.response.data.message))
    }
}

export const login = (formData) => async (dispatch) => {
    dispatch(authStart())
    try {
        const user = await AuthAPI.login(formData)
        dispatch(authSuccess(user.data))
    } catch (error) {
        toast.error(error.response.data.message)
        dispatch(authFailure(error.response.data.message))
    }
}
