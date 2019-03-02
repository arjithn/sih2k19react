import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/landing-page'
import RestaurantHome from './containers/restaurant-home'
import LoginPage from './containers/user-login'
import PhoneVerify from './containers/phone-verify'
import PaytmCheckout from './containers/paytm-checkout'
import OTPVerify from './containers/otp-verify'
import UserProfile from './containers/user-profile'
import OrderCheckout from './containers/order-checkout'
import FoodCourtHome from './containers/food-court-home'
import PaymentResponse from './containers/payment-response'
import MainPage from './components/main-page'


export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/landing-page" component={LandingPage} />
        <Route exact path="/">
          <Redirect to="/landing-page" />
        </Route>
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/restaurant-home/:groupID/:restaurantID" component={RestaurantHome} />
        <Route exact path="/user-login" component={LoginPage} />
        <Route exact path="/phone-verify" component={PhoneVerify} />
        <Route exact path="/otp-verify" component={OTPVerify} />
        <Route exact path="/paytm-checkout" component={PaytmCheckout} />
        <Route exact path="/user-profile" component={UserProfile} />
        <Route exact path="/order-checkout" component={OrderCheckout} />
        <Route exact path="/foodCourt-home/:groupID" component={FoodCourtHome} />
        <Route path="/payment-response" component={PaymentResponse} />
      </Switch>
    </div>
  );
};
