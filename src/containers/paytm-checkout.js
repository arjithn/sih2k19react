import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCustomerDetails, getPurchaseDetails} from '../selectors'


const mapStateToProps = (state, ownProps) => ({
  customerId: state.user.customerId,
  orderId: state.purchase.purchaseId,
  userDetails: getCustomerDetails(state),
  purchaseDetails: getPurchaseDetails(state),

})


class PaytmCheckout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checksum : ''
      }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }


  handleOnSubmit(event) {
    console.log(event);
    console.log(this.state);
  }

  handleChange(e){
     this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const {userDetails, orderId, purchaseDetails} = this.props
    const CALLBACK_URL= `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`

    return(
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
        <input type="hidden" name="CALLBACK_URL" value="http://159.89.167.148/PaytmKit/pgResponse.php"/>
        <button type="submit" value="Submit">Submit</button>
      </form>

    )
  }
}

export default connect(
  mapStateToProps,
  { },
)(PaytmCheckout)
