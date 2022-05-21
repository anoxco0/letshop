import { Route, Routes } from "react-router-dom"
import { Login } from "./account/Login"
import { Signup } from "./account/Signup"
import { Cart } from "./Cart"
import { Categories } from "./Categories"
import { Checkout } from "./Checkout"
import { Home } from "./Home"
import { ProductDes } from "./ProducDes"
import { Product } from "./Product"
import {Profile} from "./Profile"

export const Router = ()=>{
    
    return <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/products/:product_name" element={<Product/>}/>
          <Route path="/product/:model_name" element={<ProductDes/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>} />
      </Routes>
       
    </>
}