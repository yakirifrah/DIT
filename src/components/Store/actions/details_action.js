import { GET_DETAILS, GET_USER_DETAILS } from "../types";
import axios from "axios";
import { FIREBASEURL } from "../../utils/misc";
import firebase from "firebase";

export function getDetails(uid, activityType, userGeocode) {
  let URL = `https://test-a0cdc.firebaseio.com/details.json`;
  if (activityType !== "All") {
    URL = `${URL}/?orderBy=\"activity_type\"&equalTo=\"${activityType}\"`;
  }


  const request = axios(URL).then(response => {
    const details = [];
    console.log(`uid: ${uid}`)
    for (let key in response.data) {
      console.log(response.data)
      console.log(key)
        const otherGeocode = response.data[key].geocode;
        if (key != uid && (otherGeocode === userGeocode) || (otherGeocode === response.data[uid].geocode)) {
          ///if (response.data[key].activity_type === response.data[uid].activity_type) {
          details.push({
            ...response.data[key]
            //id:key
          });
          //}
        }
    }
    return details;
  });

  return {
    type: GET_DETAILS,
    payload: request
  };
}



export  function getUserData(data){
 //console.log("11"+data.uid)


  return {
    type: GET_USER_DETAILS,
    payload: data
  };


} 


