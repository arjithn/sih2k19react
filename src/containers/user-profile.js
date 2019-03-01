import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login';
import { logOut, loadPastOrdersScreen, loadCurrentOrdersScreen } from '../actions'
import { connect } from 'react-redux'
import { getCustomerDetails, getLoggedInStatus, getEntitiesAsList, getFetchingStatus } from '../selectors'
import LassiContainer from '../components/lassi-container'
import OrderTracker from '../components/order-tracker'
import OrderStatus from '../components/order-status'
import {Redirect} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
  userDetails: getCustomerDetails(state),
  pastOrdersList: getEntitiesAsList(state.orders.closed),
  isFetchingPageClosed: getFetchingStatus(state.orders.closed),
  currentOrdersList: getEntitiesAsList(state.orders.open).reverse(),
  isFetchingPageOpen: getFetchingStatus(state.orders.open),
  isLoggedIn: getLoggedInStatus(state),
})

class UserProfile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      showCurrent : true,
      showPast : false,
      }
    this.logoutFunc = this.logoutFunc.bind(this)
  }

  componentWillMount(){
    const { loadPastOrdersScreen, loadCurrentOrdersScreen } = this.props
    loadPastOrdersScreen()
    loadCurrentOrdersScreen()
    window.gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = window.gapi.auth2.init({
            client_id: process.env.RN_GOOGLE_CLIENT_ID
        });
      })

  }


  logoutFunc(){
    const {logOut} = this.props
    logOut()
  }

  renderCurrentOrders = () => {
    this.setState({
      showCurrent: true,
      showPast: false
    })
  }

  renderPastOrders = () => {
    this.setState({
      showPast: true,
      showCurrent: false
    })
  }


  render(){
    const{userDetails, currentOrdersList, pastOrdersList, isLoggedIn} = this.props
    const { showCurrent, showPast, logOutToggle } = this.state
    console.log(pastOrdersList);
    if(showCurrent){
      var orderList = currentOrdersList
    }

    if(showPast){
      var orderList = pastOrdersList
    }
    //
    // if(!isLoggedIn){
    //   return <Redirect to='/user-login' />
    // }

    const renderOrders = orderList.map((placedorder, key) => {
      var date = new Date(placedorder.lastModifiedTime * 1000)
      console.log(placedorder.orders);
      return(
        <div key = {key} className='current-order-container'>
          <div style = {{
              color: '#4D4D4D',
              fontSize: '20px',
              backgroundColor: '#F1F1F1',
              padding: '1%',
              fontWeight: 'bold',
            }}>
            Purchase ID - {placedorder.purchaseId}
            <span style ={{
                float: 'right',
                fontSize: '15px'
              }}>
              {`${(`0${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}`).slice(-2)} : ${(`0${date.getMinutes()}`).slice(-2)} ${date.getHours() > 11 ? 'PM' : 'AM'}`}
            </span>
            <span style ={{
                float: 'right',
                fontSize: '15px',
                marginRight: '2%'
              }}>
              {`${(`0${date.getUTCDate()}`).slice(-2)}/${(`0${date.getUTCMonth() + 1}`).slice(-2)}/${(`0${date.getUTCFullYear()}`).slice(-2)}`}
            </span>
          </div>
          <div>
            {
              Object.keys(placedorder.orders).map((index) => {
                return(
                  <div key={index}>
                    <div style={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        color: '#4D4D4D',
                        margin: '2% 1% 1% 2%',
                        clear: 'both'
                      }}>
                      {placedorder.orders[index].restaurantName}
                      {
                        showPast
                        ? (
                          <div style={{
                              float: 'right'
                            }}>
                            <OrderStatus status={placedorder.orders[index].orderStatus} isDeliveryAvailable={placedorder.orders[index].isDelivery === 'Y'} />
                          </div>

                        ) : ( null )
                      }
                    </div>
                    <div style={{
                        color: '#808080',
                        fontSize: '13px',
                        marginLeft: '2%'
                      }}>
                      Ordered Items
                    </div>
                    <div style={{
                        color: '#808080',
                        fontSize: '15px',
                        fontWeight: '600',
                        margin: '1% 1% 1% 2%'
                      }}>
                      {
                        Object.keys(placedorder.orders[index].orderItems).map((item) =>{
                          return(
                            <div key={item}>
                              <div style={{
                                  marginBottom: '1%'
                                }}>
                                {placedorder.orders[index].orderItems[item].itemQuantity} x {placedorder.orders[index].orderItems[item].itemName}
                                <span style={{
                                    float: 'right',
                                    marginRight: '1%',
                                    marginBottom: '1%'
                                  }}>
                                  ₹ {placedorder.orders[index].orderItems[item].orderItemAmount}
                                </span>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div>
                    {
                      showCurrent
                      ? (
                        <div>
                          <div className="status-text" style={{
                              marginLeft: '17%'
                            }}>Placed</div>
                          <div className="status-text">Confirmed</div>
                          <div className="status-text">Preparing</div>
                          <div className="status-text">Food Pickup</div>
                          <div className="status-text">PickUp</div>
                          <OrderTracker status={placedorder.orders[index].orderStatus} isDeliveryAvailable={placedorder.orders[index].isDelivery === 'Y'} />
                          </div>
                      ) : (
                        <div></div>
                      )
                    }
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            showCurrent
            ? (
              <div className="order-invoice-container">
                <div style={{
                    fontSize: '23px',
                    fontWeight: 'bold',
                    color: '#4D4D4D',
                    borderBottom: 'solid',
                    borderBottomWidth: '0.3px',
                    borderColor: '#808080',
                    paddingBottom: '1%',
                    margin: '1%'
                  }}>
                  INVOICE
                </div>
                <div style={{
                    margin: '2%',
                    fontSize: '18px',
                    color: '#666666',
                    fontWeight: 'bold'
                  }}>
                  Sub Total
                  <span style={{
                      float: 'right'
                    }}>
                    ₹ {placedorder.totalOrderAmount}
                  </span>
                </div>
                <div style={{
                    margin: '2%',
                    fontSize: '15px',
                    color: '#808080',
                    fontWeight: 'bolder'
                  }}>
                  Tax
                  <span style={{
                      float: 'right'
                    }}>
                    ₹ {placedorder.totalTaxAmount}
                  </span>
                </div>
                <div style={{
                    margin: '2%',
                    fontSize: '15px',
                    color: '#808080',
                    fontWeight: 'bolder'
                  }}>
                  Discount % Offers
                  <span style={{
                      float: 'right'
                    }}>
                    -₹ {placedorder.totalOrderAmount - placedorder.totalDiscountedOrderAmount}
                  </span>
                </div>
                <div style={{
                    margin: '2%',
                    fontSize: '15px',
                    color: '#808080',
                    fontWeight: 'bolder'
                  }}>
                  Coupon Discount
                  <span style={{
                      float: 'right'
                    }}>
                    -₹ {placedorder.totalCouponAmount}
                  </span>
                </div>
                <div style={{
                    margin: '2%',
                    fontSize: '15px',
                    color: '#1EAF82',
                    fontWeight: 'bolder',
                    paddingBottom: '4%'
                  }}>
                  Parcel Charges
                  <span style={{
                      float: 'right'
                    }}>
                    ₹ {placedorder.totalParcelCharge}
                  </span>
                </div>
              </div>
            ) : (
              null
            )
          }
          <div style={{
              backgroundColor: '#F1F1F1',
              fontSize: '23px',
              textAlign: 'right',
              fontWeight: 'bold',
              color: '#666666',
              padding: '1%'
            }}>
            Amount :  ₹ {placedorder.totalPurchaseAmount}
          </div>
        </div>
      )
    })

    return(
      <div className="user-login-container">
        <LassiContainer />
        <div className="user-login-content">
          <div className="user-profile-headerText">User Account</div>
          </div>
        <div className="user-profile-container">
          <img className="user-profile-image" src={userDetails.profilePic} />
          <div className="user-name">{userDetails.fullName}</div>
          <div className="user-email">{userDetails.email}</div>
          <div className="user-contact">+{userDetails.phone}</div>

          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.logoutFunc}
            className="user-logout"
          >
          </GoogleLogout>
        </div>
        <button type="button" className='btn btn-primary' id='current-orders' onClick={this.renderCurrentOrders.bind(this)}>Current Orders</button>
        <button type="button" className='btn btn-primary' id='past-orders' onClick={this.renderPastOrders.bind(this)}>Past Orders</button>
        {showCurrent && renderOrders}
        {showPast && renderOrders}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { logOut, loadPastOrdersScreen, loadCurrentOrdersScreen },
)(UserProfile)
