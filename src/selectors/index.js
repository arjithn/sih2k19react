export const getEntitiesAsList = state =>
  state.allIds.map(id => state.byId[id]);

export const getlocationDetails = state => state.currentLocation;
export const getPreferences = state => state.preferences;

export const getCurrentPage = (state, entity) => state[entity].page;
export const getMenuItemsAsList = state => {
  const filters = state.items.filters.filterBy;
  return Object.keys(state.items.filters.filterBy)
    .reduce(
      (filteredListOfIds, key) =>
        filteredListOfIds.filter(
          i => state.items.byId[i][key] === filters[key]
        ),
      state.items.allIds
    )
    .map(id => ({ ...state.items.byId[id], ...isItemInCart(state, id) }));
  // .sort(sortBy('primaryCategory'))
};
export const getFetchingStatus = state => state.isFetching;
export const getPurchaseId = state => state.purchase.purchaseId || null;
export const getBillId = state => state.purchase.billPaymentId || null;
export const getPurchaseDetails = state =>
  state.purchase.purchaseDetails || null;
export const getCustomerId = state =>
  state.user.customerId !== undefined ? state.user.customerId : null;
export const getLoggedInStatus = state => state.user.isLoggedIn;
export const getCustomerPhone = state => state.user.userDetails.phone || null;
export const getCustomerDetails = state => state.user.userDetails || null;
export const getCustomerLoginStatus = state => state.user.isLoggedIn;
export const getDeviceId = state => state.device || null;
export const getpickupPointName = state =>
  state.purchase.purchaseDetails
    ? state.purchase.purchaseDetails.pickupPointName || null
    : null;
export const getrestaurantGroupId = state =>
  state.purchase.purchaseDetails
    ? state.purchase.purchaseDetails.restaurantGroupId || null
    : null;

export const getisDeliveryServiceAvailable = state =>
  state.purchase.purchaseDetails
    ? state.purchase.purchaseDetails.isDeliveryServiceAvailable || null
    : null;

export const getCartOrders = state => {
  if (!state.purchase.purchaseDetails) return [];
  const { orders } = state.purchase.purchaseDetails;
  const ordersAsList = Object.keys(orders).map(item => orders[item]);
  return ordersAsList.filter(item => item.orderItems.length !== 0);
};

export const getPickupPoints = state => state.ppts.byId || null;

export const getItemCount = state => {
  if (!state.purchase.purchaseDetails) return [0, 0];
  const { itemCount, orderCount } = state.purchase.purchaseDetails;
  return [itemCount, orderCount];
};

export const getTaxDetails = state => {
  if (!state.purchase.purchaseDetails) return {};
  const { taxSplitDetails } = state.purchase.purchaseDetails;
  return taxSplitDetails;
};

export const getCartItemsListByRest = state => {
  if (!state.purchase.purchaseDetails) return [];
  const { orders } = state.purchase.purchaseDetails;
  const ordersAsList = Object.keys(orders).map(item => orders[item]);
  const orderItemsByRest = ordersAsList
    .filter(item => item.orderStatus === "CART")
    .map(item => ({
      [item.restaurantName]: Object.values(item.orderItems)
    }));
  const cartItemsListByRest = [].concat(...orderItemsByRest);
  return cartItemsListByRest;
};

export const getCartItemsList = state => {
  if (!state.purchase.purchaseDetails) return [];
  const { orders } = state.purchase.purchaseDetails;
  const ordersAsList = Object.keys(orders).map(item => orders[item]);
  const orderItems = ordersAsList
    .filter(item => item.orderStatus === "CART")
    .map(item => item.orderItems);
  const orderItemsAsList = orderItems.map(item => Object.values(item));
  const cartItemsList = [].concat(...orderItemsAsList);
  return cartItemsList;
};

export const getCartOrderItemId = (state, itemId) => {
  const cartItemsList = getEntitiesAsList(state.cart);
  const cartOrderElement = cartItemsList.find(item => item.itemId === itemId);
  return cartOrderElement || null;
};

export const getOrderItemList = (state, status) => {
  if (status === "open") {
    return state.open;
  }
  if (status === "closed") {
    return state.closed;
  }
  return null;
};

export const isItemInCart = (state, itemId) => {
  const orderItem = getCartOrderItemId(state, itemId);
  if (orderItem) {
    const { itemQuantity, orderItemId } = orderItem;
    return { inCart: true, itemQuantity, orderItemId };
  }
  return { inCart: false };
};
export const getPurchaseCouponDetails = state => {
  if (state.purchase.purchaseDetails)
    return state.purchase.purchaseDetails.couponDetails;
  return {};
};

export const getCartSummary = state => {
  if (state.purchase.purchaseDetails !== null) {
    const {
      totalPurchaseAmount,
      totalSavings,
      totalTaxAmount,
      totalDiscountedOrderAmount,
      totalParcelCharge,
      discountedPurchaseTotal,
      deliveryChargeDetails,
      calculatedPurchaseTotal,
      totalOrderAmount,
      totalDeliveryCharge
    } = state.purchase.purchaseDetails;
    return {
      extraFee: 0,
      totalPurchaseAmount,
      totalSavings,
      totalTaxAmount,
      totalParcelCharge,
      totalDiscountedOrderAmount,
      discountedPurchaseTotal,
      deliveryChargeDetails,
      calculatedPurchaseTotal,
      totalOrderAmount,
      totalDeliveryCharge
    };
  }
  return {
    extraFee: 0,
    totalPurchaseAmount: null,
    totalSavings: null,
    totalTaxAmount: null,
    totalDiscountedOrderAmount: null,
    discountedPurchaseTotal: null,
    deliveryChargeDetails: null,
    calculatedPurchaseTotal: null,
    totalOrderAmount: null,
    totalDeliveryCharge: null
  };
};
