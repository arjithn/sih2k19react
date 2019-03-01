import React from 'react';
import Octicon from 'react-component-octicons';

const OrderStatus = ({ status, isDeliveryAvailable }) => {

  const CurrentPlaced = status === 'PAYMENT_COMPLETED'
  let CurrentRestConfirmed = status === 'ORDER_CONFIRMED_BY_REST'
  const CurrentCooking = status === 'ORDER_CONFIRMED_BY_REST'
  if (CurrentCooking) {
    CurrentRestConfirmed = false
  }
  const CurrentReady = status === 'PENDING_PICKUP_BY_CUST'
  const CurrentPickup = status === 'ORDER_DELIVERED_SUCCESS'

  const CurrentRestDeclined = status === 'ORDER_DECLINED_BY_RESTAURANT'
  const CurrentRestCancelled = status === 'ORDER_CANCELLED_BY_REST'

  const OrderPickedUpForDelivery = status === 'ORDER_PICKED_UP_FOR_DELIVERY'

  const CurrentPickupNever = status === 'NEVER_PICKED_BY_CUST'
  const CurrentOrderCancel = status === 'ORDER_CANCEL_OTHER'

  return(
    <div>
      {
        CurrentPlaced
          ? (
            <div>
              <div style={{
                display: 'inline-block',
                position: 'absolute',
                right: '21%',
                fontSize: '20px',
                fontWeight: 'bolder',
                color: '#1EAF82',
                marginTop: '0.4%'
              }}>Placed</div>
              <span className='focused-icon' style={{
                marginLeft: '17%',
                height: '45px',
                width: '45px',
                float: 'right'
              }}>
                <Octicon name={CurrentPlaced ? 'kebab-horizontal' : 'x'} style={{
                  width: '30px',
                  height: '30px',
                  margin: '0 auto',
                  display: 'block',
                }}/>
              </span>
            </div>

        ) : ( null)
      }

      {(CurrentRestConfirmed || CurrentRestDeclined)
        ? (
          <div>
            <div style={{
              display: 'inline-block',
              position: 'absolute',
              right: '21%',
              fontSize: '20px',
              fontWeight: 'bolder',
              color: '#1EAF82',
              marginTop: '0.4%'
            }}>Confirmed</div>
            <span className='focused-icon' style={{
               backgroundColor: CurrentRestConfirmed ? '#1EAF82' : '#D83D3D',
               height: '45px',
               width: '45px',
               float: 'right'
            }}>
              <Octicon name={CurrentRestConfirmed ? 'kebab-horizontal' : 'x'} style={{
                width: '30px',
                height: '30px',
                margin: '0 auto',
                display: 'block',
              }}/>
            </span>
          </div>
        ) : ( null )
      }

      {CurrentCooking
        ? (
          <div>
            <div style={{
              display: 'inline-block',
              position: 'absolute',
              right: '21%',
              fontSize: '20px',
              fontWeight: 'bolder',
              color: '#1EAF82',
              marginTop: '0.4%'
            }}>Preparing</div>
            <span className='focused-icon' style={{
               backgroundColor: CurrentCooking ? '#1EAF82' : '#D83D3D',
               height: '45px',
               width: '45px',
               float: 'right'
            }}>
              <Octicon name={(CurrentCooking) ? 'kebab-horizontal' : 'x'} style={{
                width: '30px',
                height: '30px',
                margin: '0 auto',
                display: 'block',
              }}/>
            </span>
          </div>
      ) : ( null )
    }

    {CurrentReady || CurrentRestCancelled || OrderPickedUpForDelivery
      ? (
        <div>
          <div style={{
            display: 'inline-block',
            position: 'absolute',
            right: '21%',
            fontSize: '20px',
            fontWeight: 'bolder',
            color: '#1EAF82',
            marginTop: '0.4%'
          }}>Food Picked</div>
          <span className='focused-icon' style={{
             backgroundColor: CurrentReady || OrderPickedUpForDelivery ? '#1EAF82' : '#D83D3D',
             height: '45px',
             width: '45px',
             float: 'right'
          }}>
            <Octicon name={(CurrentRestCancelled) ? 'x' : 'kebab-horizontal' } style={{
              width: '30px',
              height: '30px',
              margin: '0 auto',
              display: 'block',
            }}/>
          </span>
        </div>
      ) : ( null )
    }

    {(CurrentPickup || CurrentPickupNever || CurrentOrderCancel)
      ? (
        <div>
          <div style={{
            display: 'inline-block',
            position: 'absolute',
            right: '21%',
            fontSize: '20px',
            fontWeight: 'bolder',
            color: '#1EAF82',
            marginTop: '0.4%'
          }}>{isDeliveryAvailable ? 'Delivered ' : 'Picked-Up '}</div>
          <span className='focused-icon' style={{
             backgroundColor: CurrentPickup ? '#1EAF82' : '#D83D3D',
             height: '45px',
             width: '45px',
             float: 'right'
          }}>
            <Octicon name={(CurrentPickup) ? 'check' : 'x' } style={{
              width: '30px',
              height: '30px',
              margin: '0 auto',
              display: 'block',
            }}/>
          </span>
        </div>
      ) : ( null )
    }
  </div>
  )
}

export default OrderStatus
