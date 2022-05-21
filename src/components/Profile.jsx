import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const navigate  = useNavigate();
    const {user_name} = JSON.parse(localStorage.getItem("user_status"));
    console.log(user_name)
    const logout = ()=>{
        localStorage.removeItem("user_status");
        navigate("/")
    }
    return (
        <div>
            <div><Navbar /></div>
            <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ backgroundColor: "white" , padding:"50px 100px", borderRadius:"10px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", heigh:"150px", alignItems:"center", gap:"30px"}}>
                        <img style={{ width: "150px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/768px-Microsoft_Account.svg.png?20170218203212" alt="" />
                        <div>
                            <h3>Hello,</h3>
                            <h1>{user_name}</h1>
                        </div>
                    </div>
                    <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" color="success" onClick={()=>logout()}>
                            Logout <LogoutIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}