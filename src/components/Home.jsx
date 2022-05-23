import { Navbar } from "./Navbar"
import './home.css'
import { Footer } from "./Footer";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import { useDispatch, useSelector } from "react-redux";
import { drawer, getTopMobilesData } from "../redux/Home/action";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export const Home = ()=>{
  const {loading} = useSelector(store=>store.home);
  // const Grocery_items = [
  //   {img:'https://rukminim2.flixcart.com/flap/128/128/image/50474c.jpg',
  //   type:"Staples"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/9fbd36.jpg",
  //   type:"Snacks"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/ac8550.jpg",
  //   type:"Packaged_food"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/7670e2.jpg",
  //   type:"Baby_Care"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/b7ade9.jpg",
  //   type:"Household_Care"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/8014b1.jpg",
  //   type:"Dairy"
  // },
  // {
  //   img:"https://rukminim2.flixcart.com/flap/128/128/image/e6e0ecc56771471a.png",
  //   type:"Kitchen"
  // }
  // ]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {TopMobilesData, drawerStatus} = useSelector(store=>store.home);
  React.useEffect(()=>{
    dispatch(getTopMobilesData());
  },[])
  const toggleDrawer=(status)=>{
     dispatch(drawer(status));
  }
  console.log(TopMobilesData)
  const listItem = [
    {text:'All Categories', icon:GridViewIcon}
  ]
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={()=>toggleDrawer(false)}
      onKeyDown={()=>toggleDrawer(false)}
    >
      <List>
        {listItem.map((ele, index) => (
          <ListItem key={ele.text} onClick={()=>navigate('/categories')} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ele.icon />
              </ListItemIcon>
              <ListItemText primary={ele.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      </List>
    </Box>
  );
    return <>
    <div style={{position:"fixed", width:'100%', top:0, zIndex:2}}>
      <Navbar />
    </div>
    <div>
      <Drawer
        anchor='left'
        open={drawerStatus}
        onClose={()=>toggleDrawer(false)}
      >
        {list('left')}
      </Drawer>
    </div>
      <div style={{marginTop:'100px'}}>
        {/* <div className="mainproddiv" id="grocery">
           <div className="prodCat">
             <div>Grocery</div>
             <div>View All</div>
           </div>
           <div className="prod-div">
             {Grocery_items.map((el)=><div className="grocery_types" key={el.img}>
                <img src={el.img} alt="" />
                <div style={{position:"absolute",height:"100%", width:"100%",display:"flex",flexDirection:"column",justifyContent:"end", borderRadius:"0 0 8px 8px"}} ><div style={{backgroundColor:"teal",borderRadius:"0 0 8px 8px"}} ><p>{el.type.split('_').join(" ")}</p></div></div>%
             </div>)}
           </div>
        </div> */}

        <div className="mainproddiv" id="mobiles">
           <div className="prodCat">
             <div>Mobiles</div>
             <div onClick={()=>navigate(`/products/${'mobile'}`)}>View All</div>
           </div>
           <div className="prod-div">
             {TopMobilesData.map((el,i)=><div key={el.Model} onClick={()=>navigate(`/product/${el._id}`)}>
               <div className="top_prod_main">
               <div style={{width:"100%",display:"flex", justifyContent:"space-between", position:"absolute", color:"white"}}>
                  <div className="all_prod_screen"><FullscreenIcon /><div>{el.Screen_Size} inch</div></div>
                  <div className="all_prod_rating"><div>{el.rating}</div><StarIcon fontSize="small"/></div>
                </div>
                 <img src={el.image} alt="" />
                 <div className="Top_prod_descr">
                            <div>
                             <div>{el.Brand}  {el.Model} ( {el.Color}, {el.Internal_Storage})</div>
                             <ul style={{fontSize:'15px'}}>
                               <li>{el.Ram} RAM | {el.Internal_Storage} ROM</li>
                               <li>{el.Battery_Capacity} mAh Li-ion Bat.</li>
                               <li><div style={{display:"flex", marginTop:"-13px", alignItems:"center"}}><p style={{fontSize:"14px"}}> ₹ {el.total_price}</p> <p style={{color:"gray", fontSize:"14px", textDecoration:"line-through", marginLeft:"10px",marginRight:"10px"}}> ₹ {el.price}</p> <p style={{backgroundColor:"blue", padding:"0 8px", fontSize:"14px", borderRadius:"0 5px 5px 0"}}> {" "}{el.off}% off</p></div></li>
                             </ul>
                            </div>
                        </div>
               </div>
             </div>)}
           </div>
        </div>

        {/* <div className="mainproddiv" id="fashion">
          <div className="prodCat">
             <div>Fashion</div>
             <div>View All</div>
           </div>
           <div className="prod-div"></div>
        </div>
        <div className="mainproddiv" id="electronics">
          <div className="prodCat">
             <div>Electronics</div>
             <div >View All</div>
           </div>
           <div className="prod-div"></div>
        </div>
        <div className="mainproddiv" id="home">
          <div className="prodCat">
             <div>Home</div>
             <div>View All</div>
           </div>
           <div className="prod-div"></div>
        </div>
        <div className="mainproddiv" id="appliances">
          <div className="prodCat">
             <div>Appliances</div>
             <div>View All</div>
           </div>
           <div className="prod-div"></div>
        </div>
        <div className="mainproddiv" id='beauty'>
          <div className="prodCat">
             <div>Beauty, Toys & More</div>
             <div>View All</div>
           </div>
           <div className="prod-div"></div>
        </div> */}
      </div>
      <div>
        <Footer/>
      </div>
    </>
}