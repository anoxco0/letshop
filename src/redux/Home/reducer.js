import { DRAWER, LOADING, TOP_MOBILE_DATA } from "./action"


const initialState = {
    loading:false,
    drawerStatus:false,
    TopMobilesData:[],
}

export const homeReducer = (store=initialState,{type,payload})=>{
    switch(type){
        case DRAWER:
            return{
                ...store,
                drawerStatus:payload,
            }
        case TOP_MOBILE_DATA:
            return{
                ...store,
                loading:false,
                TopMobilesData:payload
            }
        case LOADING:
            return{
                ...store,
                loading:true,
            }
        default :
        return store
    }
}