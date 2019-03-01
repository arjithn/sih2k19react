// import { LoginManager, AccessToken } from 'react-native-fbsdk'
// // import { Alert } from 'react-native'
//
// export const getTokenAndDetails = async () => {
//   const { isCancelled } = await LoginManager.logInWithReadPermissions([
//     'public_profile',
//     'email',
//   ])
//
//   if (!isCancelled) {
//     const data = await AccessToken.getCurrentAccessToken()
//     const token = data.accessToken.toString()
//     const user = await afterLoginComplete(token)
//     return {
//       token,
//       user,
//     }
//   }
//   // Alert.alert('Login was cancelled') // It's looks little odd
//   return { hasError: true, error: 'Something Wrong Happened', email: '' }
// }
//
// const afterLoginComplete = async (token) => {
//   const response = await fetch(
//     `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`,
//   )
//   const result = await response.json()
//   return result
// }
//
// export const signOut = async () => {
//   await LoginManager.logOut()
// }
