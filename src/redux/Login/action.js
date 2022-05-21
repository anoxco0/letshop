import axios from "axios";

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginLoading = () => ({
    type: LOGIN_LOADING
})

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
})

export const loginFailure = (payload) => ({
    type: LOGIN_FAILURE,
    payload,
})

export const login_success = (email, password) => (dispatch) => {
    dispatch(loginLoading());
    axios.post('https://letshop-server.herokuapp.com/login', {
            email: email,
            password: password,
        })
        .then(res => {
            const obj = {
                user_name: res.data.user.full_name,
                token: res.data.token
            }
            if (!res.data.token) dispatch(loginFailure("invalid email and password!"));
            else {
                dispatch(loginSuccess({
                    user_name: res.data.user.full_name,
                    token: res.data.token
                }));
                localStorage.setItem("user_status", JSON.stringify(obj));
                alert('signin successfully!');
            }
        })
        .catch(erroe => dispatch(loginFailure("invalid email and password!")));
}