import React, { Component } from 'react'
import LassiContainer from '../components/lassi-container'
import { connect } from 'react-redux'
import {loadStallsScreen} from '../actions'
import { getEntitiesAsList } from '../selectors'
import {Link} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
  restaurantsList: getEntitiesAsList(state.stalls),
  bannersList: getEntitiesAsList(state.foodcourtBanners),
  isFetching: state.foodcourtBanners.isFetching
})

class FoodCourtHome extends Component{

  componentWillMount = () => {
    const {loadStallsScreen, bannersList} = this.props
    const groupID = parseInt(this.props.match.params.groupID)
    loadStallsScreen(groupID)
  }
  render(){
    const groupID = parseInt(this.props.match.params.groupID)
    const { restaurantsList, bannersList, isFetching } = this.props
    console.log(restaurantsList);

    const renderStalls = restaurantsList.map((stall, key) => {
      return(
        <Link key={key} to={`/restaurant-home/${groupID}/${stall.restaurantId}`}>
          <img className="grid-item-image-stalls" src={stall.logoImgUrl}></img>
          <div style={{
              color: '#666666',
              width: '30%',
              fontSize: '15px',
              textAlign: 'center',
              marginLeft: '22%',
              fontWeight: 'bold',
              marginTop: '4%',
              marginBottom: '5%'
            }}>{stall.restaurantName}</div>
        </Link>
      )
    })

    return(
      <div>
        <LassiContainer groupName={!!bannersList.length && bannersList[0].restaurantName} />
        <div className="grid-container-stalls">
          {renderStalls}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, {loadStallsScreen})(FoodCourtHome)
