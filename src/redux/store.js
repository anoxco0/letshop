import { compose } from "@mui/system";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./cart/reducer";
import { homeReducer } from "./Home/reducer";
import { Login_reducer } from "./Login/reducer";
import { products_reducer } from "./Products/reducer";
import { signup_reducer } from "./Signup/reducer";

const composeEnhancer = 
typeof window === 'object' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
   }):compose;

   const middleware = [thunk]
const enhancer = composeEnhancer(
    applyMiddleware(...middleware),
);
const rootReducer = combineReducers({
    home:homeReducer,
    products_red:products_reducer,
    cart_red:cartReducer,
    login_red:Login_reducer,
    signup_red:signup_reducer
});

export const store = createStore(rootReducer, enhancer);