import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import LassiContainer from '../components/lassi-container'
import {
  clearCart,
  loadPickupPage,
  updatePickPoint,
  updateParcelPreference,
  updateCheckoutMethod,
  checkoutCart,
  updateDeliveryPreference } from '../actions'

import {
  getCartItemsListByRest,
  getCartSummary,
  getPurchaseCouponDetails,
  getItemCount,
  getLoggedInStatus,
  getCustomerDetails,
  getFetchingStatus,
  getTaxDetails,
  getCartOrders,
  getPickupPoints,
  getpickupPointName,
  getrestaurantGroupId,
  getisDeliveryServiceAvailable,
  getPurchaseId,
  getCustomerId } from '../selectors'
import CheckoutCart from './checkout-cart'
import CheckoutInvoice from './checkout-invoice'
import {Link} from 'react-router-dom'


const mapStateToProps = (state, ownProps) => ({
  cart: state.cart.byId,
  cartItemsList: getCartItemsListByRest(state),
  cartBillDetails: getCartSummary(state),
  cartItemCount: getItemCount(state),
  isLoggedIn: getLoggedInStatus(state),
  userDetails: getCustomerDetails(state),
  pickupPointsList: getPickupPoints(state),
  isFetchingPage: getFetchingStatus(state.ppts),
  parcelPreference: state.purchase.isParcel,
  deliveryPreference: state.purchase.isDelivery,
  checkoutMethod: state.purchase.checkoutMethod,
  pickupPointName: getpickupPointName(state),
  restaurantGroupId: getrestaurantGroupId(state),
  isDeliveryServiceAvailable: getisDeliveryServiceAvailable(state),
  isFetchingPurchase: state.purchase.isFetching,
  arePurchseDetailsAvailable: state.purchase.purchaseDetails || null,
  purchseId: getPurchaseId(state),
  customerId: getCustomerId(state),
})


class OrderCheckout extends Component{
  state = {
    selectedFloor: 0,
    selectPickup: true,
    pickupPointsVisible: false,
    pickupPointSelected: false,
    updatePage: false,
    initialParcelPref: false,
    CouponCode: 'HappyPongal',
    successfulCoupon: false,
    couponApplied: false,
    pickupPointGroup: '',
    pickupPointId: ''
  }

  componentWillMount() {

    const {
      loadPickupPage, pickupPointsList, checkoutMethod, restaurantGroupId, parcelPreference,
    } = this.props
    this.setState({ selectedCheckoutMethod: checkoutMethod })
    this.setState({ initialParcelPref: parcelPreference })
    loadPickupPage(restaurantGroupId) // replace '1' with 'restaurantGroupId'
  }

  onPickupPointChangeHandler = (pickupPointId, pickupPointName) => {
    const { updatePickPoint } = this.props
    updatePickPoint(pickupPointId, pickupPointName)
  }

  _onChangeText = (event) => {
    this.setState({ CouponCode: event.target.value })
  }

  _getSubmitAction = (event) => {
    event.preventDefault()
  }

  updateCheckoutDetails = (value) => {
    const {isDeliveryServiceAvailable, updateCheckoutMethod, updateParcelPreference, updateDeliveryPreference} = this.props
    const {initialParcelPref} = this.state
    this.setState({
      selectPickup: value
    })
    if(value){
      updateCheckoutMethod('Pickup')
      updateDeliveryPreference(false)
      updateParcelPreference(initialParcelPref)
    }
    else{
      if(isDeliveryServiceAvailable === 'Y'){
        updateCheckoutMethod('Delivery')
        updateParcelPreference(true)
        updateDeliveryPreference(true)
      }
    }
  }

