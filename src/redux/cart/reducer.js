import { CART_ITEMS_ARR, CART_TOTAL, DELETE_CART_FAILURE, DELETE_CART_LOADING, DELETE_CART_SUCCESS, GET_CART, PATCH_CART_FAILURE, PATCH_CART_LOADING, PATCH_CART_SUCCESS, post_CART_FAILURE, POST_CART_LOADING, POST_CART_SUCCESS, TOTAL_CART_ITEM, TOTAL_DISCOUNT, TOTAL_PRICE } from "./action"


const initialValue = {
    TotalItems:0,
    TotalPrice:0,
    TotalDiscount:0,
    CartItemsArr:[],
    CartItems:[],
    postLoading:false,
    postSuccess:false,
    postFailure:false,
    patchLoading:false,
    patchSuccess:false,
    patchFailure:false,
    deleteLoading:false,
    deleteSuccess:false,
    deleteFailure:false,
}
export const cartReducer = (store=initialValue,{type,payload})=>{
    switch(type){
        case TOTAL_CART_ITEM:
            return{
                ...store,
                TotalItems:payload,
                
            }
            case CART_TOTAL:
                return{
                    ...store,
                    TotalPrice:payload.totalPrices,
                    TotalDiscount:payload.totalDiscount,

            }
        case CART_ITEMS_ARR:
            return{
                ...store,
                CartItemsArr:payload
            }
        case GET_CART:
            return{
                ...store,
                CartItems:payload
            }
        case POST_CART_LOADING:
            return {
                ...store,
                postLoading:true,
                postSuccess:false,
            }
        case POST_CART_SUCCESS:
            return{
                ...store,
                postSuccess:true,
                postLoading:false,
            }
        case post_CART_FAILURE:
            return{
                ...store,
                postFailure:true,
                postSuccess:false,
                postLoading:false,
            }
            case PATCH_CART_LOADING:
                return {
                    ...store,
                    patchLoading:true,
                    patchSuccess:false,
                }
            case PATCH_CART_SUCCESS:
                return{
                    ...store,
                    patchSuccess:true,
                    patchLoading:false,
                }
            case PATCH_CART_FAILURE:
                return{
                    ...store,
                    patchFailure:true,
                    patchSuccess:false,
                    patchLoading:false,
                }
            case TOTAL_PRICE:
                return{
                    ...store,
                    TotalPrice:payload,
                }
            case TOTAL_DISCOUNT:
                return{
                    ...store,
                    TotalDiscount:payload,

                }
                case DELETE_CART_LOADING:
                    return {
                        ...store,
                        deleteLoading:true,
                        deleteSuccess:false,
                    }
                case DELETE_CART_SUCCESS:
                    return{
                        ...store,
                        deleteSuccess:true,
                        deleteLoading:false,
                    }
                case DELETE_CART_FAILURE:
                    return{
                        ...store,
                        deleteFailure:true,
                        deleteSuccess:false,
                        deleteLoading:false,
                    }
        default :
            return store
    }
}