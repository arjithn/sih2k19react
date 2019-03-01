import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  checkoutCart,
  setBillPaymentId,
 } from '../actions'


import {
  getCartItemsListByRest,
  getCartSummary,
  getPurchaseCouponDetails,
  getItemCount,
  getLoggedInStatus,
  getCustomerDetails,
  getPurchaseDetails} from '../selectors'

  import {Link} from 'react-router-dom'



  const mapStateToProps = (state, ownProps) => ({
    cart: state.cart.byId,
    cartItemsList: getCartItemsListByRest(state),
    cartBillDetails: getCartSummary(state),
    cartItemCount: getItemCount(state),
    isLoggedIn: getLoggedInStatus(state),
    customerId: state.user.customerId,
    orderId: state.purchase.purchaseId,
    userDetails: getCustomerDetails(state),
    purchaseDetails: getPurchaseDetails(state),
  })

class CheckoutInvoice extends Component{

  render(){

    const {cartBillDetails, userDetails, orderId, purchaseDetails, checkoutCart} = this.props
    const subtotal = cartBillDetails.calculatedPurchaseTotal - cartBillDetails.totalTaxAmount
    const discount = cartBillDetails.calculatedPurchaseTotal - cartBillDetails.totalDiscountedOrderAmount
    const callBackUrl = `${process.env.RN_LASSI_API_BASE_URL}purchase/handle-paytm-call-back-url`
    return(
      <div
      style={{
        width: '40%',
        margin: '5%',
        marginTop: '1%',
        float: 'right',
        clear: 'right'
      }}>
        <div className="invoice-container"
          style={{
            backgroundColor: 'rgba(252, 252, 252, 1)',
            border: 'solid',
            borderWidth: '0.5px',
            borderColor: 'rgba(199, 199, 199, 1)',
            boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            float: 'right',
            width: '100%',
          }}>
            <div className="invoice-left" style={{
              color: 'rgba(30, 175, 130, 1)',
              fontWeight: 'bold',
              borderBottom: '0.5px solid rgba(179, 179, 179, 1)',
              fontSize: '25px',
              width: '90%',
              marginLeft: '2%',
              marginBottom: '2%',
            }}>Invoice</div>
            <div className="invoice-left-subinvoice" style={{
              fontSize: '20px',
              color: 'rgba(102, 102, 102, 1)',
              marginLeft: '2%',
            }}>Sub Total</div>
            <span className="invoice-right-subinvoice" style={{
              fontSize: '20px',
              color: 'rgba(102, 102, 102, 1)',
              marginRight: '2%'
            }}>{"₹ "+subtotal.toFixed(2)}</span>
            <div className="invoice-left-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginLeft: '2%',
            }}>Tax</div>
            <span className="invoice-right-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginRight: '2%',
            }}>{"₹ "+cartBillDetails.totalTaxAmount}</span>
            <div className="invoice-left-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginLeft: '2%',
            }}>Discount % Offers</div>
            <span className="invoice-right-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginRight: '2%',
            }}>{"₹ "+discount.toFixed(2)}</span>
            <div className="invoice-left-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(30, 175, 130, 1)',
              marginLeft: '2%',
            }}>Parcel Charges</div>
            <span className="invoice-right-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(30, 175, 130, 1)',
              marginRight: '2%',
            }}>{"₹ "+cartBillDetails.totalParcelCharge}</span>
            <div className="invoice-left-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginLeft: '2%',
            }}>Delivery Charges</div>
            <span className="invoice-right-subinvoice" style={{
              fontSize: '17px',
              color: 'rgba(128, 128, 128, 1)',
              marginRight: '2%',
            }}>{"₹ "+cartBillDetails.totalDeliveryCharge}</span>
            <div className="invoice-left-subinvoice-checkout" style={{
              fontSize: '25px',
              color: 'rgba(30, 175, 130, 1)',
              marginLeft: '2%',
              marginTop: '3%'
            }}>Total Amount</div>
            <span className="invoice-right-subinvoice-checkout" style={{
              fontSize: '25px',
              color: 'rgba(30, 175, 130, 1)',
              marginRight: '2%',
              marginTop: '3%'
            }}>{"₹ "+cartBillDetails.totalOrderAmount}</span>
          </div>
            <form method="post" action="http://159.89.167.148/PaytmKit/pgRedirect.php" >
              <input type="hidden" name="MID" value="Sigara35843006059908"/>
              <input type="hidden" name="WEBSITE" value="WEBSTAGING"/>
              <input type="hidden" name="ORDER_ID" value={orderId}/>
              <input type="hidden" name="CUST_ID" value={userDetails.customerId}/>
              <input type="hidden" name="MOBILE_NO" value='918825955647'/>
              <input type="hidden" name="EMAIL" value={userDetails.email}/>
              <input type="hidden" name="INDUSTRY_TYPE_ID" value="Retail"/>
              <input type="hidden" name="CHANNEL_ID" value="WEB"/>
              <input type="hidden" name="TXN_AMOUNT" value={purchaseDetails.calculatedPurchaseTotal}/>
              <input type="hidden" name="CALLBACK_URL" value={callBackUrl}/>
              <button type="submit"
               value="Submit"
               style={{
                 marginTop: '5%',
                 backgroundColor: '#1EAF82',
                 border: '0 solid',
                 borderRadius: '30px',
                 fontSize: '20px',
                 color: '#ffffff',
                 fontWeight: 'bold',
                 width: '50%',
                 marginLeft: '25%',
                 padding: '10px',
               }} onClick={checkoutCart}>PROCEED TO PAY</button>
            </form>
        </div>
    )
  }
}

export default connect(mapStateToProps, {checkoutCart, setBillPaymentId})(CheckoutInvoice)