  updateParcelDetails = (value) => {
    const { parcelPreference, updateParcelPreference } = this.props
    const {initialParcelPref} = this.state
    this.setState({ initialParcelPref: value })
    updateParcelPreference(value)
  }
  // renderCouponModule(){
  //   const { CouponCode, successfulCoupon, couponApplied } = this.state
  //   return(
  //     <div>
  //       <div>Apply Coupon</div>
  //         <form onSubmit={this._getSubmitAction}>
  //            <input
  //              type="text"
  //              placeholder={'Enter the Coupon Code'}
  //              value={CouponCode}
  //              className="otp-input"
  //              onChange={this._onChangeText} />
  //         </form>
  //         <button onCl
  //     </div>
  //   )
  // }

  renderPickup = () => {
    const { parcelPreference, updateParcelPreference, pickupPointsList } = this.props
    return(
      <div>
        <div style = {{
            color: '#1EAF82',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '5%'
          }}>Choose your Option</div>
        <button type="button" className='btn btn-primary'  style={{
          backgroundColor: '#FFFFFF',
          color: '#1EAF82',
          borderRadius: '30px',
          borderColor: '#1EAF82',
          borderWidth: '3px',
          marginLeft: '13%',
          fontSize: '17px',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '5%',
          width: '10%',
          marginBottom: '10%'
        }} onClick={this.updateParcelDetails.bind(this, true)}>Parcel</button>
      <button type="button" className='btn btn-primary' style={{
            backgroundColor: '#FFFFFF',
            color: '#1EAF82',
            borderRadius: '30px',
            borderColor: '#1EAF82',
            borderWidth: '3px',
            marginLeft: '5%',
            fontSize: '17px',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '5%',
            width: '10%',
            marginBottom: '10%'
          }} onClick={this.updateParcelDetails.bind(this, false)}>Dining</button>
      </div>
    )
  }
  handleChange = (event) => {

    const { updatePickPoint } = this.props

    this.setState({
      pickupPointId: event.target.value,
      pickupPointSelected: true
    })

    updatePickPoint(parseInt(event.target.value))

  }

  renderPoints = () => {
    const { pickupPointName, pickupPointsList } = this.props
    const {pickupPointGroup} = this.state
    if(pickupPointGroup){
      var deliveryList =  pickupPointsList[pickupPointGroup]
      return(
        <form style={{
          }}>
          {
            Object.keys(deliveryList).map((key) => {
              return(
                <div style={{
                    marginTop: '2%',
                  }}>
                  <input
                    type="radio"
                    name="pickupPoint"
                    value={deliveryList[key].pickup_point_id.toString()}
                    id="radio-one"
                    class="form-radio"
                    checked={this.state.pickupPointId === deliveryList[key].pickup_point_id.toString()}
                    onChange={this.handleChange.bind(this)} />
                    <label for="radio-one">
                    {deliveryList[key].pickup_point_label}
                    </label>
                </div>
              )
            })
          }
        </form>
      )
    }
    else{
      return(
        null
      )
    }
  }


  onSelect = (event) => {
    this.setState({
      pickupPointGroup: event.value
    })
   }



