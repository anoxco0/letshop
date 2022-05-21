import { SIGNUP_FAILURE, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./action"

const initial ={
    loading:false,
    Error:false,
    full_name:undefined,
    email:undefined,
    password:undefined,
    token:undefined,
}

export const signup_reducer = (store=initial,{type, payload})=>{
    switch(type){
        case SIGNUP_LOADING:
            return {
                ...store,
                loading:true,
                Error:""
            }
        case SIGNUP_SUCCESS:
            return {
                ...store,
                loading:false,
                error:false,
                full_name:payload.full_name,
                email:payload.email,
                password:payload.password,
                token:payload.token
            }
        case SIGNUP_FAILURE:
            return {
                ...store,
                loading:false,
                Error:payload,
            }
        default:
            return store
    }
}