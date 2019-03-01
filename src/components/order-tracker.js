import React from 'react';
import Octicon from 'react-component-octicons';

const Placed = 1
const Confirmed = 2
const Preparing = 3
const Ready = 4
const Pickup = 5

const OrderTracker = ({ status, isDeliveryAvailable }) => {

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

  let currentStatus = -1

  if (CurrentPlaced) {
    currentStatus = 1
  } else if (CurrentRestConfirmed || CurrentRestDeclined) {
    currentStatus = 2
  } else if (CurrentCooking) {
    currentStatus = 3
  } else if (CurrentReady || CurrentRestCancelled || OrderPickedUpForDelivery) {
    currentStatus = 4
  } else if (CurrentPickup || CurrentPickupNever || CurrentOrderCancel) {
    currentStatus = 5
  }

  console.log(currentStatus);

  return(
    <div>
      {
        CurrentPlaced
          ? (
            <span className='focused-icon' style={{
              marginLeft: '17%'
            }}>
              <Octicon name={CurrentPlaced ? 'kebab-horizontal' : 'x'} style={{
                width: '30px',
                height: '30px',
                margin: '0 auto',
                display: 'block',
              }}/>
            </span>
        ) : (
          <span className='unfocused-icon' style={{
            backgroundColor: currentStatus >= Placed ? '#1EAF82' : '#FFFFFF',
            marginLeft: '17%'
          }}>
            <Octicon name='check' style={{
              width: '20px',
              height: '20px',
              margin: '0 auto',
              display: 'block',
            }} />
          </span>
        )
      }
      <div className="tracker-line">
        <hr className='horizontal-line-tracker' />
      </div>

      {(CurrentRestConfirmed || CurrentRestDeclined)
        ? (
          <span className='focused-icon' style={{
             backgroundColor: CurrentRestConfirmed ? '#1EAF82' : '#D83D3D',
          }}>
            <Octicon name={CurrentRestConfirmed ? 'kebab-horizontal' : 'x'} style={{
              width: '30px',
              height: '30px',
              margin: '0 auto',
              display: 'block',
            }}/>
          </span>
        ) : (
          <span className='unfocused-icon' style={{
            backgroundColor: currentStatus >= Confirmed ? '#1EAF82' : '#FFFFFF',
          }}>
            <Octicon name='check' style={{
              width: '20px',
              height: '20px',
              margin: '0 auto',
              display: 'block',
            }} />
          </span>
        )
      }

      <div className="tracker-line">
        <hr className='horizontal-line-tracker' />
      </div>

      {CurrentCooking
        ? (
          <span className='focused-icon' style={{
             backgroundColor: CurrentCooking ? '#1EAF82' : '#D83D3D',

          }}>
            <Octicon name={(CurrentCooking) ? 'kebab-horizontal' : 'x'} style={{
              width: '30px',
              height: '30px',
              margin: '0 auto',
              display: 'block',
            }}/>
          </span>
      ) : (
        <span className='unfocused-icon' style={{
          backgroundColor: currentStatus >= Preparing ? '#1EAF82' : '#FFFFFF',

        }}>
          <Octicon name='check' style={{
            width: '20px',
            height: '20px',
            margin: '0 auto',
            display: 'block',
          }} />
        </span>
      )
    }

    <div className="tracker-line">
      <hr className='horizontal-line-tracker' />
    </div>

    {CurrentReady || CurrentRestCancelled || OrderPickedUpForDelivery
      ? (
        <span className='focused-icon' style={{
           backgroundColor: CurrentReady || OrderPickedUpForDelivery ? '#1EAF82' : '#D83D3D',
        }}>
          <Octicon name={(CurrentRestCancelled) ? 'x' : 'kebab-horizontal' } style={{
            width: '30px',
            height: '30px',
            margin: '0 auto',
            display: 'block',
          }}/>
        </span>
      ) : (
        <span className='unfocused-icon' style={{
          backgroundColor: currentStatus >= Ready ? '#1EAF82' : '#FFFFFF',

        }}>
          <Octicon name='check' style={{
            width: '20px',
            height: '20px',
            margin: '0 auto',
            display: 'block',
          }} />
        </span>
      )
    }

    <div className="tracker-line">
      <hr className='horizontal-line-tracker' />
    </div>

    {(CurrentPickup || CurrentPickupNever || CurrentOrderCancel)
      ? (
        <span className='focused-icon' style={{
           backgroundColor: CurrentPickup ? '#1EAF82' : '#D83D3D',

        }}>
          <Octicon name={(CurrentPickup) ? 'check' : 'x' } style={{
            width: '30px',
            height: '30px',
            margin: '0 auto',
            display: 'block',
          }}/>
        </span>
      ) : (
        <span className='unfocused-icon' style={{
          backgroundColor: currentStatus >= Pickup ? '#1EAF82' : '#FFFFFF',

        }}>
          <Octicon name='check' style={{
            width: '20px',
            height: '20px',
            margin: '0 auto',
            display: 'block',
          }} />
        </span>
      )
    }
  </div>
  )
}

export default OrderTracker
