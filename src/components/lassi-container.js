import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { getCustomerDetails, getLoggedInStatus } from '../selectors'
import { connect } from 'react-redux'



const mapStateToProps = (state, ownProps) => ({
  userDetails: getCustomerDetails(state),
  isLoggedIn: getLoggedInStatus(state),
  provider: state.user.provider,
})


class LassiContainer extends Component{


  constructor(props) {
    super(props);
    this.loggedInStatus = this.loggedInStatus.bind(this)
  }

  loggedInStatus(){
    const {isLoggedIn, userDetails} = this.props

    if(!isLoggedIn){
      return(
        <Link to="/user-login">
          <button className="btn btn-primary" id="signOut-button"  style={{
                backgroundColor: '#FFFFFF',
                color: '#1EAF82',
                borderRadius: '20px',
                borderColor: '#1EAF82',
                borderWidth: '3px',
                fontSize: '17px',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '5%',
                width: '100%',
                marginBottom: '10%'
              }}>Sign In</button>
        </Link>
      )
    }

    else{
      return(
        <Link to="/user-profile">
          <img className="profile-image" src={userDetails.profilePic} />
          <div style={{
              color: '#4D4D4D',
              fontSize: '13px'
            }}>Hey, {userDetails.fullName}</div>
        </Link>
      )
    }
  }


  render(){

    return(
      <div className="top-nav">
        <Link to="/landing-page">
          <div className='circle'>
            <img src='../../style/assets/logo_mini.png' className="lassi-logo" />
          </div>
        </Link>
        <div className="profile-section">
          {this.loggedInStatus()}
        </div>
        <span style={{
            float: 'left',
            marginLeft: '13%',
            fontSize: '22px'
          }}>
          {this.props.groupName}
        </span>
        <div className="navbar-container">
          <img src='../../style/assets/search_ico@2x.png' className="nav-button" />
          <span className="nav-text">Search</span>
          <Link to='order-checkout' style={{
              color: 'inherit'
            }}>
            <img src='../../style/assets/cart_ico@2x.png' className="nav-button" />
            <span className="nav-text">Cart</span>
          </Link>
          <img src='../../style/assets/help_ico@2x.png' className="nav-button" />
          <span className="nav-text">Help</span>
        </div>
        <div className="horizontal-line" />
      </div>
    )

  }
}

export default connect(
  mapStateToProps,
  {  },
)(LassiContainer)
