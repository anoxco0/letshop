
import './footer.css'
export const Footer = ()=>{
   
    return (
        <>
          <div id='footer' style={{margin:'10px', borderTop:'0.1px solid gray'}}>
             <div id='leftFooter'>
                <div id="about" >
                    <div>About</div>
                    <div>Contact Us</div>
                    <div>About Us</div>
                    <div>Wholesale</div>
                    <div>Become a Seller</div>
                </div>
                <div id="help" >
                    <div>Help</div>
                    <div>Payment</div>
                    <div>Shipping</div>
                    <div>Cancellation & Return</div>
                </div>
                <div id="policy" >
                    <div>Policy</div>
                    <div>Return Policy</div>
                    <div>Terms Of Use</div>
                </div>
             </div>
          </div>
        </>
    )
}