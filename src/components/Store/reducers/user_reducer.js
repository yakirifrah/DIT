import {
  REGISTER_USER,
  SIGN_USER,
  AUTO_SIGN_IN,
  EDIT_INORMATION,
  RESET_INFORMATION,
  GET_LOCATION,
  SET_IMAGE_URL,
 AUTH_REMOVE_TOKEN
} from "../types";


export default function (state = {}, action) {
    switch (action.type) {
        case SIGN_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
            break;
        case REGISTER_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
            break;
        case AUTO_SIGN_IN:
            return {
                ...state,
                userData: {
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false
                }
            }
            break;
        case EDIT_INORMATION:
            return { ...state, dataSuccess: action.payload }
            break;
        case RESET_INFORMATION:
            return { ...state, newInormation: action.payload }
            break;
        case GET_LOCATION:
            return {...state, currentLoction:action.payload}
            break;
        case SET_IMAGE_URL:
        return {...state,newImage:action.payload}
            break;
        break;
        default:
            return state
    }
}