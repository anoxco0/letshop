import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import './home.css'
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
import './categories.css'

export const Categories = ()=>{
    const cate = [
        // {text:'Grocery',img:'https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png',
        // categories:[
        //     {type:'Staples'},
        //     {type:'Snacks'},
        //     {type:'Packaged Food'},
        //     {type:'Baby Care'},
        //     {type:"Household Care"},
        //     {type:"Dairy"},
        //     {type:"Kitchen"}
        // ]
        // },
        {text:'mobile',img:'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png',
        categories:[
            {type:'Smartphones'},
            {type:'Cases & Covers'},
            {type:'Chargers'},
            {type:'Accesories'}
        ]
        },
        // {text:'Fashion',img:'https://rukminim2.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png',
        // categories:[
        //     {type:"Men"},
        //     {type:"Women"},
        //     {type:"kids"},
        //     {type:"accessories"}
        //     // {type:"Men's Top Wear", array:['All',"Men's T-Shirts", "men's Casual Shirts", "Men's Formal Shirts", "Men's Kurtas", "Men's Ethnic Sets","Men's Blazers", "Men's Raincoat", "Men's Windcheaters", "Men's Suit", "Men's Fabrics"]},
        //     // {type:"Men's Bottom Wear", array:["All", "Men's Jeans", "Men's Trousers", "Men's Trackpants", "Men's Shorts", "Men's Cargos", "Men's Threefourths","Men's Pyjamas & Loungepants", "Men's Dhoti", "Men's Ethnic Pyjama"]},
        //     // {type:"Men Footwear", array:["All", "Men's Shorts Shoes", "Men's Casual Shoes", "Men's Sandals & Floaters", "Men's Slippers & Flip Flop","Men's Formal Shoes", "Men's Ethnic Shoes", "Active Footwear", "Combo Footwear", "Shoe Care"]},
        //     // {type:'Women Ethnic',array:["All","Women Sarees","Women Kurtas & Kurtis", "Women Kurta Sets & Salwar Suits", "Ethnic Dresses", "Women Dress Materials", "Women Gowns","Women Lehenga Cholis","Women Leggings & Patialas","Women Palazzos & Sharars", "Women Blowse", "Women Dupatta"]},
        //     // {type:"Women Western", array:["All", "Women Tops","Women Dresses","Women T-shirts & Polo T-Shirts", "Women Jeans", "Women Nighties & Night Dresses", "Women Nightsuit","Women Track Pants","Women Trouser", "Women Jumpsuit", "Women Shapewear", "Women Sports Bra"]},
        //     // {type:"Women Footwear", array:["All", "Women Flats", "Women Heels", "Women Wedges", "Women Slipper Flip Flops", "Women Casual Shoes", "Women Sports Shoes", "Women Ballerinas","Women Ethnic Shoes", "Women Sneakers", "Women Walking Shoes", "Women Boots",]},
        //     // {type:"Watches and accessories", array:["Men & Women Watches", "Men & Women Sunglasses","Wallets","Men & Women Belts","Women Fashion Jewellery","Men Fashion Jewllery", "Precious Jewellery", "Precious Coins & Bars","Precious Articles","Frames & Contact Lenses","Kids Accesories"]},
        //     // {type:"Bags, Suitcases & Luggage", array:["All", "Backpacks", "Suitcase & Trolleys", "Dufflebags","Rucksacks", "Handbags","Slinbags","Women's Clutches & Wallets","Messenger Bags", "Travel Accesories"]},
        //     // {type:'Kids',array:["All", "Girls Dresses", "Boys & Girls Tshirts", "Boys & Girls Combosets","Boys & Girls Ethnic Wear", "Boys & Girls Jeans","Boys & Girls Shorts", "Boys & Girls Trackpants","Boys & Girls Innerwear","Infant Wear", "Kids Sipper Flip Flops", "Kids Sports Shoes"] },
        //     // {type:"Essentials", array:["Men's Briefs & Trunks", "Men's Vests", "Men's Boxers", "Women Lingrie Sets", "Women B"]},
        // ]
        //  },
        // {text:'Electronics',img:'https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png',
        // categories:[
        //     {type:'Camera'},
        //     {type:'Laptop'},
        //     {type:'Storage'},
        //     {type:'Accessories'}
        // ]
        // },
        // {text:'Home',img:'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg',
        // categories:[
        //     {type:'Furniture'},
        //     {type:'Furnishing'},
        //     {type:'Home Decor'},
        //     {type:'Kitchen'}
        // ]},
        // {text:'Appliances',img:'https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png',
        // categories:[
        //     {type:'Television'},
        //     {type:'Washing Mashine'},
        //     {type:'Refrigerators'},
        //     {type:'Air Conditioners'}
        // ]
        // },
        // {text:'Beauty, Toys & More',img:'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png',
        // categories:[
        //     {type:'School Supplies'},
        //     {type:'Baby Care'},
        //     {type:"Toys's"},
        //     {type:'Character Shoes'}
        // ]
        // },
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {drawerStatus}= useSelector(store=>store.home);
  const toggleDrawer=(status)=>{
     dispatch(drawer(status));
  }
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

  const jumpOnProduct = (product)=>{
     navigate(`/products/${product}`)
  }
  const jumpOnProducts = (product, cate)=>{
    navigate(`/products/${product}?Type=${cate}`)
 }
    return (
        <>
        <div  style={{position:"fixed", width:'100%', top:0, zIndex:2}}>
            <Navbar/>
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
         <div id="cate" style={{marginTop:'100px'}}>
             {cate.map((ele)=><>
                <div>
                    <div id="imgCat" onClick={()=>jumpOnProduct(ele.text)}>
                        <img src={ele.img} alt="" />
                        <h2>{ele.text}</h2>
                    </div>
                    <div id="catecat">
                       {ele.categories.map((e=><>
                         <div onClick={()=>jumpOnProducts(ele.text,e.type)}>{e.type}</div>
                       </>))}
                    </div>
                </div>
            </>)}
         </div>
         <div>
             <Footer/>
         </div>
        </>
    )
}