import React, { Component } from 'react'
import Switch from 'react-switch'
import Draggable from 'react-draggable';
import LassiContainer from '../components/lassi-container'
import Cart from './small-cart'
import Octicon from 'react-component-octicons';

import { connect } from 'react-redux'
import {
loadRestaurantStoreFrontScreen,
loadMenuItemsScreen,
addItemToCart,
removeItemFromCart,
changeItemQuantity,
checkoutCart,
clearCart,
addFilterByParam,
clearAllFilters,
loadMoreItems,
} from '../actions'
import { fetchCategories } from '../services/lassiClient'
import {
  getMenuItemsAsList,
  getCartItemsListByRest,
  getCartSummary,
  getTaxDetails,
  getItemCount,
  getPurchaseDetails,
  getPurchaseCouponDetails,
  getEntitiesAsList} from '../selectors'


const mapStateToProps = (state, ownProps) => ({
  bannersList: getEntitiesAsList(state.banners),
  categories: state.categories.allIds,
  cart: state.cart.byId,
  menuItemsList: getMenuItemsAsList(state),
  cartItemsList: getCartItemsListByRest(state),
  cartBillDetails: getCartSummary(state),
  cartTaxDetails: getTaxDetails(state),
  cartItemCount: getItemCount(state),
  purchaseDetails: getPurchaseDetails(state),
  couponDetails: getPurchaseCouponDetails(state),
  parcelPreference: state.purchase.isParcel,
  isUserLoggedIn: state.user.isLoggedIn,
  itemCount: state.cart.allIds.length,
  isVegInFilter: !!(Object.keys(state.items.filters.filterBy).indexOf('isVeg') !== -1),

})

class RestaurantHome extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      qty : 0,
      showCart: false,
      restaurantID: '',
      category: ''
      }
    }

    componentDidMount() {
      const restaurantID = this.props.match.params.restaurantID
      const { loadRestaurantStoreFrontScreen } = this.props
      loadRestaurantStoreFrontScreen(restaurantID);
      document.addEventListener('scroll', this.handleScroll);
      this.loadMenuItems(restaurantID);
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.handleScroll);
    }

    loadMenuItems(restaurantID, category = "Small-Bites") {
      const { loadMenuItemsScreen } = this.props
      loadMenuItemsScreen(restaurantID, category)
      this.setState({
        restaurantID: restaurantID,
        category: category
      })
    }

    handleScroll = (e) => {
      const {loadMoreItems} = this.props
      const {restaurantID, category} = this.state
      const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight;
      if (bottom) {
        loadMoreItems(restaurantID, category)
      }
    }

    addToCartHandler(key, restaurantID, item) {
      const { addItemToCart, cart } = this.props
      addItemToCart(restaurantID, item)
      this.setState({showCart: true})
    }

    handleToggle = () => {
      const { clearAllFilters, addFilterByParam, isVegInFilter } = this.props
      if (isVegInFilter) {
        clearAllFilters()
      } else {
        addFilterByParam({ paramName: 'isVeg', paramValue: 'Y' })
      }
    }

    removeFromCartHandler = (item) => {
      const { removeItemFromCart } = this.props
      removeItemFromCart(item)
    }

    itemQuantityHandler = (value, item) => {
      const { changeItemQuantity } = this.props
      changeItemQuantity(value, item)
    }

    cartToggle = () => {
      this.setState({showCart: false})
    }

    render() {
      const {categories, menuItemsList, cartItemsList, clearCart, cartBillDetails, cart, isVegInFilter, bannersList} = this.props
      console.log(bannersList);
      const restaurantID = (this.props.match.params.restaurantID)
      const logoImg = (!!bannersList.length && bannersList[0].bannerImgUrl)
      const restaurantName = (!!bannersList.length && bannersList[0].restaurantName)
      console.log(cartBillDetails)
        const renderCategories = categories.map((category, key) => {
        return(
           <div key = {key} onClick={this.loadMenuItems.bind(this, restaurantID, category)} className="category">{category}</div>
         );
      });

      const renderMenuItems =  Object.keys(menuItemsList).map((key) => {
        var buttonId = {
          id: `addCart${key}`
        };
        return(
          <div
            style={{
              borderRadius: '10px',
              borderColor: '#000000',
              border: '0.5px solid rgba(179, 179, 179, 1)',
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)',
              float: 'left',
              margin: '1%',
              marginTop: '4%'
            }}
            key = {key}>
              <div className="grid-item-text-food">{menuItemsList[key].itemName}</div>
              <div
                style={{
                  float: 'left',
                  width: '50%',
                  marginLeft: '5%',
                  marginTop: '2%',
                  fontSize: '13px',
                  color: '#B3B3B3'
                }}>{menuItemsList[key].itemDesc}</div>
              <img className="grid-item-image-food" src={menuItemsList[key].primaryImg}></img>
              <button type="button" {...buttonId} className="btn btn-primary" onClick={this.addToCartHandler.bind(this, key, restaurantID, menuItemsList[key].itemId)}>Add To Cart</button>
              <div
                className="grid-item-text-food"
                style={{
                  float: 'left',
                  marginTop: '0'
                }}>{"₹ "+menuItemsList[key].price}</div>
          </div>
          )
        })


      return (
          <div className="restaurant-home-container">
            <LassiContainer />
            <div className="restaurant-content-container">
              <div className="restaurant-home-details">
                <img src={logoImg} className="logo-image" />
                <span className="restaurantName">{restaurantName}</span>
                <label htmlFor="isVeg-switch">
                  <Switch
                    onChange={this.handleToggle}
                    checked={isVegInFilter}
                    id="normal-switch"
                    onColor="#1EAF82"
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                  <span className="veg-filter-text">Veg</span>
                </label>
              </div>
              <div className="categories-container">
                <div className="menu-item-text">Menu Items</div>
                <div className="categories">{renderCategories}</div>
              </div>
              <div onScroll={this.handleScroll} className="grid-container-items">{renderMenuItems}</div>

                <div>
                  {
                    // this.state.showCart &&
                    <div>
                      <Cart />
                      {
                        // <span style={{
                        //     float: 'right',
                        //     border: '2px solid white',
                        //     borderRadius: '100%',
                        //     display: "flex",
                        //     width: '30px',
                        //     height: '30px',
                        //     textAlign: 'center',
                        //     marginRight: '2%',
                        //     position: "absolute",
                        //     top: "67px",
                        //     right: '0',
                        //     color: 'white'
                        //
                        // }} onClick={this.cartToggle.bind(this)}>
                        //   <Octicon name={'x'} style={{
                        //       width: '24px',
                        //       height: '24px',
                        //       display: 'block',
                        //       margin: '0 auto',
                        //   }}/>
                        // </span>
                      }

                    </div>

                  }

                </div>
            </div>
          </div>
      );
    }
  }

  export default connect( mapStateToProps, { loadRestaurantStoreFrontScreen, loadMenuItemsScreen, loadMoreItems, addItemToCart , clearCart,removeItemFromCart, addFilterByParam, clearAllFilters } )(RestaurantHome)
