import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import queryString from 'query-string'
import { clearCart } from '../actions'
import { connect } from 'react-redux'

class PaymentResponse extends Component{


  render(){
    const { clearCart } = this.props
    const values = queryString.parse(this.props.location.search)
    console.log(values);
    if(values.status == 'success'){
      clearCart()
      return <Redirect to='/user-profile'/>;
    }

    if(values.status == 'failure'){
      return <Redirect to='/order-checkout'/>;
    }
  }
}

export default connect( null , {clearCart} )(PaymentResponse)
