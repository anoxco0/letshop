import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import './product.css'
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
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useDispatch, useSelector } from "react-redux";
import { drawer } from "../redux/Home/action";
import { useNavigate, useParams } from "react-router-dom";
import { Brand, get_filter, Rating, Ram, InternalStorage, BateryCapacity, ScreenSize, PrimaryCamera, SecondaryCamera, ProcessorBrand, Speciality, ResolutionType, OperatingSystem, NetworkType, SimType, Budget, Features, Type, NumberOfCores, OperatingSystemVersionName, ClockSpeed, get_All_Product} from "../redux/Products/action";
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const Product = ()=>{
  const [Filter, setFilter] = React.useState([]);
  const [sort, setSort] = React.useState("")
  const pro = Filter.join('&');
  const {brand,rating,ram,internalStorage,batteryCapacity,screenSize,primaryCamera,secondaryCamera,processorBrand,speciality,resolutionType,operatingSystem,networkType,simType,budget,features,type,numberOfCores,operatingSystemVersionName,clockSpeed} = useSelector(store=>store.products_red);
  const {product_name} = useParams();
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(()=>{
      dispatch(get_filter(product_name));
      dispatch(get_All_Product(product_name,pro, sort));
    },[pro, sort]);
    const {AllProduct,filter_temp} = useSelector(store=>store.products_red);
    const {drawerStatus}= useSelector(store=>store.home);
    const toggleDrawer=(status, data)=>{
    dispatch(drawer(status));
  }
  const filter_product = (e, value)=>{
    if(e==='sort'){
      setSort(value.target.value)
    }
    else if(e.target.checked) setFilter([...Filter,value]);
    else setFilter(Filter.filter((el)=>{
      if(el!==value) 
      return el;
    }));
  }
  const jumpOnProductDetail=(data)=>{
    if(product_name==='mobile') navigate(`/product/${product_name}-${data.Brand}-${data.Model}`)
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
    return (<>
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
        <div id="products">
            <div id="filter">
              <div className="filterText" style={{fontSize:'20px', fontWeight:'600', padding:'10px 20px', borderBottom:'0.1px solid gray'}}>Filters</div>
              <div className="filterScroll">
              {filter_temp.gender?<>
                  <div>
                    <div className="filterHead">Gender</div> 
                    <KeyboardArrowDownOutlinedIcon/>
                  </div>
                  <div className="botBord">{filter_temp.gender.map((el)=><div className="filterBot">
                    <Checkbox {...label} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Brand?<>
                  <div className="divtrans" onClick={()=>dispatch(Brand(!brand))}>
                    <div className="filterHead">Brand</div> 
                    {brand?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:brand?"block":"none"}} className="botBord">{filter_temp.Brand.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Brand=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.rating?<>
                  <div className="divtrans" onClick={()=>dispatch(Rating(!rating))}>
                    <div className="filterHead">Rating</div> 
                    {rating?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                 <div style={{display:rating?"block":"none"}} className="botBord">{filter_temp.rating.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`rating_gte=${el}`)} />
                    <div className="filter">{el} & Above</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Ram?<>
                  <div className="divtrans" onClick={()=>dispatch(Ram(!ram))}>
                    <div className="filterHead">Ram</div> 
                    {ram?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:ram?"block":"none"}} className="botBord">{filter_temp.Ram.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Ram=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}

                {filter_temp.Internal_Storage?<>
                  <div className="divtrans" onClick={()=>dispatch(InternalStorage(!internalStorage))}>
                    <div className="filterHead">Internal Storage</div> 
                    {internalStorage?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:internalStorage?"block":"none"}} className="botBord">{filter_temp.Internal_Storage.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Internal_Storage=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}

                {filter_temp.Battery_Capacity?<>
                  <div className="divtrans" onClick={()=>dispatch(BateryCapacity(!batteryCapacity))}>
                    <div className="filterHead">Batery Capacity</div> 
                    {batteryCapacity?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:batteryCapacity?"block":"none"}} className="botBord">{filter_temp.Battery_Capacity.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Less') filter_product(e,`Battery_Capacity_lte=1000`)
                      else if(el[1]==='Above') filter_product(e,`Battery_Capacity_gte=6000`)
                      else filter_product(e,`Battery_Capacity_gte=${el[0]}&Battery_Capacity_lte=${el[1]}`)
                    }} />
                    <div className="filter">{el[0]} - {el[1]} mAh</div>
                  </div>)}</div>
                </>:""}
                
                {filter_temp.Screen_Size?<>
                  <div className="divtrans" onClick={()=>dispatch(ScreenSize(!screenSize))}>
                    <div className="filterHead">Screen Size</div> 
                    {screenSize?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                 <div style={{display:screenSize?"block":"none"}} className="botBord">{filter_temp.Screen_Size.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Less') filter_product(e,`Screen_Size_lte=${el[1]}`)
                      else if(e[1]==='Above') filter_product(e,`Screen_Size_gte=${el[0]}`)
                      else filter_product(e,`Screen_Size_gte=${el[0]}&Screen_Size_lte=${el[1]}`)
                    }}  />
                    <div className="filter">{el[0]} - {el[1]} {el[1]!=='Above'?'inch':""}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Primary_Camera?<>
                  <div className="divtrans" onClick={()=>dispatch(PrimaryCamera(!primaryCamera))}>
                    <div className="filterHead">Primary Camera</div> 
                    {primaryCamera?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:primaryCamera?"block":"none"}} className="botBord">{filter_temp.Primary_Camera.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Less') filter_product(e,`Primary_Camera_lte=${el[1]}`)
                      else if(e[1]==='Above') filter_product(e,`Primary_Camera_gte=${el[0]}`)
                      else filter_product(e,`Primary_Camera_gte=${el[0]}&Primary_Camera_lte=${el[1]}`)
                    }} />
                    <div className="filter">{el[0]} - {el[1]} {el[1]!=='Above'?'MP':""}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Secondary_Camera?<>
                  <div className="divtrans" onClick={()=>dispatch(SecondaryCamera(!secondaryCamera))}>
                    <div className="filterHead">Secondary Camera</div> 
                    {secondaryCamera?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:secondaryCamera?"block":"none"}} className="botBord">{filter_temp.Secondary_Camera.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Less') filter_product(e,`Secondary_Camera_lte=${el[1]}`)
                      else if(e[1]==='Above') filter_product(e,`Secondary_Camera_gte=${el[0]}`)
                      else filter_product(e,`Secondary_Camera_gte=${el[0]}&Secondary_Camera_lte=${el[1]}`)
                    }} />
                    <div className="filter">{el[0]} - {el[1]} {el[1]!=='Above'?'MP':""}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Processor_Brand?<>
                  <div className="divtrans" onClick={()=>dispatch(ProcessorBrand(!processorBrand))}>
                    <div className="filterHead">Processor Brand</div> 
                    {processorBrand?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:processorBrand?"block":"none"}} className="botBord">{filter_temp.Processor_Brand.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Processor_Brand=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Speciality?<>
                  <div className="divtrans" onClick={()=>dispatch(Speciality(!speciality))}>
                    <div className="filterHead">Speciality</div> 
                    {speciality?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                 <div style={{display:speciality?"block":"none"}} className="botBord">{filter_temp.Speciality.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Speciality${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Resolution_Type?<>
                  <div className="divtrans" onClick={()=>dispatch(ResolutionType(!resolutionType))}>
                    <div className="filterHead">Resolution Type</div> 
                    {resolutionType?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:resolutionType?"block":"none"}} className="botBord">{filter_temp.Resolution_Type.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Resolution_Type=${el}`)} />
                    <div className="filter">{el.split('Plus').join('+').split('_').join(' ')}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Operating_System?<>
                  <div className="divtrans" onClick={()=>dispatch(OperatingSystem(!operatingSystem))}>
                    <div className="filterHead">Operating System</div> 
                    {operatingSystem?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:operatingSystem?"block":"none"}} className="botBord">{filter_temp.Operating_System.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Operating_System=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Network_Type?<>
                  <div className="divtrans" onClick={()=>dispatch(NetworkType(!networkType))}>
                    <div className="filterHead">Network Type</div> 
                    {networkType?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                <div style={{display:networkType?"block":"none"}} className="botBord">{filter_temp.Network_Type.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,'Network_type',el)} />
                    <div className="filter">{el.split('_').join(' ')}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Sim_Type?<>
                  <div className="divtrans" onClick={()=>dispatch(SimType(!simType))}>
                    <div className="filterHead">Sim Type</div> 
                    {simType?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:simType?"block":"none"}} className="botBord">{filter_temp.Sim_Type.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,'Sim_Type',el)} />
                    <div className="filter">{el.split('plus').join(' + ').split('_').join(' ')}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Budget?<>
                  <div className="divtrans" onClick={()=>dispatch(Budget(!budget))}>
                    <div className="filterHead">Budget</div> 
                    {budget?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                 <div style={{display:budget?"block":"none"}} className="botBord">{filter_temp.Budget.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Less') filter_product(e,`total_price_lte=${el[1]}`)
                      else if(e[1]==='Above') filter_product(e,`total_price_gte=${el[0]}`)
                      else filter_product(e,`total_price_gte=${el[0]}&total_price_lte=${el[1]}`)
                    }} />
                    <div className="filter">{el[0]!=='Less'?'Rs.':""} {el[0]} to {el[1]!=='Above'?'Rs.':""} {el[1]} </div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Features?<>
                  <div className="divtrans" onClick={()=>dispatch(Features(!features))}>
                    <div className="filterHead">Features</div> 
                    {features?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:features?"block":"none"}} className="botBord">{filter_temp.Features.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,'Features',el)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Type?<>
                  <div className="divtrans" onClick={()=>dispatch(Type(!type))}>
                    <div className="filterHead">Type</div> 
                    {type?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:type?"block":"none"}} className="botBord">{filter_temp.Type.map((el)=><div className="filterBot">
                   <Checkbox {...label} onChange={(e)=>filter_product(e,`Type=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Number_Of_Cores?<>
                  <div className="divtrans" onClick={()=>dispatch(NumberOfCores(!numberOfCores))}>
                    <div className="filterHead">Number Of Cores</div> 
                    {numberOfCores?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                 <div style={{display:numberOfCores?"block":"none"}} className="botBord">{filter_temp.Number_Of_Cores.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Number_Of_Cores=${el}`)} />
                    <div className="filter">{el.split('_').join(' ')}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Operating_System_Version_Name?<>
                  <div className="divtrans" onClick={()=>dispatch(OperatingSystemVersionName(!operatingSystemVersionName))}>
                    <div className="filterHead">Operating System Version Name</div> 
                    {operatingSystemVersionName?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:operatingSystemVersionName?"block":"none"}} className="botBord">{filter_temp.Operating_System_Version_Name.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>filter_product(e,`Operating_System_Version_Name=${el}`)} />
                    <div className="filter">{el}</div>
                  </div>)}</div>
                </>:""}
                {filter_temp.Clock_Speed?<>
                  <div className="divtrans" onClick={()=>dispatch(ClockSpeed(!clockSpeed))}>
                    <div className="filterHead">Clock Speed</div> 
                    {clockSpeed?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>}
                  </div>
                  <div style={{display:clockSpeed?"block":"none"}} className="botBord">{filter_temp.Clock_Speed.map((el)=><div className="filterBot">
                    <Checkbox {...label} onChange={(e)=>{
                      if(el[0]==='Below') filter_product(e,`Clock_Speed_lte=${el[1]}`)
                      else if(e[1]==='Above') filter_product(e,`Clock_Speed_gte=${el[0]}`)
                      else filter_product(e,`Clock_Speed_gte=${el[0]}&Clock_Speed_lte=${el[1]}`)
                    }} />
                    <div className="filter">{el[0]} - {el[1]} {el[1]!=='Above'?'GHz':""}</div>
                  </div>)}</div>
                </>:""}
              </div>
            </div>
            <div className="rightProduct">
              <div style={{fontSize:'20px', fontWeight:'600', padding:'10px 20px', borderBottom:'0.1px solid gray'}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>{product_name}</div>
                  <div style={{display:"flex", fontSize:"12px", color:"white",height:"50px"}} >{Filter.map(el=><p style={{backgroundColor:"gray", padding:'5px', marginRight:"5px", borderRadius:'5px'}}>{el.split("=")[1]}</p>)}</div>
                </div>
                <div style={{display:"flex", gap:"40px", fontSize:"15px", marginTop:"-10px"}}>
                <div style={{marginTop:"10px"}}><FormLabel id="demo-row-radio-buttons-group-label">Sort by</FormLabel></div>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e)=>filter_product('sort', e)}
                >
                  <FormControlLabel value="asc" control={<Radio />} label="Price -- Low to High" />
                  <FormControlLabel value="desc" control={<Radio />} label="Price -- High to Low" />
                </RadioGroup>
                </div>
              </div>
              <div className="prod_main">
                <div className="AllProduct_main">
                    {AllProduct.map((el)=><div key={el.model} className="AllProduct_">
                      <div className="AllProduct" onClick={()=>jumpOnProductDetail(el)}>
                        <div style={{width:"100%",display:"flex", justifyContent:"space-between", position:"absolute"}}>
                          <div className="all_prod_screen"><FullscreenIcon /><div>{el.Screen_Size} inch</div></div>
                          <div className="all_prod_rating"><div>{el.rating}</div><StarIcon fontSize="small"/></div>
                        </div>
                        <img src={el.image} alt="" />
                        <div className="prod_descr">
                            <div>
                             {product_name==='mobile'?<div>{el.Brand}  {el.Model} ( {el.Color}, {el.Internal_Storage})</div>:""}
                             <ul style={{fontSize:'15px'}}>
                               {product_name==="mobile"?<li>{el.Ram} RAM | {el.Internal_Storage} ROM</li>:""}
                               {product_name==="mobile"?<li>{el.Battery_Capacity} mAh Li-ion Bat.</li>:""}
                               <li><div style={{display:"flex", marginTop:"-13px", alignItems:"center"}}><p style={{fontSize:"14px"}}> ₹ {Intl.NumberFormat('en-IN').format(el.total_price)}</p> <p style={{color:"gray", fontSize:"14px", textDecoration:"line-through", marginLeft:"10px",marginRight:"10px"}}> ₹ {Intl.NumberFormat('en-IN').format(el.price)}</p> <p style={{backgroundColor:"blue", padding:"0 8px", fontSize:"14px", borderRadius:"0 5px 5px 0"}}> {" "}{el.off}% off</p></div></li>
                             </ul>
                            </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
        </div>
       <div>
           <Footer/>
       </div>
    </>)
}