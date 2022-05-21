import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import logo from '../images/letshop.png'
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import { get_cart } from '../redux/cart/action';
import { Button } from '@mui/material';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { fontWeight } from '@mui/system';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SettingsPowerSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 15,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <ShoppingCartIcon fontSize="small" />,
        2: <HomeIcon fontSize="small" />,
        3: <PaymentIcon fontSize="small" />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Cart', 'Address', 'Payment'];

export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [swap, swapStatus] = React.useState(1);
    const [activePayment, setActivePayment] = React.useState(0);
    const payment_methods = ["Credit/Debit Card", "UPI", "GooglePay", "Net Banking", "Cash On Delivery", "Gift Card"];
    const [address, setAddress] = React.useState({
        "Country": "India",
        "Pincode": "",
        "Address_Line_1": "",
        "Address_Line_2": "",
        "City": "",
        "State": "",
        "Full_Name": "",
        "Phone_Number": "",
        "Email": ""
    });
    const { TotalItems, TotalPrice, TotalDiscount } = useSelector(store => store.cart_red);
    React.useEffect(() => {
        dispatch(get_cart());
    }, [])
    const handleChange = (event) => {
        const { id, value } = event.target
        setAddress({ ...address, [id]: value });
    };
    const showAlert=()=>{
        alert("your product placed successfully we will update your status");
        navigate('/')
    }
    return (
        <div>
            <div style={{ widht: '100%', top: 0, left: 0, right: 0, height: "100px", display: "flex", alignItems: "center", backgroundColor: "black", position: "fixed" }}>
                <img style={{ height: "50px", marginLeft: "40px" }} src={logo} alt="" />
                <Stack sx={{ width: '100%' }} spacing={4}>
                    <Stepper alternativeLabel activeStep={swap} connector={<ColorlibConnector />}>
                        {steps.map((label, i) => (
                            <Step key={label} onClick={()=>{if(i===0) navigate('/cart');swapStatus(i)}}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
            </div>

            {swap===1?<div style={{ marginTop: "90px", display: "flex", width: "96%", padding: "2%", gap: "2%" }}>
                <div style={{ backgroundColor: "white", padding: "2%", width: "40%" }}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="Country"
                        select
                        label="Country"
                        value="India"
                        onChange={handleChange}
                        helperText=" "
                        variant="filled"
                    >
                        <MenuItem value="India">
                            India
                        </MenuItem>
                    </TextField>

                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="Pincode"
                        label="Pincode"
                        variant="filled"
                        helperText=" "
                        onChange={(event) => handleChange(event)}
                    />
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="Address_Line_1"
                        label="Address Line 1"
                        variant="filled"
                        helperText=" "
                        onChange={(event) => handleChange(event)}
                    />
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="Address_Line_2"
                        label="Address Line 2"
                        variant="filled"
                        helperText=" "
                        onChange={(event) => handleChange(event)}
                    />
                    <div style={{ display: "flex", gap: "20px" }}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="City"
                            label="City"
                            helperText=" "
                            variant="filled"
                            onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value="India">
                                India
                            </MenuItem>
                        </TextField>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="State"
                            helperText=" "
                            variant="filled"
                            label="State"
                            onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value="India">
                                India
                            </MenuItem>
                        </TextField>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>Shippiping details will be sent to:</div>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="Full_Name"
                            label="Full Name"
                            helperText=" "
                            variant="filled"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="Phone_Number"
                            label="Phone Number"
                            variant="filled"
                            helperText=" "
                            onChange={(event) => handleChange(event)}
                        />
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="Email"
                            label="Email"
                            variant="filled"
                            helperText=" "
                            onChange={(event) => handleChange(event)}
                        />
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
                            <div>₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)}</div>
                        </div>
                        <div style={{ color: "green", fontSize: "16px", fontWeight: "600" }}>You will save ₹{Intl.NumberFormat('en-IN').format(TotalDiscount)} on this order</div>
                    </div>
                    <div style={{ width: "90%",display:"flex", justifyContent: "end", paddingBottom:"40px"}}>
                        <Button variant="contained" color="success" onClick={()=>swapStatus(2)}>
                            <StoreOutlinedIcon /> Proceed to buy
                        </Button>
                    </div>
                </div>
            </div>:""}
            {swap===2?<div style={{ width: "90%", margin: "auto", marginTop: "110px" }}>
                <div style={{ padding: "10px", backgroundColor: "white", marginBottom: "4px" }}>Choose Payment Method</div>
                <div className='payment-main'>
                    <div className='first_checkout' >{payment_methods.map((el, i) => <div style={{ borderBottom: i + 1 !== payment_methods.length ? "1px solid gray" : "", padding: "15px 0", fontWeight: activePayment === i ? "600" : "", borderRight: activePayment === i ? "3px solid black" : "0" }} onClick={() => setActivePayment(i)}>
                        {el}
                    </div>)}</div>
                    {activePayment === 0 ? <div className='middle_checkout' >
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>{payment_methods[0]}</div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            id="standard-helperText"
                            label="Card Number"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ padding: "15px 0" }}>
                            <div style={{ fontWeight: "500", color: "gray", fontSize: "16px" }}>expiry</div>
                            <div style={{ display: "flex" }}>
                                <div style={{ gap: "10px", display: "flex", width: "calc(60%-120px)", height: "40px" }}>
                                    <input type="phone" style={{ outline: "none", border: "transparent", borderBottom: "1px solid gray", width: "100%" }} maxLength={2} minLength={2} placeholder="MM" name="" id="" />/
                                    <input type="phone" style={{ outline: "none", border: "transparent", borderBottom: "1px solid gray", width: "100%" }} maxLength={2} minLength={2} placeholder="YY" name="" id="" />
                                    <input type="password" style={{ outline: "none", border: "transparent", borderBottom: "1px solid gray", width: "100%" }} maxLength={3} minLength={3} name="" id="" placeholder='CVV' />
                                    <img style={{ height: "20px" }} src="https://www.nykaafashion.com/assets/desktop/images/checkout/bank-card-back-side.png" alt="" />
                                </div>
                                <div style={{ width: "100px", marginLeft: "10px" }}>last 3 digits at the back of the card</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success">
                            Pay ₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)} Now <ChevronRightIcon />
                        </Button></div>
                    </div> : ""}
                    {activePayment===1?<div className='middle_checkout'>
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>BHIM UPI</div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            required
                            id="standard-helperText"
                            label="VPA/UPI ID (eg. 1234567890@upi)"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success">
                            Pay ₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)} Now <ChevronRightIcon />
                        </Button></div>
                    </div>:""}
                    {activePayment===2?<div className='middle_checkout'>
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>{payment_methods[2]}</div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            required
                            id="standard-helperText"
                            label="Enter Mobile Number/ Google Pay UPI ID"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success">
                            Send payment request <ChevronRightIcon />
                        </Button></div>
                    </div>:""}
                    {activePayment===3?<div className='middle_checkout'>
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>{payment_methods[3]}</div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            required
                            id="standard-helperText"
                            label="VPA/UPI ID (eg. 1234567890@upi)"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success">
                            Pay ₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)} Now <ChevronRightIcon />
                        </Button></div>
                    </div>:""}
                    {activePayment===4?<div className='middle_checkout'>
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>{payment_methods[4]}</div>
                        <div style={{ padding: "15px 0" }}> Kindly, pay the amount in cash at the time of delivery</div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success" onClick={()=>showAlert()}>
                            Pay ₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)} By Cash <ChevronRightIcon />
                        </Button></div>
                    </div>:""}
                    {activePayment===5?<div className='middle_checkout'>
                        <div style={{ padding: "5px 0 15px", borderBottom: "1px solid gray", fontWeight: "600" }}>Redeem Gift Card</div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            required
                            id="Gift Card Number"
                            label="Gift Card Number"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ padding: "15px 0" }}> <TextField
                            fullWidth
                            required
                            id="standard-helperText"
                            label="PIN"
                            helperText=""
                            variant="standard"
                        /></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}><Button variant="contained" color="success">
                            Submit
                        </Button></div>
                    </div>:""}

                    
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
                                <div>₹{Intl.NumberFormat('en-IN').format(TotalPrice - TotalDiscount)}</div>
                            </div>
                            <div style={{ color: "green", fontSize: "16px", fontWeight: "600" }}>You will save ₹{Intl.NumberFormat('en-IN').format(TotalDiscount)} on this order</div>
                        </div>
                    </div>
                </div>
            </div>:""}
        </div>
    );
}
