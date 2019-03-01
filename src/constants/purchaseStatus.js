/**
 * ENUM Values for Purchase Statuses
 */

/**
 * Represents the initial state wherein the purchase is actively used by customers.
 * There are open orders, items being added to cart and has not been paid out.
 *  Not closed or checked out as yet.
 */
export const OPEN = 'OPEN'

/**
 * Represents the state that customers has completed all ordering & is pending payment
 */
export const PENDING_PAYMENT = 'PENDING_PAYMENT'

/**
 * Payment Completed
 */
export const PAYMENT_COMPLETED = 'PAYMENT_COMPLETED'

export const CLOSED_SUCCESS = 'CLOSED_SUCCESS'

/**
 * Closed due to other reasons, like customer went away or something
 */
export const CLOSED_OTHER = 'CLOSED_OTHER'
