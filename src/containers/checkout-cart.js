import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  clearCart,
  changeItemQuantity,
  loadPickupPage,
  updatePickPoint,
  updateParcelPreference,
  updateCheckoutMethod,
  checkoutCart,
  updateDeliveryPreference, } from '../actions'

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

class SmallCart extends Component {

    itemQuantityHandler = (value, item) => {
      const { changeItemQuantity } = this.props
      changeItemQuantity(value, item)
    }

    render(){
      const {cartItemsList, cartBillDetails, cartItemCount, clearCart, isLoggedIn, userDetails, orderId, purchaseDetails, checkoutCart} = this.props
      const renderCartRestaurant = Object.keys(purchaseDetails.orders).map((key) => {
          return(
            <div key = {key} className='checkout-cart-items-container'>
              <span style={{
                  color: '#4D4D4D',
                  borderBottom: 'solid',
                  borderColor: 'rgba(199, 199, 199, 1)',
                  borderBottomWidth: '0.5px',
                  paddingBottom: '3px',
                  marginLeft: '2%',
                  fontSize: '23px',
                  fontWeight: 'bold'
                }}>{purchaseDetails.orders[key].restaurantName}</span>
              <div>
                {
                  Object.keys(purchaseDetails.orders[key].orderItems).map((index) => {
                    return(
                      <div key={index} style={{
                          fontSize: '20px',
                          margin: '2%',
                          marginTop: '6%'
                        }}>{purchaseDetails.orders[key].orderItems[index].itemName}
                        <span style={{
                            float: 'right',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            padding: '5px',
                            width: '17%'
                          }}>{'₹ ' + purchaseDetails.orders[key].orderItems[index].orderItemAmount}</span>
                        <span style={{
                              float: 'right',
                              marginRight: '15%'
                            }}>
                            <button
                              style={{
                                backgroundColor: '#1EAF82',
                                border: 'none',
                                fontSize: '17px',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                              }}
                              onClick={this.itemQuantityHandler.bind(this, purchaseDetails.orders[key].orderItems[index].itemQuantity - 1, purchaseDetails.orders[key].orderItems[index].orderItemId)}>-</button>
                            <span style={{
                                fontSize: '17px',
                                paddingLeft: '5px',
                                paddingRight: '5px',
                              }}>{purchaseDetails.orders[key].orderItems[index].itemQuantity}</span>
                            <button
                              style={{
                                backgroundColor: '#1EAF82',
                                border: 'none',
                                fontSize: '17px',
                                color: '#ffffff',
                                fontWeight: 'bold'
                              }}
                              onClick={this.itemQuantityHandler.bind(this, purchaseDetails.orders[key].orderItems[index].itemQuantity + 1, purchaseDetails.orders[key].orderItems[index].orderItemId)}>+</button>
                          </span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        )
      })

        return(
          <div className="checkout-cart-container">
            <div className="checkout-cart-head">Food Items</div>
            <div>{renderCartRestaurant}</div>
          </div>

          )
        }
      }

  export default connect( mapStateToProps,
    {
      clearCart,
      changeItemQuantity,
      loadPickupPage,
      updatePickPoint,
      updateParcelPreference,
      updateCheckoutMethod,
      checkoutCart,
      updateDeliveryPreference,
    }
  )(SmallCart)
