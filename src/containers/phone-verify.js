import React, { Component } from 'react'
import { connect } from 'react-redux'
import { lassiAPIClient as api } from '../services'
import { updatePhoneDetails } from '../actions'
import { getCustomerPhone } from '../selectors'
import Countdown from 'react-countdown-now';
import LassiContainer from '../components/lassi-container'
import { Link }  from 'react-router-dom'


const mapStateToProps = (state, ownProps) => ({
  customerId: state.user.customerId,
  navigation: ownProps.navigation,
  isPhoneVerified: getCustomerPhone,
})

class PhoneVerify extends Component {
  state = {
    enterCode: false,
    spinner: false,
    number: '',
    showRetry: false,
    country: {
      cca2: 'IN',
      callingCode: '91',
    },
  }

  _onChangeText = (event) => {
    this.setState({ number: event.target.value })
  }

  _tryAgain = () => {
    this.setState({ enterCode: false })
  }

  _getSubmitAction = (event) => {
    event.preventDefault()
  }


  render(){
    const { enterCode, spinner, number, country } = this.state
    const { isPhoneVerified, navigation } = this.state
    const headerText = `What's your ${enterCode ? 'verification code' : 'phone number'}?`
    const buttonText = enterCode ? 'Verify confirmation code' : 'Send confirmation code'


    return (
      <div className="user-login-container">
        <LassiContainer />
        <div className="user-login-content">
          <div className="user-profile-headerText">User Account</div>
          <div className="mobile-verify-headerText">Mobile Number verification</div>
          <div className="mobile-verify-subheaderText">Please enter your mobile number</div>
          <div className="calling-code">+{country.callingCode}</div>
            <form onSubmit={this._getSubmitAction}>
             <input
               type="text"
               placeholder={'Phone Number'}
               value={number}
               className="mobile-number-input"
               maxLength="10"
               onChange={this._onChangeText} />
               <Link to={{
                 pathname: '/otp-verify',
                 state: {
                   mobileNumber: this.state.number}
               }}>
               <div>
                 <button type="button" className="btn btn-primary" id="phone-submit">Continue</button>
               </div>
             </Link>
          </form>
        </div>
      </div>

    )
  }
}



export default connect(
  mapStateToProps,
  { updatePhoneDetails },
)(PhoneVerify)
