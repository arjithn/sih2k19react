// import { GoogleSignin, statusCodes } from 'react-native-google-signin'
// import { Alert } from 'react-native'
//
// export const _configureGoogleSignIn = () => {
//   GoogleSignin.configure({
//     webClientId: '872808981325-r06ifujv68rqk2hjt138jruj4c12evgr.apps.googleusercontent.com',
//     offlineAccess: false,
//   })
// }
//
// export const signIn = async () => {
//   let userInfo
//   try {
//     await GoogleSignin.hasPlayServices()
//     userInfo = await GoogleSignin.signIn()
//     return userInfo
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // sign in was cancelled
//       // Alert.alert('Login was cancelled')  // It's looks little odd
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       Alert.alert('play services not available or outdated')
//     } else {
//       Alert.alert('Something went wrong', error.toString())
//     }
//     return { hasError: true, ...error }
//   }
// }
//
// export const signOut = async () => {
//   await GoogleSignin.revokeAccess()
//   await GoogleSignin.signOut()
// }
//
// export const getCurrentUser = async () => {
//   try {
//     const userInfo = await GoogleSignin.signInSilently()
//     return userInfo
//   } catch (error) {
//     Alert.alert('Something went wrong', error.toString())
//     return { hasError: true, ...error }
//   }
// }
