import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePhoneDetails } from '../actions'
import Countdown from 'react-countdown-now';
import { getCustomerPhone } from '../selectors'
import {Redirect, Link} from 'react-router-dom'
import { lassiAPIClient as api } from '../services'
import Modal from 'react-responsive-modal';


import LassiContainer from '../components/lassi-container'

const mapStateToProps = (state, ownProps) => ({
  customerId: state.user.customerId,
  isPhoneVerified: getCustomerPhone,
})

class OTPVerify extends Component{

  state = {
    enterCode: true,
    spinner: false,
    showRetry: false,
    otp: '',
    number: this.props.location.state.mobileNumber,
    redirect: false,
    verified: false,
    country: {
      cca2: 'IN',
      callingCode: '91',
    },
    popUpErrorDuplicate: '',
    popUpErrorIncorrect: '',
    modalOpen: false
  }

   async componentDidMount(){
      const { customerId } = this.props
      const { country, number } = this.state
      this.setState({ spinner: true })
      const response = await api.updateCustomerPhoneDetails({
        customerId,
        phone: `${country.callingCode}${number}`,
      })
      console.log(response);
      if (response.error !== undefined) {
        this.setState({ popUpErrorDuplicate: 'Duplicate Contact Number. Please try again.', modalOpen: true })
      } else this.setState({ spinner: false, enterCode: true})
  }

  _verifyCode = async () => {
    const { customerId, updatePhoneDetails } = this.props
    const {otp} = this.state;
    this.setState({ spinner: true })
    const { response } = await api.verifyCustomerPhoneDetails({
      customerId,
      otp
    })
    this.setState({ spinner: false, enterCode: true})
    if (response) {
      updatePhoneDetails(response)
      this.setState({verified: true})

    } else {
      this.setState({ popUpErrorIncorrect: 'Wrong OTP or Invalid PhoneNumber. Please try again.', modalOpen: true})
    }
  }

  _onChangeText = (event) => {
    this.setState({ otp: event.target.value })
  }

  _tryAgain = () => {
    this.setState({ enterCode: false })
  }

  _getSubmitAction = (event) => {
    event.preventDefault()
    const { enterCode } = this.state
  }

  onCloseModal = () => {
    this.setState({redirect: true})
  }

  render(){
    const{redirect, otp, popUpErrorIncorrect, popUpErrorDuplicate, modalOpen, verified} = this.state

    if (redirect) {
      return <Redirect to='/phone-verify'/>;
    }

    if (verified) {
      return <Redirect to='/user-profile'/>;
    }

    return(
      <div className="user-login-container">
        <LassiContainer />
        <div className="user-login-content">
          <div className="user-profile-headerText">User Account</div>
          <div className="mobile-verify-headerText">Mobile Number verification</div>
          <div className="mobile-verify-subheaderText">Please enter OTP</div>
          <form onSubmit={this._getSubmitAction}>
             <input
               type="text"
               placeholder={'OTP'}
               value={otp}
               className="otp-input"
               maxLength="6"
               onChange={this._onChangeText} />
          </form>
          <Modal open={modalOpen} onClose={this.onCloseModal} center>
            <div>{popUpErrorDuplicate}{popUpErrorIncorrect}</div>
            <Link to="/phone-verify">OK</Link>
          </Modal>
          <button type="button" className="btn btn-primary" id="otp-submit" onClick={this._verifyCode}>Continue</button>
        </div>
      </div>
    )
  }


}

export default connect(
  mapStateToProps,
  { updatePhoneDetails },
)(OTPVerify)
