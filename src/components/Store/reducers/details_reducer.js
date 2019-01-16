import { GET_DETAILS, GET_USER_DETAILS } from '../types';


export default function(state={},action){
    switch(action.type){
        case GET_DETAILS:
            return {...state,list:action.payload}
            break;
        case GET_USER_DETAILS:
         return {...state,data:action.payload}
         break;
        default:
            return state;
    }
}
