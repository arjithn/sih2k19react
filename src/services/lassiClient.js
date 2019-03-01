import { camelizeKeys } from 'humps'
import { schema, normalize } from 'normalizr'


const API_ROOT = process.env.RN_LASSI_API_BASE_URL

const callPostApi = async (endpoint, payload) => {
  try {
    const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint
    const rawResponse = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const content = await rawResponse.json()
    return content
  } catch (e) {
    return { error: e.message || 'something bad happened' }
  }
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, schema) => {
  const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
        return Promise.reject(json)
      }
      if (schema !== undefined) {
        const excludePickupPoints = fullUrl.includes('get-pickup-points')
        if (excludePickupPoints) {
          return Object.assign({}, normalize(json, schema))
        }
        const camelizedJson = camelizeKeys(json)
        return Object.assign({}, normalize(camelizedJson, schema))
      }
      return json
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' }),
    )
}

// Schemas for Menu API responses.
const FcAndRestSchema = new schema.Entity('fcandres', {}, { idAttribute: 'groupId' })
const FcAndRestSchemaArray = new schema.Array(FcAndRestSchema)
const stallSchema = new schema.Entity('stalls', {}, { idAttribute: 'restaurantId' })
const stallSchemaArray = new schema.Array(stallSchema)
const bannerSchema = new schema.Entity('banners', {}, { idAttribute: 'bannerImageId' })
const bannerSchemaArray = new schema.Array(bannerSchema)
const foodcourtBannerSchema = new schema.Entity('foodcourtBanners', {}, { idAttribute: 'bannerImageId' })
const foodcourtBannerSchemaArray = new schema.Array(foodcourtBannerSchema)
const category = new schema.Entity('categories', {}, { idAttribute: 'name' })
const arrayOfCategories = new schema.Array(category)
const itemsSchema = new schema.Entity('items', {}, { idAttribute: 'itemId' })
const arrayOfItems = new schema.Array(itemsSchema)
const orderSchema = new schema.Entity('orders', {}, { idAttribute: 'purchaseId' })
const arrayOforders = new schema.Array(orderSchema)
const pptsSchema = new schema.Entity('ppts', {})
const arrayOfPpts = new schema.Array(pptsSchema)
const purchaseSchema = new schema.Entity('purchase', {}, { idAttribute: 'purchaseId' })

// Menu api services
export const fetchFcAndRestByLocation = locDetails => callApi(`restaurants/get-by-loc&lat=${locDetails.lat}&long=${locDetails.lng}`, FcAndRestSchemaArray)
export const fetchAllFoodCourts = () => callApi(`restaurants/get-active-food-court&city=chennai`, FcAndRestSchemaArray)

export const fetchStallsByGroupId = groupId => callApi(`restaurants/get-by-group&restaurantGroupId=${groupId}`, stallSchemaArray)
export const fetchBannersById = Id => callApi(
  `banner-images/get-banner-images&restaurantId=${Id}&appSection=dashboard`,
  bannerSchemaArray,
)
export const fetchFoodcourtBannersById = Id => callApi(
  `restaurants/get-banner-img-for-group&groupId=${Id}`,
  foodcourtBannerSchemaArray,
)
// restaurants/get-banner-img-for-group&groupId=1
export const fetchCategories = restaurantId => callApi(`item-details/get-categories&restaurantId=${restaurantId}`, arrayOfCategories)
export const fetchCategoriesWithImages = restaurantId => callApi(`item-details/get-categories-with-images&restaurantId=${restaurantId}`, arrayOfCategories)
export const fetchItemsPaginated = (restaurantId, page) => callApi(`item-details/get-items&restaurantId=${restaurantId}&pageNum=${page}`, arrayOfItems)
export const fetchItemsByCategoryPaginated = (restaurantId, page, category) => callApi(
  `item-details/get-items&restaurantId=${restaurantId}&pageNum=${page}&category=${category}`,
  arrayOfItems,
)

export const updatePickupPointDetails = ({ purchaseId, pickupPointId }) => callApi(
  `purchase/set-delivery&purchaseId=${purchaseId}&pickup=${pickupPointId}`,
)


// Order api services
export const updatePurchaseAttr = ({ purchaseId, updateAttr, updateValue }) => callApi(
  `purchase/update-purchase&purchaseId=${purchaseId}&updateAttr=${updateAttr}&updateValue=${updateValue}`,
)
export const updateOrderAttr = ({
  purchaseId, orderId, restaurantId, updateAttr, updateValue,
}) => callApi(
  `purchase/update-order&restaurantId=${restaurantId}&purchaseId=${purchaseId}&orderId=${orderId}&updateAttr=${updateAttr}&updateValue=${updateValue}`,
)
export const fetchPurchaseDetails = purchaseId => callApi(`purchase/get-by-purchase-id&purchaseId=${purchaseId}`, purchaseSchema)
export const initiatePurchaseByAddItem = ({ restaurantId, itemId, customerId }) => callApi(
  `purchase/initiate-by-item-add&restaurantId=${restaurantId}&itemId=${itemId}&customerId=${customerId}`,
)
export const addNewItemToExistingPurchase = ({
  purchaseId, restaurantId, itemId, customerId,
}) => callApi(
  `purchase/add-item&restaurantId=${restaurantId}&purchaseId=${purchaseId}&itemId=${itemId}&customerId=${customerId}`,
)
export const removeExistingItemFromPurchase = ({ purchaseId, orderItemId }) => callApi(`purchase/delete-item&purchaseId=${purchaseId}&orderItemId=${orderItemId}`)
export const updateQuantityForExistingCartItem = ({ value, purchaseId, orderItemId }) => callApi(
  `purchase/update-item&purchaseId=${purchaseId}&orderItemId=${orderItemId}&updateAttr=qty&updateValue=${value}`,
)
export const fetchPickupPoints = restaurantGroupId => callApi(`purchase/get-pickup-points&restaurantGroupId=${restaurantGroupId}`, pptsSchema)
export const fetchOpenCustomerOrders = customerId => callApi(`customer/get-orders&customerId=${customerId}&ordrStatus=CURRENT`, arrayOforders)
export const fetchClosedCustomerOrders = customerId => callApi(`customer/get-orders&customerId=${customerId}&ordrStatus=PAST`, arrayOforders)
export const confirmPurchasePayment = ({ purchaseId, proofOfPay }) => callPostApi(`purchase/confirm-payments&purchaseId=${purchaseId}`, proofOfPay)
export const updatePickupParcelPreference = ({ purchaseId, parcel }) => callApi(
  `purchase/set-pickup&purchaseId=${purchaseId}&isParcel=${parcel}`,
)
export const generateBill = purchaseId => callApi(`purchase/get-bill&purchaseId=${purchaseId}`)
export const initiatePayment = purchaseId => callApi(`purchase/initiate-payment&purchaseId=${purchaseId}`, purchaseSchema)
// Customer Api services
export const registerNewCustomer = ({ email, authToken, provider }) => callApi(`customer/login-register&email=${email}&authToken=${authToken}&authOrigin=${provider}`)
export const updateCustomerDetails = ({ customerId, customerDetails }) => callPostApi(`customer/update-login-details&customerId=${customerId}`, customerDetails)
export const updateCustomerPhoneDetails = ({ customerId, phone }) => callApi(`customer/update-phone&customerId=${customerId}&phone=${phone}`)
export const verifyCustomerPhoneDetails = ({ customerId, otp }) => callApi(`customer/verify-phone&customerId=${customerId}&otp=${otp}`)
