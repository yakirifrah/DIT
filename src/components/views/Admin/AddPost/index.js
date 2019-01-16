import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { autoSingIn } from "../../../Store/actions/user_actions";
import { getTokens, setTokens, requestLocationPermission } from "../../../utils/misc";
import {  } from "../../../Store/actions/user_actions";
import {getUserData} from '../../../Store/actions/details_action';
import * as firebase from "firebase";
import {GiftedChat} from 'react-native-gifted-chat';
import Chat from './chat';

class AddPost extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      messages: [],
    }
  }

  //componentWillMount() {
    //console.log("chatttt")
    // firebase
    //   .database()
    //   .ref("details/" + this.props.User.userData.uid + "/chats/" + this.props.Details.data.uid)
    //   .on("value", snap => {
    //     var items = [];
    //     snap.forEach(child => {
    //       if (child.val().key != "user") {
    //         item = child.val();
    //         items.push(item);
    //       }
    //     });
    //     this.setState({ messages: items.reverse() });
    //   });
  
  // test = () => {
  //   console.log("1111"+this.props.Details.data.uid)
  //   console.log("2222" + this.props.User.userData.uid)

  // }

  // onSend(messages = []) {

  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }))
  //   firebase.database().ref('details/'+ this.props.User.userData.uid + '/chats/' + this.props.Details.data.uid).push(messages[0]);
  //   firebase.database().ref('details/' + this.props.Details.data.uid + '/chats/' + this.props.User.userData.uid).push(messages[0]);
  // }


//  render(){
//    return(
//      <View>
//        <Button
//        title="press"
//          onPress={this.test}/>
//      </View>
//    )
//  }




  render() {
    const chat = (this.props.Details && this.props.Details.userData)? <Chat/>: null;
    return (
      <View>
        {chat}
      </View>
    );
  }
}


//export default AddPost;

function mapStateToProps(state) {
  //console.log(state);
  return {
    User: state.User,
    Details: state.Details
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    },
     dispatch
    ); 
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
const styles = StyleSheet.create({




});
