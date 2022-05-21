import { compose } from "@mui/system";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./cart/reducer";
import { homeReducer } from "./Home/reducer";
import { products_reducer } from "./Products/reducer";

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
});

export const store = createStore(rootReducer, enhancer);