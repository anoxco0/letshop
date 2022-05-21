import { BATTERY_CAPACITY, BRAND, BUDGET, CART_ITEMS, CLOCK_SPEED, FEATURES, GET_ALL_PRODUCT, GET_FILTER, GET_PRODUCT_DETAIL, INTERNAL_STORAGE, NETWORK_TYPE, NUMBER_OF_CORES, OPERATING_SYSTEM, OPERATING_SYSTEM_VERSION_NAME, PRIMARY_CAMERA, PROCESSOR_BRAND, PRODUCTS_QUANTITY, RAM, RATING, RESOLUTION_TYPE, SCREEN_SIZE, SECONDARY_CAMERA, SIM_TYPE, SPECIALITY, TYPE, } from "./action"

const initial = {
    filter_temp : {},
    brand:false,
    rating:true,
    ram:false,
    internalStorage:false,
    batteryCapacity:false,
    screenSize:false,
    primaryCamera:false,
    secondaryCamera:false,
    processorBrand:false,
    speciality:false,
    resolutionType:false,
    operatingSystem:false,
    networkType:false,
    simType:false,
    budget:false,
    features:false,
    type:false,
    numberOfCores:false,
    operatingSystemVersionName:false,
    clockSpeed:false,
    AllProduct: [],
    oneProduct:{},
    CartItem:0,
    ProductQuantity:1,
}

export const products_reducer = (store = initial,{type, payload})=>{
    switch(type){
        case GET_FILTER:
            return {
                ...store,
                filter_temp:payload,
            }
        case BRAND:
            return {
                ...store, 
                brand:payload,
            }
        case RATING:
            return {
                ...store,
                rating:payload,
            }
        case RAM:
            return{
                ...store,
                ram:payload,
            }
        case INTERNAL_STORAGE:
            return {
                ...store,
                internalStorage:payload,
            }
        case BATTERY_CAPACITY:
            return {
                ...store,
                batteryCapacity:payload
            }
        case SCREEN_SIZE:
            return {
                ...store,
                screenSize:payload,
            }
        case PRIMARY_CAMERA:
            return {
                ...store,
                primaryCamera:payload,
            }
        case SECONDARY_CAMERA:
            return {
                ...store,
                secondaryCamera:payload,
            }
        case PROCESSOR_BRAND:
            return{
                ...store,
                processorBrand:payload,
            }
        case SPECIALITY:
            return {
                ...store,
                speciality:payload,
            }
        case RESOLUTION_TYPE:
            return {
                ...store,
                resolutionType:payload,
            }
        case OPERATING_SYSTEM:
            return {
                ...store,
                operatingSystem:payload,
            }
        case NETWORK_TYPE:
            return {
                ...store,
                networkType:payload,
            }
        case SIM_TYPE:
            return {
                ...store,
                simType:payload,
            }
        case BUDGET:
            return {
                ...store,
                budget:payload,
            }
        case FEATURES:
            return {
                ...store,
                features:payload,
            }
        case TYPE:
            return {
                ...store,
                type:payload,
            }
        case NUMBER_OF_CORES:
            return {
                ...store,
                numberOfCores:payload,
            }
        case OPERATING_SYSTEM_VERSION_NAME:
            return {
                ...store,
                operatingSystemVersionName:payload,
            }
        case CLOCK_SPEED:
            return {
                ...store,
                clockSpeed:payload,
            }
        case GET_ALL_PRODUCT:
            return {
                ...store,
                AllProduct:payload,
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...store,
                oneProduct:payload
            }
        case CART_ITEMS:
            return {
                ...store,
                CartItem:(store.CartItem+payload),
            }
        case PRODUCTS_QUANTITY:
            if(store.ProductQuantity===0&&payload<1) return;
            return {
                ...store,
                ProductQuantity:payload,
            }
        default:
            return store
    }
}