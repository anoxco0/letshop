import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import './Cart.css'
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
import { useNavigate } from "react-router-dom";
import { delete_cart, get_cart, patch_cart } from "../redux/cart/action";
import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteIcon from '@mui/icons-material/Delete';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   const {TotalItems,TotalPrice, TotalDiscount} = useSelector(store=>store.cart_red);
    const {CartItems} = useSelector(store=>store.cart_red);
  React.useEffect(()=>{
    dispatch(get_cart());
  },[])
    const { drawerStatus } = useSelector(store => store.home);
    const toggleDrawer = (status) => {
        dispatch(drawer(status));
    }
    const removeElement = (id) => {
        dispatch(delete_cart(id));
        dispatch(get_cart())
    }
    const editElement = (id, value) => {
        dispatch(patch_cart(id, value));
        dispatch(get_cart());
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
            {CartItems.length > 0 ? <div className="CartMain">
                <div className="leftCart">
                    <div style={{ padding: "15px 20px", borderBottom: "1px solid gray", fontSize: "20px", fontWeight: "600", color: "gray" }}>Items in Cart :- {TotalItems}</div>
                    {CartItems.map((el, i) => <div>
                        <div className="leftCartCard">
                            <div>
                                <div style={{ display: "flex", gap: "50px" }}>
                                    <div><img src={el.product.image} alt="" /></div>
                                    <div >
                                        <div style={{ fontSize: "18px", fontWeight: "500" }}>{el.product.Brand} {el.product.Model} ({el.product.Color}, {el.product.Internal_Storage})</div>
                                        <div style={{ fontSize: "16px", fontWeight: "400", color: "gray" }}>{el.product.Ram} RAM</div>
                                        <div style={{ color: "green", fontWeight: "600", margin: "5px 0" }}>Extra ₹{Intl.NumberFormat('en-IN').format(el.product.price - el.product.total_price)} off</div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div style={{ fontSize: "30px", fontWeight: "600" }}>₹{Intl.NumberFormat('en-IN').format(el.product.total_price)}</div>
                                            <div style={{ color: "gray", margin: "0px 15px", textDecoration: "line-through" }}>₹{Intl.NumberFormat('en-IN').format(el.product.price)}</div>
                                            <div style={{ color: 'green', fontWeight: "600" }}>{el.product.off}% off</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "18px", fontWeight: "400" }}>Delivery in 7 days</div>
                            </div>
                            <div style={{ borderBottom: "1px solid gray" }}>
                                <div style={{ display: "flex", gap: "15px" }}>
                                    <IconButton aria-label="delete" size="small" onClick={() => editElement(el.id, el.quantity+1)}>
                                        <AddIcon  fontSize="small" />
                                    </IconButton>
                                    <div><input style={{ padding: "5px 10px", width: "15px", outline: "none" }}  onChange={(e)=>{editElement(el.id, +e.target.value); e.target.value=""}} type="text" placeholder={el.quantity} name="" id="" /></div>
                                    <IconButton aria-label="delete" size="small" onClick={() => {el.quantity===1?removeElement(el.id):editElement(el.id, el.quantity-1)}}>
                                        <RemoveIcon  fontSize="small" />
                                    </IconButton>
                                </div>
                                <Button variant="outlined" onClick={() => removeElement(el.id)} startIcon={<DeleteIcon />}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>)}
                    <div style={{ padding: "20px", display: "flex", justifyContent: 'end' }}>
                        <Button variant="contained" color="success"  onClick={()=>navigate('/checkout')}>
                            <ShoppingCartCheckoutIcon /> Place {TotalItems} items
                        </Button>
                    </div>
                </div>
                <div className="RightCart">
                    <div style={{ padding: "15px 20px", borderBottom: "1px solid gray", fontSize: "20px", fontWeight: "600", color: "gray" }}>Price Details</div>
                    <div>
                        <div>
                            <div>Price({TotalItems} items)</div>
                            <div>₹{Intl.NumberFormat('en-IN').format(TotalPrice)}</div>
                        </div>
                        <div>
                            <div>Discount</div>
                            <div style={{ color: "green" }}>-₹{Intl.NumberFormat('en-IN').format(TotalDiscount)}</div>
                        </div>
                        <div>
                            <div>Delivery Charges</div>
                            <div style={{ color: "green" }}>Free</div>
                        </div>
                        <div style={{ borderTop: "1px dashed gray", borderBottom: "1px dashed gray", margin: "10px 0px", fontWeight: "600" }}>
                            <div>Total Amount</div>
                            <div>₹{Intl.NumberFormat('en-IN').format(TotalPrice-TotalDiscount)}</div>
                        </div>
                        <div style={{ color: "green", fontSize: "16px", fontWeight: "600" }}>You will save ₹{Intl.NumberFormat('en-IN').format(TotalDiscount)} on this order</div>
                    </div>
                </div>
            </div> : <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>your Cart is empty</h1>
            </div>}
            <div>
                <Footer />
            </div>
        </div>
    )
}