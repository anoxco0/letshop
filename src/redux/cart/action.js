import axios from "axios";

export const CART_ITEM_LIST = "CART_ITEM_LIST";
export const TOTAL_CART_ITEM = "TOTAL_CART_ITEM";
export const CART_ITEMS_ARR = "CART_ITMS_ARR"
export const CART_TOTAL = "CART_TOTAL";
export const REMOVE_ELEMENT = "REMOVE_ELEMENT";

export const GET_CART = "GET_CART";
export const TOTAL_PRICE = "TOTAL_PRICE";
export const TOTAL_DISCOUNT = "TOTAL_DISCOUNT";
export const POST_CART_LOADING = "POST_CART_LOADING";
export const POST_CART_SUCCESS = "POST_CART_SUCCESS";
export const post_CART_FAILURE = "POST_CART_FAILURE";
export const PATCH_CART_LOADING = "PATCH_CART_LOADING";
export const PATCH_CART_SUCCESS = "PATCH_CART_SUCCESS";
export const PATCH_CART_FAILURE = "PATCH_CART_FAILURE";
export const DELETE_CART_LOADING = "DELETE_CART_LOADING";
export const DELETE_CART_SUCCESS = "DELETE_CART_SUCCESS";
export const DELETE_CART_FAILURE = "DELETE_CART_FAILURE";


export const cartItemList = (payload) => ({
    type: CART_ITEM_LIST,
    payload,
})
export const totalCartItem = (payload) => ({
    type: TOTAL_CART_ITEM,
    payload
})

export const cartItemsArr = (payload) => ({
    type: CART_ITEMS_ARR,
    payload,
})
export const cartTotal = (payload) => ({
    type: CART_TOTAL,
    payload,
})
export const getCart = (payload) => ({
    type: GET_CART,
    payload,
})
export const totalPrice = (payload) =>({
    type:TOTAL_PRICE,
    payload,
})
export const totalDiscount = (payload)=>({
    type:TOTAL_DISCOUNT,
    payload,
})
export const postCartloading = () => ({
    type: POST_CART_LOADING,
})
export const postCartSuccess = () => ({
    type: POST_CART_SUCCESS,
})
export const postCartFailure = () => ({
    type: post_CART_FAILURE
})

export const patchCartloading = () => ({
    type: PATCH_CART_LOADING,
})
export const patchCartSuccess = () => ({
    type: PATCH_CART_SUCCESS,
})
export const patchCartFailure = () => ({
    type: PATCH_CART_FAILURE
})
export const deleteCartloading = () => ({
    type: DELETE_CART_LOADING,
})
export const deleteCartSuccess = () => ({
    type: DELETE_CART_SUCCESS,
})
export const deleteCartFailure = () => ({
    type: DELETE_CART_FAILURE
})

export const get_cart = () => (dispatch) => {
    let total_item = 0;
    let total_price = 0;
    let total_discount=0;
    axios.get('http://localhost:5000/cart')
        .then(res => {
            res.data.map((el) =>{ total_item += el.quantity; total_price+=+el.product.price*+el.quantity;total_discount+=(+el.product.price-+el.product.total_price)*el.quantity});
            dispatch(totalCartItem(total_item));
            dispatch(totalPrice(total_price));
            dispatch(totalDiscount(total_discount));
            dispatch(getCart(res.data))
        })
        .catch(error => console.log(error));
}
export const post_cart = (product) => (dispatch) => {
    console.log(product)
    dispatch(postCartloading());
    axios.post(`http://localhost:5000/cart`, {
        product:product,
        quantity: 1
    }).then(res =>{console.log(res.data); dispatch(postCartSuccess())}).catch(error => dispatch(postCartFailure()))
}

export const patch_cart = (id, value) => (dispatch) => {
    dispatch(patchCartloading());
    axios.patch(`http://localhost:5000/cart/${id}`, {
        quantity: value
    }).then(res => dispatch(postCartSuccess())).catch(error => dispatch(patchCartFailure()))
}

export const delete_cart = (id) => (dispatch) => {
    dispatch(deleteCartloading());
    axios.delete(`http://localhost:5000/cart/${id}`).then(res => dispatch(deleteCartSuccess())).catch(error => dispatch(deleteCartFailure()))
}


export const total_cart_item = (value) => (dispatch) => {
    // value ? dispatch(totalCartItem(value)) :
    //     axios.get("http://localhost:8000/cartList")
    //     .then(res => {
    //         let totalItems = 0,
    //             totalPrices = 0,
    //             totalDiscount = 0;
    //         res.data.forEach(el => {
    //             totalItems += el.quantity;
    //             totalPrices += el.price;
    //             totalDiscount += (el.price - el.total_price)
    //         });
    //         dispatch(totalCartItem({
    //             totalItems,
    //             totalPrices,
    //             totalDiscount
    //         }));
    //     }).catch(error => console.log(error));
}
export const getCartItems = () => (dispatch) => {
    axios.get('http://localhost:8000/cartList')
        .then((res) => {
            console.log(res.data)
            let totalPrices = 0;
            let totalDiscount = 0;
            let arr = [];
            res.data.map((el, i) => {
                axios.get(`http://localhost:8000/mobile?id=${el.Product_id}`).then((re) => {
                    arr.push(re.data[0]);
                    totalPrices += (+re.data[0].price) * res.data[i].quantity;
                    totalDiscount += (re.data[0].price - re.data[0].total_price) * res.data[i].quantity;
                    arr[i].quantity = res.data[i].quantity;
                    arr[i].cart_id = res.data[i].id;
                    if (i + 1 === res.data.length) {
                        dispatch(cartItemsArr(arr));
                        dispatch(cartTotal({
                            totalPrices,
                            totalDiscount
                        }))
                    };
                })
            })
        }).catch(error => console.log(error));
}
export const remove_element = (id) => (dispatch) => {
    console.log(id)
    axios.delete(`http://localhost:8000/cartList/${id}`).then((res) => console.log("dele", res.data)).catch((error) => console.log(error))
}
export const edit_element = (id, value) => (dispatch) => {
    axios.get(`http://localhost:8000/cartList?${id}`).then((res) => {
        if (res.data[0].quantity === 1 && value === -1) {
            dispatch(remove_element(id));
        } else
            axios.patch(`http://localhost:8000/cartList/${id}`, {
                quantity: res.data[0].quantity + value
            }).then((res) => dispatch(total_cart_item())).catch((error) => console.log(error))

    }).catch(er => console.log(er))
}