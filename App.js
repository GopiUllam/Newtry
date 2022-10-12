import React, { useEffect } from 'react'
import { View ,Text} from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

function App() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '81793487491-ls39mvelfl90hkg28u3enajiqddqeeql.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

  
  },[])
 

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log("get it")
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log("hello sure")
      console.log({userInfo})
    } catch (error) {
      console.log({error})
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  

  
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Text>hello world</Text>
       <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
        />
    </View>
  )
}

export default App





// Import React in our code
// import React, {useState, useEffect} from 'react';

// // Import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';

// // Import Google Signin
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// const App = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

//   useEffect(() => {
//     // Initial configuration
//     GoogleSignin.configure({
//       // Mandatory method to call before calling signIn()
//       scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//       // Repleace with your webClientId generated from Firebase console
//       webClientId: '81793487491-ls39mvelfl90hkg28u3enajiqddqeeql.apps.googleusercontent.com',
//     });
//     // Check if user is already signed in
//     _isSignedIn();
//   }, []);

//   const _isSignedIn = async () => {
//     const isSignedIn = await GoogleSignin.isSignedIn();
//     if (isSignedIn) {
//       alert('User is already signed in');
//       // Set User Info if user is already signed in
//       _getCurrentUserInfo();
//     } else {
//       console.log('Please Login');
//     }
//     setGettingLoginStatus(false);
//   };

//   const _getCurrentUserInfo = async () => {
//     try {
//       let info = await GoogleSignin.signInSilently();
//       console.log('User Info --> ', info);
//       setUserInfo(info);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//         alert('User has not signed in yet');
//         console.log('User has not signed in yet');
//       } else {
//         alert("Something went wrong. Unable to get user's info");
//         console.log("Something went wrong. Unable to get user's info");
//       }
//     }
//   };

//   const _signIn = async () => {
//     // It will prompt google Signin Widget
//     try {
//       await GoogleSignin.hasPlayServices({
//         // Check if device has Google Play Services installed
//         // Always resolves to true on iOS
//         showPlayServicesUpdateDialog: true,
//       });
//       const userInfo = await GoogleSignin.signIn();
//       console.log('User Info --> ', userInfo);
//       setUserInfo(userInfo);
//     } catch (error) {
//       console.log('Message', JSON.stringify(error));
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         alert('User Cancelled the Login Flow');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         alert('Signing In');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         alert('Play Services Not Available or Outdated');
//       } else {
//         alert(error.message);
//       }
//     }
//   };

//   const _signOut = async () => {
//     setGettingLoginStatus(true);
//     // Remove user session from the device.
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       // Removing user Info
//       setUserInfo(null);
//     } catch (error) {
//       console.error(error);
//     }
//     setGettingLoginStatus(false);
//   };

//   if (gettingLoginStatus) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   } else {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <View style={styles.container}>
//           <Text style={styles.titleText}>
//             Example of Google Sign In in React Native
//           </Text>
//           <View style={styles.container}>
//             {userInfo !== null ? (
//               <>
//                 <Image
//                   source={{uri: userInfo.user.photo}}
//                   style={styles.imageStyle}
//                 />
//                 <Text style={styles.text}>Name: {userInfo.user.name}</Text>
//                 <Text style={styles.text}>Email: {userInfo.user.email}</Text>
//                 <TouchableOpacity style={styles.buttonStyle} onPress={_signOut}>
//                   <Text>Logout</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <GoogleSigninButton
//                 style={{width: 312, height: 48}}
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Light}
//                 onPress={_signIn}
//               />
//             )}
//           </View>
//           <Text style={styles.footerHeading}>
//             Google SignIn in React Native
//           </Text>
//           <Text style={styles.footerText}>www.aboutreact.com</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 20,
//   },
//   imageStyle: {
//     width: 200,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width: 300,
//     marginTop: 30,
//   },
//   footerHeading: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   footerText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'grey',
//   },
// });


// import React from 'react'
// import { View ,Text} from 'react-native'
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes
// } from '@react-native-google-signin/google-signin';
// // import auth from '@react-native-firebase/auth';

// function App() {
 
//     GoogleSignin.configure({
//       scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//       webClientId: '81793487491-ls39mvelfl90hkg28u3enajiqddqeeql.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//       // hostedDomain: '', // specifies a hosted domain restriction
//       forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//       // accountName: '', // [Android] specifies an account name on the device that should be used
//       // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//       // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//       // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//       // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//     });


//   const signInWithGoogleAsync = async () => {

//     const { idToken } = await GoogleSignin.signIn();
//     console.log(idToken)
  
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
//     // Sign-in the user with the credential
//    const user_sign_in = auth().signInWithCredential(googleCredential);
//    user_sign_in.then((user) => {
//        console.log(user)
//    })
//    .catch((error) => {
//     console.log(error)
//    })
//   }
  

  

//   // const signIn = async () => {
//   //   try {
//   //     await GoogleSignin.hasPlayServices();
//   //     console.log("get it")
//   //     const userInfo = await GoogleSignin.signIn();
//   //     // this.setState({ userInfo });
//   //     console.log("hello sure")
//   //     console.log({userInfo})
//   //   } catch (error) {
//   //     console.log({error})
//   //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//   //       // user cancelled the login flow
//   //     } else if (error.code === statusCodes.IN_PROGRESS) {
//   //       // operation (e.g. sign in) is in progress already
//   //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//   //       // play services not available or outdated
//   //     } else {
//   //       // some other error happened
//   //     }
//   //   }
//   // };

//   return (
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//        <Text>hello world</Text>
//        <GoogleSigninButton
//               style={{ width: 192, height: 48 }}
//               size={GoogleSigninButton.Size.Wide}
//               color={GoogleSigninButton.Color.Dark}
//               onPress={signInWithGoogleAsync}
//         />
//     </View>
//   )
// }

// export default App