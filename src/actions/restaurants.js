import { FETCH_STALLS, FETCH_FOODCOURTS, FETCH_RESTAURANTS } from '../constants/actionTypes'

export const loadFoodCourtsList = () => ({
  type: FETCH_FOODCOURTS,
})
export const loadRestaurantsList = () => ({
  type: FETCH_RESTAURANTS,
})
export const loadStallsList = foodCourtId => ({
  type: FETCH_STALLS,
  payload: {
    foodCourtId,
  },
})