  renderDelivery = () => {
    const { selectedFloor, pickupPointsVisible, pickupPointSelected, pickupPointGroup} = this.state
    const { pickupPointName, pickupPointsList } = this.props
    var pickupGroups = Object.getOwnPropertyNames(pickupPointsList);
    const defaultOption = pickupPointGroup;
    return(
      <div style={{
          float: 'right',
          width: '30%',
          marginRight: '15%'

        }}>
        <div style = {{
            color: '#1EAF82',
            marginLeft: '2%',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '5%',
            marginBottom: '3%',
          }}>Choose your Delivery Point</div>
        <Dropdown options={pickupGroups} onChange={this.onSelect} value={defaultOption} placeholder="Select an option" />
        {this.renderPoints()}
        <div>
          {
            pickupPointSelected
            ? (
              <div>
                <div style = {{
                    color: '#1EAF82',
                    marginLeft: '2%',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginTop: '7%',
                    borderBottom: '0.5px solid rgba(112, 112, 112, 1)',
                    marginBottom: '2%',
                    paddingBottom: '1%',
                    clear: 'both'
                  }}>Additional Charges</div>
                <div style={{
                    marginLeft: '3%'
                  }}>
                  <span style={{
                      color: 'rgba(102, 102, 102, 1)',
                      marginTop: '3%',
                      fontWeight: 'bold',
                      fontSize: '17px'
                    }}>Parcel Charges</span>
                  <span style={{
                      color: 'rgba(30, 175, 130, 1)',
                      marginTop: '1%',
                      marginLeft: '10%',
                      fontSize: '12px'
                    }}>Parcel Charges are added in Cart.</span>
                </div>
                <div style={{
                    marginLeft: '3%',
                    marginTop: '1%',
                    fontSize: '15px',
                    color: 'rgba(179, 179, 179, 1)',
                    marginBottom: '2%'
                  }}>10% of your Order</div>
                  <div style={{
                      marginLeft: '3%'
                    }}>
                    <span style={{
                        color: 'rgba(102, 102, 102, 1)',
                        marginTop: '3%',
                        fontWeight: 'bold',
                        fontSize: '17px'
                      }}>Delivery Charges</span>
                    <span style={{
                        color: 'rgba(30, 175, 130, 1)',
                        marginTop: '1%',
                        marginLeft: '10%',
                        fontSize: '12px'
                      }}>Delivery Charges are added in Cart</span>
                  </div>
                  <div style={{
                      marginLeft: '3%',
                      marginTop: '1%',
                      fontSize: '15px',
                      color: 'rgba(179, 179, 179, 1)',
                    }}>5% of your Order</div>
              </div>
            ) : (
              null
            )
          }
        </div>
      </div>
    )
  }


  render(){
    const {userDetails} = this.props
    return(
     <div className="user-login-container">
       <LassiContainer />
       <div className="user-login-content">
         <div className="checkout-headerText">Checkout</div>
         <div className="del-info-container">
          <div style={{
            color: '#1EAF82',
            borderBottom: 'solid',
            borderBottomWidth: '0.7px',
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            fontSize: '23px',
            fontWeight: 'bold',
            margin: '2%',
            paddingBottom: '0.5%'
            }}>Delivery Information
            <button type="button" className='btn btn-primary'  style={{
              backgroundColor: 'inherit',
              color: '#666666',
              borderRadius: '13px',
              borderColor: 'rgba(102, 102, 102, 1)',
              borderWidth: '1px',
              marginLeft: '67%',
              fontSize: '15px',
              textAlign: 'center',
              fontWeight: 'bold',
              width: '8%',
            }} onClick={this.updateCheckoutDetails.bind(this, false)}>Delivery</button>
          <button type="button" className='btn btn-primary' style={{
                backgroundColor: 'inherit',
                color: '#666666',
                borderRadius: '13px',
                borderColor: 'rgba(102, 102, 102, 1)',
                borderWidth: '1px',
                marginLeft: '2%',
                fontSize: '15px',
                textAlign: 'center',
                fontWeight: 'bold',
                width: '8%',
              }} onClick={this.updateCheckoutDetails.bind(this, true)}>Pickup</button>
          </div>
          <div style={{
              float: 'left',
              width: '50%'
            }}>
            <div style={{
              margin: '2%',
              fontSize: '20px',
              marginLeft: '4%',
            }}>Hey, {userDetails.fullName}</div>
            <div style={{
              margin: '2%',
              fontWeight: 'bolder',
              fontSize: '20px',
              marginLeft: '4%',
            }}>
              Checkout Option:
              <span style={{
                color: 'rgba(30, 175, 130, 1)'
              }}>
                {this.state.selectPickup ? '  Pickup' : '  Delivery'}
              </span>
            </div>
            <CheckoutCart />
          </div>
        <div className='checkout-left-details'>
        </div>
          {this.state.selectPickup && this.renderPickup()
          }
          {!this.state.selectPickup && this.renderDelivery()
          }
          <CheckoutInvoice />
         </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  {
    clearCart,
    loadPickupPage,
    updatePickPoint,
    updateParcelPreference,
    updateCheckoutMethod,
    checkoutCart,
    updateDeliveryPreference,
   },
)(OrderCheckout)
