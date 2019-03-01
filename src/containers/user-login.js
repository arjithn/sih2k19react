import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import LassiContainer from '../components/lassi-container'
import {Redirect} from 'react-router-dom'


import { logInViaSocial, loginAttemptCancelled } from '../actions'

import { getCustomerPhone, getCustomerDetails } from '../selectors'


const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.user.isLoggedIn,
  isNewInstallation: state.appInstallStatus.isNewUser,
  customerPhone: getCustomerPhone(state),
  userDetails: getCustomerDetails(state),
})




class LoginPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      verifiedNumber: false
    }
    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)

  }


  responseFacebook(response) {
    const {logInViaSocial} = this.props
    console.log(response);
    logInViaSocial('facebook', response)

  }

  responseGoogle (response) {
    const {logInViaSocial} = this.props
    console.log(response);
    logInViaSocial('google', response)
  }

  responseFailure(response) {
    console.log(response);
  }

  render(){

    const { logInViaSocial, isLoggedIn, customerPhone, userDetails } = this.props
    const { redirect, verifiedNumber } = this.state;

     if(userDetails.email !== undefined){
       if(customerPhone == null){
         return <Redirect to='/phone-verify'/>;
       }
       else{
         return <Redirect to='/user-profile'/>;
       }
     }

     return(
      <div className="user-login-container">
        <LassiContainer />
        <div className="user-login-content">
          <div className="user-profile-headerText">User Account</div>
          <div className="login-box">
            <div className="login-box-text">Signup with Social Login</div>
            <GoogleLogin
              clientId={process.env.RN_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseFailure}
              className="google-login"
            />
          </div>
        </div>
       </div>
    )
  }
}

export default connect( mapStateToProps, { logInViaSocial } )(LoginPage)
