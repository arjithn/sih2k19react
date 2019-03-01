import React, { Component } from 'react';
import { connect } from 'react-redux'

import { clearCart, changeItemQuantity, removeItemFromCart } from '../actions'

import {
  getCartItemsListByRest,
  getCartSummary,
  getPurchaseCouponDetails,
  getItemCount,
  getLoggedInStatus } from '../selectors'

import {Link} from 'react-router-dom'



const mapStateToProps = (state, ownProps) => ({
  cart: state.cart.byId,
  cartItemsList: getCartItemsListByRest(state),
  cartBillDetails: getCartSummary(state),
  cartItemCount: getItemCount(state),
  isLoggedIn: getLoggedInStatus(state),
})

  class SmallCart extends Component {
    constructor(props) {
      super(props);
    }

    itemQuantityHandler = (value, item) => {
      const { changeItemQuantity, removeItemFromCart } = this.props
      console.log(value, item);
      if(value === 0){
        removeItemFromCart(item)
      }
      else{
        changeItemQuantity(value, item)
      }
    }

    render(){
      const {cartItemsList, cartBillDetails, cartItemCount, clearCart, isLoggedIn} = this.props
      console.log(cartBillDetails.totalOrderAmount)
      const subtotal = cartBillDetails.calculatedPurchaseTotal - cartBillDetails.totalTaxAmount
      const discount = cartBillDetails.calculatedPurchaseTotal - cartBillDetails.totalDiscountedOrderAmount

      const renderCartRestaurant = cartItemsList.map((cartItem, key) => {
          const restaurantName = Object.keys(cartItem)
          const itemName = Object.values(cartItem)
          return(
            <div key = {key}>
              <div style={{
                color: 'rgba(77, 77, 77, 1)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.16)',
                margin: '2%',
                paddingBottom: '2%',
                fontWeight: 'bold',
                fontSize: '20px',
                clear: 'both'
              }}>{restaurantName[0]}
              </div>
              <div>
                {
                  Object.keys(itemName[0]).map((i) => {
                  return(
                    <div key = {i} className="cart-items-container" >
                      <span className="cart-items-name">{itemName[0][i].itemName}</span>
                      <span className="cart-items-price">{"₹ "+itemName[0][i].orderItemAmount}</span>
                      <span style={{
                            float: 'right',
                            marginRight: '5%'
                          }}>
                          <button
                            style={{
                              backgroundColor: '#1EAF82',
                              border: 'none',
                              fontSize: '15px',
                              color: '#ffffff',
                              fontWeight: 'bold',
                              textAlign: 'center'
                            }}
                            onClick={this.itemQuantityHandler.bind(this, itemName[0][i].itemQuantity - 1, itemName[0][i].orderItemId)}>-</button>
                          <span style={{
                              fontSize: '17px',
                              paddingLeft: '5px',
                              paddingRight: '5px',
                            }}>{itemName[0][i].itemQuantity}</span>
                          <button
                            style={{
                              backgroundColor: '#1EAF82',
                              border: 'none',
                              fontSize: '15px',
                              color: '#ffffff',
                              fontWeight: 'bold'
                            }}
                            onClick={this.itemQuantityHandler.bind(this, itemName[0][i].itemQuantity + 1, itemName[0][i].orderItemId)}>+</button>
                        </span>

                    </div>
                  )
                })
                }
                <div style={{
                      borderBottom: '2px dashed rgba(0, 0, 0, 0.16)',
                      clear: 'both',
                      margin: '2%',
                      marginBottom: '6%',
                      paddingBottom: '2%'
                  }} />
              </div>

          </div>
        )
      })

        return(
          <div className="small-cart-container">
            <div className="cart-head">CART
            </div>
            <div>
              <button type="button" id="clearCartButton" className="btn btn-primary" onClick={clearCart}>Clear Cart</button>
            </div>
            <div>{renderCartRestaurant}</div>
            <div className="invoice-container">
              <div className="invoice-left">Invoice</div>
              <div className="invoice-left-subinvoice">Sub Total</div>
              <span className="invoice-right-subinvoice">{"₹ "+subtotal.toFixed(2)}</span>
              <div className="invoice-left-subinvoice">Tax</div>
              <span className="invoice-right-subinvoice">{"₹ "+cartBillDetails.totalTaxAmount}</span>
              <div className="invoice-left-subinvoice">Discount % Offers</div>
              <span className="invoice-right-subinvoice">{"₹ "+discount.toFixed(2)}</span>
            </div>
            <div className="cart-bottom">
              <div className="item-count">{cartItemCount[0]}</div>
              <span style={{
                  // float: 'left',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  marginTop: '10px',
                  marginLeft: '15px'
                }}>Cart</span>
              <Link to={isLoggedIn ? '/order-checkout' : '/user-login'} className="proceed-order">Proceed</Link>
              <div style={{
                float: 'left',
                fontSize: '17px',
                fontWeight: 'bold',
                margin: '15px'
                }}>Total Amount</div>
              <div style={{
                float: 'right',
                fontSize: '17px',
                fontWeight: 'bold',
                margin: '15px'
                }}>{"₹ "+cartBillDetails.totalOrderAmount}</div>
            </div>
          </div>

          )
        }
      }

  export default connect( mapStateToProps, {clearCart, changeItemQuantity, removeItemFromCart} )(SmallCart)
