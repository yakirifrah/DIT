import {combineReducers} from 'redux';
import User from './user_reducer'
import Details from './details_reducer';
const rootReducer = combineReducers({
  User,
  Details
});
export default rootReducer;
