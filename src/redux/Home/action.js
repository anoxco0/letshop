import axios from "axios";

export const DRAWER = 'DRAWER';
export const TOP_MOBILE_DATA = "TOP_MOBILE_DATA";
export const LOADING = "LOADING"
export const drawer = (payload)=>({
    type:DRAWER,
    payload,
});
export const loading = () =>({
    type:LOADING,
})
export const topMobileData = (payload) =>({
    type:TOP_MOBILE_DATA,
    payload,
})

export const getTopMobilesData = ()=>(dispatch)=>{
    dispatch(loading());
    axios.get("https://letshop-server.herokuapp.com/product?sort=rating&order=-1&limit=8").then(res=>dispatch(topMobileData(res.data))).catch(error=>console.log(error))
}