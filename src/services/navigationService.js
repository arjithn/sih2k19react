// import { NavigationActions, StackActions } from 'react-navigation'
//
// let _navigator
//
// function setTopLevelNavigator(navigatorRef) {
//   _navigator = navigatorRef
// }
//
// function navigate(routeName, params) {
//   _navigator.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params,
//     }),
//   )
// }
//
// function reset(routeName) {
//   const navigateAction = StackActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName })],
//   })
//   _navigator.dispatch(navigateAction)
// }
// // add other navigation functions that you need and export them
//
// export default {
//   reset,
//   navigate,
//   setTopLevelNavigator,
// }
