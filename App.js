import { Navigation } from 'react-native-navigation';
import ConfigureStore from './src/components/Store/config'
import {Provider} from 'react-redux';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import AddPost from './src/components/views/Admin/AddPost';
import Chat from './src/components//views/Admin/AddPost/chat';
import Profile from './src/components/views/Profile';
import firebaseConfig from './src/components/config/firebase';
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;
const store =  ConfigureStore();


Navigation.registerComponent(
  "Dit.Login",
  ()=>
  Login,
  store,
  Provider
); 

Navigation.registerComponent(
  "Dit.Home",
  ()=>
  Home,
  store,
  Provider
);

Navigation.registerComponent(
"Dit.AddPost",
()=>
AddPost,
store,
Provider
); 


Navigation.registerComponent(
  "Dit.Profile",
  () =>
  Profile,
  store,
  Provider
); 

Navigation.registerComponent(
  "Dit.Chat",
  () =>
  Chat,
  store,
  Provider
); 



export default ()=> Navigation.startSingleScreenApp({
  screen:{
    screen:"Dit.Login",
    title:"Login",
    navigatorStyle:{
      navBarHidden:true,
      navBarComponentAlignment: 'center'

    }
  }
})