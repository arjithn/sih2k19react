import * as lassiClient from "./lassiClient";
import * as googleClient from "./googleLoginService";
import * as facebookClient from "./facebookLoginService";
import * as razorpayClient from "./razorpayPaymentService";
import * as flaskClient from "./flaskClient";
import navigationServiceClient from "./navigationService";
import mockApi from "./mockApi";

export const lassiAPIClient = lassiClient;
export const flaskAPIClient = flaskClient;
export const googleAPIClient = googleClient;
export const facebookAPIClient = facebookClient;
export const mockAPIClient = mockApi;
export const razorpayAPIClient = razorpayClient;
export const navigationService = navigationServiceClient;
