
import {
  REGISTER_USER,
  SIGN_USER,
  AUTO_SIGN_IN,
  RESET_INFORMATION,
  EDIT_INORMATION,
  GET_LOCATION,
  SET_IMAGE_URL
} from "../types";
import { AsyncStorage } from 'react-native';
import axios from "axios";
import { SIGNUP, SIGNIN, REFRESH, FIREBASEURL } from "../../utils/misc";
import firebase from "firebase";
import geohash from "latlon-geohash";
import App from '../../../../App'
export function signIn(data) {
  const request = axios({
    method: "POST",
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Contact-Type": "application/json"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGN_USER,
    payload: request
  };
}

export function signUp(data) {
  const request = axios({
    method: "POST",
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Contact-Type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function autoSignIn(refToken) {
  const request = axios({
    method: "POST",
    url: REFRESH,
    data: "grant_type=refresh_token&refresh_token=" + refToken,
    headers: {
      "Contact-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
}

export function EditInformation(data, token) {
  //     //console.log("data ed"+data.uid)
  //     //console.log("token ed"+token)
  const request = axios({
    method: "PATCH",
    url: `https://test-a0cdc.firebaseio.com/details/${data.uid}.json?auth=${token}`,
    data
  }).then(response => {
    return response.data;
  });
  return {
    type: EDIT_INORMATION,
    payload: request
  };

  //var uid = data.uid;
  //firebase.database().ref(`/users/${uid}/`).update({ data })
}

export function setImageUrl () {
  console.log("imageee")
}

export function getLocation(uid, currentLocation) {
  //console.log("____Uid");
  navigator.geolocation.getCurrentPosition(
    position => {
      (currentLocation.latitude = position.coords.latitude),
        (currentLocation.longitude = position.coords.longitude);
    },
    error => {
      currentLocation.error = error.message;
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  ).then(()=> {
    setTimeout(() => {

      var geocode = geohash.encode(
        currentLocation.latitude,
        currentLocation.longitude,
        4
      );
      data = { geocode }
      //console.log("geocode:" + geocode);
      const request = axios({
        method: "PATCH",
        url: `https://test-a0cdc.firebaseio.com/details/${uid}.json`,
        data
      }).then(response => {
        return response.data;
      });
    }, 850);
  });

  

  // var geocode = geohash.encode(
  //   currentLocation.latitude,
  //   currentLocation.longitude,
  //   4
  // );
  //   data = { geocode}
  // console.log("geocode:" + geocode);
  //   const request = axios({
  //       method: "PATCH",
  //     url: `https://test-a0cdc.firebaseio.com/details/${uid}.json`,
  //       data
  //   }).then(response => {
  //       return response.data;
  //   });
    return {
        type: GET_LOCATION,
        payload: request
    };
}



export function resetInofmation() {
  return {
    type: RESET_INFORMATION,
    payload: "" 
  };
}

