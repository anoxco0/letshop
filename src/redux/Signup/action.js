import axios from "axios";

export const SIGNUP_LOADING = 'SIGNUP_LOADING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signupLoading = () => ({
    type: SIGNUP_LOADING
})

export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload,
})

export const signupFailure = () => ({
    type: SIGNUP_FAILURE,
})

export const signup_success = (full_name, email, password) => (dispatch) => {
    dispatch(signupLoading());
    axios.post('https://letshop-server.herokuapp.com/register', {
            full_name: full_name,
            email: email,
            password: password,
        })
        .then(res => {
            let obj = {};
            if (res.data.token) {
                dispatch(signupSuccess({token:res.data.token}))
                alert("Successfully signed up!")
            } else {
                res.data.map(el => obj[el.param] = el.msg);
                dispatch(signupSuccess(obj));
            }
        })
        .catch(erroe => console.log(erroe));
}