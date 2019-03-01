/* eslint-disable no-constant-condition */
import React from "react";

import {
  take,
  put,
  call,
  fork,
  all,
  takeEvery,
  select,
  takeLatest,
  cancel,
  delay
} from "redux-saga/effects";

import { Alert } from "reactstrap";
// import { delay } from 'redux-saga'
import { schema, normalize } from "normalizr";
import { GoogleLogin } from "react-google-login";

import {
  lassiAPIClient as api,
  flaskAPIClient as flapi,
  googleAPIClient as google,
  facebookAPIClient as facebook,
  razorpayAPIClient as razorpay
} from "../services";
import * as actions from "../actions";
import * as ActionTypes from "../constants/actionTypes";
import {
  getPreferences,
  getPurchaseId,
  getCartItemsList,
  getCustomerId,
  getCustomerDetails,
  getCurrentPage,
  getDeviceId,
  getCustomerPhone,
  getLoggedInStatus,
  getBillId
} from "../selectors";
import { convertToPaiseString } from "../utils/textUtils";
import { Route, Redirect } from "react-router-dom";
import { BrightDarkgreen } from "../utils/colors";

/**
 * Later when implementing cache, selectors need to be imported
 * To find determine cache age limit crossed criteria
 */

// each entity defines 3 creators { request, success, failure }

const { institutions } = actions;

/** *************************** Subroutines *********************************** */
// resuable fetch Subroutine
// entity :  user | foodcourts | QSRs/restaurants | stalls | categories | items
// apiFn  : api.fetchStallsByGroupId | api.fetchRepo | ...
// id     : restaurantGroupId | restaurantId | login

let stopFetchingOrders = false;

function* fetchEntity(entity, apiFn, id, page = undefined) {
  yield put(entity.request(id));
  const { response, error } = yield page
    ? call(apiFn, id, page)
    : call(apiFn, id);
  if (response) yield put(entity.success(id, response));
  else yield put(entity.failure(id, error));
}

// binding Generators
// export const fetchFoodcourts = fetchEntity.bind(
//   null,
//   foodCourts,
//   api.fetchAllFoodCourts
// );

// load stalls unless it is cached
function* submitPreferencesForRanking() {
  const selectedPreference = yield select(getPreferences);
  const response = yield call(
    flapi.fetchRankingForEntityBasedOnPref,
    selectedPreference
  );
  if (response) yield put(institutions.success(response));
  console.log(response);
}

function* loginUser3rdParty(action) {
  const purchaseId = yield select(getPurchaseId);
  if (action.provider === "google") {
    const { response } = yield call(api.registerNewCustomer, {
      email: action.response.profileObj.email,
      authToken: action.response.tokenObj.access_token,
      provider: "google"
    });
    const newUserDetails = {
      customerId: response.customerId,
      fullName: action.response.profileObj.name,
      email: action.response.profileObj.email,
      profilePic: action.response.profileObj.imageUrl,
      birthday: "04/04/1996"
    };
    const customerDetails = yield call(api.updateCustomerDetails, {
      customerId: response.customerId,
      customerDetails: newUserDetails
    });
    if (purchaseId) {
      yield call(api.updatePurchaseAttr, {
        purchaseId,
        updateAttr: "customerId",
        updateValue: response.customerId
      });
    }
    yield put({
      type: ActionTypes.GOOGLE_LOGIN_SUCCESS,
      customerDetails,
      provider: action.provider,
      idToken: action.response.tokenObj.id_token
    });
    yield call(customerPhoneConfirm);
    yield put({ type: ActionTypes.SOCIAL_LOGIN_SUCCESS });
    stopFetchingOrders = false;
  } else if (action.provider === "facebook") {
    // const { token, user } = yield call(facebook.getTokenAndDetails)
    // Need to work on this
    if (action.response.id) {
      const { response } = yield call(api.registerNewCustomer, {
        email: action.response.email,
        authToken: action.response.accessToken,
        provider: "facebook"
      });
      // const playerID = yield select(getDeviceId)
      const newUserDetails = {
        customerId: response.customerId,
        fullName: action.response.name,
        email: action.response.email,
        profilePic: action.response.picture.data.url,
        birthday: "04/04/1996"
      };
      const customerDetails = yield call(api.updateCustomerDetails, {
        customerId: response.customerId,
        customerDetails: newUserDetails
      });
      if (purchaseId) {
        yield call(api.updatePurchaseAttr, {
          purchaseId,
          updateAttr: "customerId",
          updateValue: response.customerId
        });
      }
      yield put({
        type: ActionTypes.GOOGLE_LOGIN_SUCCESS,
        customerDetails,
        provider: action.provider,
        idToken: action.response.id
      });
      yield call(customerPhoneConfirm);
      yield put({ type: ActionTypes.SOCIAL_LOGIN_SUCCESS });
      stopFetchingOrders = true;
    }
  }
  yield call(fetchPurchase, purchaseId);
}
function* logout3rdParty(action) {
  // TODO:  convert to switch case once twitter is added
  if (action.provider === "google") {
    yield call(google.signOut);
    stopFetchingOrders = true;
  } else if (action.provider === "facebook") {
    yield call(facebook.signOut);
    stopFetchingOrders = false;
  }
}
function* customerLoginConfirm() {
  let customerId = yield select(getLoggedInStatus);
  if (!customerId) {
    NavigationService.navigate("Auth");
    while (!customerId) {
      yield take();
      customerId = yield select(getLoggedInStatus);
    }
  }
}

/** *************************************************************************** */
/** ***************************** WATCHERS ************************************ */
/** *************************************************************************** */

function* watchInstitutionsRequest() {
  yield takeEvery(ActionTypes.REQUEST_RANKING, submitPreferencesForRanking);
}

export default function* root() {
  yield all([fork(watchInstitutionsRequest)]);
}
