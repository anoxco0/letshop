import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"
import { signup_success } from "../../redux/Signup/action";
import { Navbar } from "../Navbar";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data =localStorage.getItem('user_status');

    const {loading,full_name, email, password, token} = useSelector(store=>store.signup_red)
    const [form, setForm] = useState({
        full_name:"",
        email:"",
        password:"",
    })
    console.log("token",token)
    const handleChange = (event)=>{
        const {className, value} = event.target;
        setForm({...form,[className]:value});
    }
    const Signup = ()=>{
        dispatch(signup_success(form.full_name,form.email, form.password));
       if(token!==undefined) navigate("/login")
    }
    if(data) 
    return(
        <Navigate to={"/"}/>
    )
    return (
        <div>
            <div><Navbar/></div>
            <div id="loginmain">
                <div id="sign">
                    <h1>Nice To Meet You</h1>
                    <input type="text" name="full_name" placeholder="Full Name" id="name" className="full_name" onChange={(event)=>handleChange(event)}/>
                    {full_name!==undefined?<p style={{color:"#A25B5B",display:"flex", alignItems:"center"}}><ErrorOutlineIcon/> {full_name}</p>:""}
                    <input type="email" name="email" placeholder="Email address" id="email" className="email" onChange={(event)=>handleChange(event)}/>
                    {email!==undefined?<p style={{color:"#A25B5B",display:"flex", alignItems:"center"}}><ErrorOutlineIcon/> {email}</p>:""}
                    <input type="password" name="password" placeholder="Password" id="password" className="password" onChange={(event)=>handleChange(event)}/>
                    {password!==undefined?<p style={{color:"#A25B5B", display:"flex", alignItems:"center"}}><ErrorOutlineIcon/> {password}</p>:""}
                    <div id="paras"></div>
                    <button id="button" onClick={()=>Signup()}>Continue {loading? <CircularProgress color="inherit" size={20} />:""} </button>
                </div>
                <div style={{marginTop:"20px"}}>I have an account,<p style={{color:'blue', cursor:'pointer'}} onClick={()=>navigate('/login')}>click here</p></div>
            </div>
        </div>
            )
}