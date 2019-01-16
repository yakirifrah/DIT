import {
  Dimensions,
  Platform,
  AsyncStorage,
  PermissionsAndroid
} from "react-native";

export const APIKEY = "AIzaSyBM87ijGJRlf7JfmEGSvI4whCA0mezd3t0";
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
export const FIREBASEURL = `https://test-a0cdc.firebaseio.com`;

export const getOrintation = value => {
  return Dimensions.get("window").height > value ? "portrait" : "landscape";
};

export const setOrientationListener = cb => {
  return Dimensions.addEventListener("change", cb);
};

export const removeOrientationListener = () => {
  return Dimensions.removeEventListener("change");
};

export const getPlatform = () => {
  if (Platform.OS === " ios") {
    return "ios";
  } else {
    return "android";
  }
};

export const getTokens = cb => {
  AsyncStorage.multiGet([
    "@DitApp@token",
    "@DitApp@refreshToken",
    "@DitApp@expireToken",
    "@DitApp@uid"
  ]).then(value => {
    cb(value); //all the tokens information store in the value
  });
};

export const setTokens = (values, cb) => {
  //the values is inside of redux store
  const dateNow = new Date(); //current time
  const expiration = dateNow.getTime() + 3600 * 1000; //converte to nembers and adding 1 hour in milliseconds

  AsyncStorage.multiSet([
    ["@DitApp@token", values.token],
    ["@DitApp@refreshToken", values.refToken],
    ["@DitApp@expireToken", expiration.toString()],
    ["@DitApp@uid", values.uid]
  ]).then(response => {
    cb(); //this cb function refer to the function from geting of cb setTokens func from manageAccess in loginForm
  });
};

export async function requestLocationPermission() {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("You can use the ACCESS_FINE_LOCATION");
  } else {
    console.log("ACCESS_FINE_LOCATION permission denied");
  }
}

export const gridTwoColumns = (list) => {
  //console.log("list:"+list);
  let newDetails = [];
  let details = list;

  let count = 1;
  let vessel = {};


  details.forEach(element => {
    vessel["blockOne"] = element;
    newDetails.push(vessel);
    vessel = {};
  });
  return newDetails;
}

export const setTokensLogout = (values, cb) => { //the values is inside of redux store
  const dateNow = new Date();//current time
  const expiration = dateNow.getTime() + (1 * 1000)//converte to nembers and adding 1 hour in milliseconds

  AsyncStorage.multiSet([
    ['@DitApp@token', ""],
    ['@DitApp@refreshToken', ""],
    ['@DitApp@expireToken', ""],
    ['@DitApp@uid', ""],
  ]).then(response => {
    cb();//this cb function refer to the function from geting of cb setTokens func from manageAccess in loginForm 
  })
}