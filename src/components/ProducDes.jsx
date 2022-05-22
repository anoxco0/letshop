import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import './productDes.css'
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
import { drawer } from "../redux/Home/action";
import { useNavigate, useParams } from "react-router-dom";
import {get_Product_details } from "../redux/Products/action";
import ReactImageMagnify from 'react-image-magnify';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { get_cart, patch_cart, post_cart } from "../redux/cart/action";

export const ProductDes = () => {
  const [images, setImages] = React.useState(0);
  const { model_name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {CartItems} = useSelector(store=>store.cart_red);
  React.useEffect(()=>{
    dispatch(get_cart());
  },[])
  React.useEffect(() => {
    dispatch(get_Product_details(model_name));
  }, []);
  const { drawerStatus } = useSelector(store => store.home);
  const { oneProduct, ProductQuantity } = useSelector(store => store.products_red);
  const addToCart = (oneProduct)=>{
    let flag = false;
    CartItems.map(el=>{
      if(oneProduct.id===el.product.id) 
      {flag = true; dispatch(patch_cart(el.id, el.quantity+1))}
    })
    if(flag === false)dispatch(post_cart(oneProduct));
    dispatch(get_cart());
    navigate('/cart')
  }
  const toggleDrawer = (status) => {
    dispatch(drawer(status));
  }
  const listItem = [
    { text: 'All Categories', icon: GridViewIcon }
  ]
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {listItem.map((ele, index) => (
          <ListItem key={ele.text} onClick={() => navigate('/categories')} disablePadding>
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
  return (
    <div>
      <div style={{ position: "fixed", width: '100%', top: 0, zIndex: 2 }}>
        <Navbar />
      </div>
      <div>
        <Drawer
          anchor='left'
          open={drawerStatus}
          onClose={() => toggleDrawer(false)}
        >
          {list('left')}
        </Drawer>
      </div >
      {oneProduct.other_images ? <div className="soloProductDetail">
        <div className="leftimages">
          <div className="leftLeftimage">
            {oneProduct.other_images.map((el, i) =>
              <div className="leftimage" style={{ border: i === images ? "2px solid blue" : "" }} onMouseOver={() => setImages(i)} ><img src={el} alt="" /></div>)}
          </div>
          <div className="rightimage">
            <ReactImageMagnify  {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: oneProduct.other_images[images],
              },
              largeImage: {
                src: oneProduct.other_images[images],
                width: 400,
                height: 600,
              },
              shouldUsePositiveSpaceLens: true,
            }} />
          </div>
        </div>
        <div className="rightDiv">
          <div style={{ fontSize: "25px", fontWeight: "600" }}>{oneProduct.Brand} {oneProduct.Model ? oneProduct.Model : ""} ({oneProduct.Color}, {oneProduct.Internal_Storage ? oneProduct.Internal_Storage : ""})</div>
          <button style={{ backgroundColor: "green", border: 'none', color: "white", borderRadius: "4px", padding: "2px 5px" }}>{oneProduct.rating}<StarIcon fontSize="" /></button>
          <div style={{ color: "green", fontWeight: "600", margin: "5px 0" }}>Extra ₹{Intl.NumberFormat('en-IN').format(oneProduct.price - oneProduct.total_price)} off</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ fontSize: "30px", fontWeight: "600" }}>₹{Intl.NumberFormat('en-IN').format(oneProduct.total_price)}</div>
            <div style={{ color: "gray", margin: "0px 15px", textDecoration: "line-through" }}>₹{Intl.NumberFormat('en-IN').format(oneProduct.price)}</div>
            <div style={{ color: 'green', fontWeight: "600" }}>{oneProduct.off}% off</div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ fontWeight: "600", color: "gray" }}>Highlights</div>
            <div>
              <ul style={{ color: "gray" }}>
                <li>{oneProduct.Internal_Storage} ROM</li>
                <li>{oneProduct.Screen_Size} inch {oneProduct.Resolution_Type.split("Plus").join("+").split("_").join(" ")} Display</li>
                <li>{oneProduct.Primary_Camera} MP | {oneProduct.Secondary_Camera} MP Secondary Camera</li>
                <li>{oneProduct.Processor_Brand} Processor</li>
              </ul>
            </div>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Button variant="contained" color="success" onClick={() =>addToCart(oneProduct)}>
              <AddShoppingCartIcon />
              Add {ProductQuantity} {ProductQuantity < 2 ? "item" : "items"} To Cart
            </Button>
          </div>
          <div style={{ width: "90%", border: "1px solid rgba(128, 128, 128, 0.308)", marginTop: "40px" }}>
            <div style={{ padding: "15px", fontSize: "20px", fontWeight: "500", borderBottom: "1px solid rgba(128, 128, 128, 0.308)" }}>Product Specifications</div>
            <div style={{ padding: "10px 2%", width: "96%", borderBottom: "1px solid rgba(128, 128, 128, 0.308)" }}>
              <div style={{ fontSize: "18px", fontWeight: "500", paddingBottom: "10px" }}> Features</div>
              <table style={{ width: "60%", color: "gray" }}>
                <tbody>
                  <tr>
                    <td>Display Size</td>
                    <td>{oneProduct.Screen_Size} inch</td>
                  </tr>
                  <tr>
                    <td>Resolution Type</td>
                    <td>{oneProduct.Resolution_Type.split("Plus").join("+").split("_").join(" ")} Display</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div style={{ padding: "10px 2%", width: "96%", borderBottom: "1px solid rgba(128, 128, 128, 0.308)" }}>
                <div style={{ fontSize: "18px", fontWeight: "500", paddingBottom: "10px" }}> Os & Processor Features</div>
                <table style={{ width: "60%", color: "gray" }}>
                  <tbody>
                    <tr>
                      <td>Operating System</td>
                      <td>{oneProduct.Operating_System}</td>
                    </tr>
                    <tr>
                      <td>Processor Core</td>
                      <td>{oneProduct.Number_Of_Cores.split("_").join(" ")}</td>
                    </tr>
                    <tr>
                      <td>Processor Brand</td>
                      <td>{oneProduct.Processor_Brand}</td>
                    </tr>
                    <tr>
                      <td>Clock Speed</td>
                      <td>{oneProduct.Clock_Speed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "10px 2%", width: "96%", borderBottom: "1px solid rgba(128, 128, 128, 0.308)" }}>
                <div style={{ fontSize: "18px", fontWeight: "500", paddingBottom: "10px" }}>Memory & Storage Features</div>
                <table style={{ width: "60%", color: "gray" }}>
                  <tbody>
                    <tr>
                      <td>RAM</td>
                      <td>{oneProduct.Ram}</td>
                    </tr>
                    <tr>
                      <td>Internal Storage</td>
                      <td>{oneProduct.Internal_Storage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "10px 2%", width: "96%", borderBottom: "1px solid rgba(128, 128, 128, 0.308)" }}>
                <div style={{ fontSize: "18px", fontWeight: "500", paddingBottom: "10px" }}>Camera Features</div>
                <table style={{ width: "60%", color: "gray" }}>
                  <tbody>
                    <tr>
                      <td>Primary Camera Available</td>
                      <td>{oneProduct.Primary_Camera ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Primary Camera</td>
                      <td>{oneProduct.Primary_Camera} MP</td>
                    </tr>
                    <tr>
                      <td>Secondary Camera Available</td>
                      <td>{oneProduct.Secondary_Camera ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Primary Camera</td>
                      <td>{oneProduct.Secondary_Camera} MP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> : ""}
      <div>
        <Footer />
      </div>
    </div>
  )
}