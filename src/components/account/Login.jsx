import { Navbar } from "../Navbar"
import './login.css'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { login_success } from "../../redux/Login/action";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data =localStorage.getItem('user_status');
    const {loading, token, Error} = useSelector(store=>store.login_red)
    const [form, setForm] = useState({
        email:"",
        password:"",
    })
    
    const handleChange = (event)=>{
        const {className, value} = event.target;
        setForm({...form,[className]:value});
    }
    
    const login = ()=>{
        dispatch(login_success(form.email, form.password));
        if(token!=="") navigate('/')
    }
    if(data) 
    return(
        <Navigate to={"/"}/>
    )
    return (
        <div>
            <div><Navbar /></div>
            <div id="loginmain">
                <div id="sign">
                    <h1>Sign In</h1>
                    <input required type="email" name="email" className="email" placeholder="Email address" id="Log_email" onChange={(event)=>handleChange(event)} />
                    <input required type="password" name="password" className="password" placeholder="Password" id="Log_password" onChange={(event)=>handleChange(event)} />
                    <div id="paras"></div>
                    {Error!==""?<p style={{color:"#A25B5B", display:"flex", alignItems:"center"}}><ErrorOutlineIcon/> {Error}</p>:''}
                    <button id="button" onClick={()=>login()}>Continue {loading? <CircularProgress color="inherit" size={20} />:""}</button>
                </div>
                <p id="forpass">Forget Password?</p>
                <div style={{cursor:"pointer"}} onClick={()=>navigate('/register')}>Continue as a new customer</div>
            </div>
        </div>
    )
}