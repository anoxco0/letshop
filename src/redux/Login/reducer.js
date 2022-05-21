import { LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS } from "./action"

const initial ={
    loading:false,
    user_name:"",
    token:"",
    Error:"",
}

export const Login_reducer = (store=initial,{type, payload})=>{
    switch(type){
        case LOGIN_LOADING:
            return {
                ...store,
                loading:true,
                Error:""
            }
        case LOGIN_SUCCESS:
            return {
                ...store,
                loading:false,
                error:false,
                user_name:payload.user_name,
                token:payload.token,
                Error:"",
            }
        case LOGIN_FAILURE:
            return {
                ...store,
                loading:false,
                Error:payload,
            }
        default:
            return store
    }
}