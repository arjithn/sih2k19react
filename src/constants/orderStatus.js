/**
 * ENUM Values for Order Statuses
 */

/**
 * This is the open order that is still in CART
 * And items are still being added
 */
export const CART = 'CART'

/**
 * Order has been confirmed by the customer
 * Or the waiter and is pending KOT printing
 */
export const CONFIRMED = 'CONFIRMED'

/**
 * KOT has been printed and need to be picked up by chef for cooking.
 * We don't print partial KOTs that all items in the order are printed KOT at the same time
 */

export const KOT_PRINTED = 'KOT_PRINTED'

/**
 * Chef has picked up for cooking.
 * This state is not possible unless we also have KDS, but adding for future use.
 * Even if one of the order item is "IN_COOKING" state then we can mark the order as this state.
 */

export const IN_COOKING = 'IN_COOKING'

/**
 * If all the items in the order has been fulfilled
 * Or served, then order status will become fulfilled.
 */

export const FULFILLED = 'FULFILLED'

/**
 * The order moves to CLOSED status immediately after fulfilled state
 * Or when the customer creates another new order / adds a new item to new order
 */

export const CLOSED_SUCCESS = 'CLOSED_SUCCESS'

/**
 * order is closed if customer or waiter cancels the order
 * And all items on the order
 */

export const CLOSED_OTHER = 'CLOSED_OTHER'
