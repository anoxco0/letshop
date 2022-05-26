import axios from "axios";

export const GET_FILTER = "GET_FILTER";
export const BRAND = "BRAND";
export const RATING = "RATING";
export const RAM = "RAM";
export const INTERNAL_STORAGE = "INTERNAL_STORAGE";
export const BATTERY_CAPACITY = "BATTERY_CAPACITY";
export const SCREEN_SIZE = "SCREEN_SIZE";
export const PRIMARY_CAMERA = "PRIMARY_CAMERA";
export const SECONDARY_CAMERA = "SECONDARY_CAMERA";
export const PROCESSOR_BRAND = "PROCESSOR_BRAND";
export const SPECIALITY = "SPECIALITY";
export const RESOLUTION_TYPE = "RESOLUTION_TYPE";
export const OPERATING_SYSTEM = "OPERATING_SYSTEM";
export const NETWORK_TYPE = "NETWORK_TYPE";
export const SIM_TYPE = "SIM_TYPE";
export const BUDGET = "BUDGET";
export const FEATURES = "FEATURES";
export const TYPE = "TYPE";
export const NUMBER_OF_CORES = "NUMBER_OF_CORES";
export const OPERATING_SYSTEM_VERSION_NAME = "OPERATING_SYSTEM_VERSION_NAME";
export const CLOCK_SPEED = "CLOCK_SPEED";
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const CART_ITEMS = "CART_ITEMS"
export const PRODUCTS_QUANTITY = "PRODUCTS_QUANTITY"

export const getFilter = (payload) =>({
    type:GET_FILTER,
    payload,
})
export const Rating = (payload)=>({
    type:RATING,
    payload,
})

export const Ram = (payload)=>({
    type:RAM,
    payload,
})
export const InternalStorage = (payload)=>({
    type:INTERNAL_STORAGE,
    payload,
})

export const BateryCapacity = (payload)=>({
    type:BATTERY_CAPACITY,
    payload,
})
export const ScreenSize = (payload)=>({
    type:SCREEN_SIZE,
    payload,
})
export const PrimaryCamera = (payload)=>({
    type:PRIMARY_CAMERA,
    payload,
})
export const SecondaryCamera = (payload)=>({
    type:SECONDARY_CAMERA,
    payload,
})
export const ProcessorBrand = (payload)=>({
    type:PROCESSOR_BRAND,
    payload,
})
export const Speciality = (payload)=>({
    type:SPECIALITY,
    payload,
})
export const ResolutionType = (payload)=>({
    type:RESOLUTION_TYPE,
    payload,
})
export const OperatingSystem = (payload)=>({
    type:OPERATING_SYSTEM,
    payload,
})
export const NetworkType = (payload)=>({
    type:NETWORK_TYPE,
    payload,
})
export const SimType = (payload)=>({
    type:SIM_TYPE,
    payload,
})
export const Budget = (payload)=>({
    type:BUDGET,
    payload,
})

export const Features = (payload)=>({
    type:FEATURES,
    payload,
})
export const Type = (payload)=>({
    type:TYPE,
    payload,
})
export const NumberOfCores = (payload)=>({
    type:NUMBER_OF_CORES,
    payload,
})
export const OperatingSystemVersionName = (payload)=>({
    type:OPERATING_SYSTEM_VERSION_NAME,
    payload,
})

export const ClockSpeed = (payload)=>({
    type:CLOCK_SPEED,
    payload,
})
export const Brand = (payload)=>({
    type:BRAND,
    payload,
})
export const getAllProduct=(payload)=>({
    type:GET_ALL_PRODUCT,
    payload,
})
export const getProductDetail = (payload)=>({
    type:GET_PRODUCT_DETAIL,
    payload,
})
export const cartItem = (payload)=>({
    type:CART_ITEMS,
    payload
})

export const productsQuantity = (payload) =>({
    type:PRODUCTS_QUANTITY,
    payload,
})

export const get_filter = (product) => (dispatch) => {
    axios.get(`https://letshop-server.herokuapp.com/filter?type=${product}`).then(res=>dispatch(getFilter(res.data[0]))).catch(error=>console.log(error));
}

export const get_All_Product = (product_name,pro, sort)=>(dispatch)=>{
        axios.get(`https://anoxco0-product.herokuapp.com/mobile?${pro}&${sort}`).then(res=>dispatch(getAllProduct(res.data)))
        .catch(error=>console.log(error))
}

export const get_Product_details=(id)=>(dispatch) =>{
    axios.get(`https://letshop-server.herokuapp.com/product/${id}`).then(res=>dispatch(getProductDetail(res.data))).catch(error=>console.log(error));
}
