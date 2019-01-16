import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  ScrollView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { autoSingIn } from "../../../Store/actions/user_actions";
import {
  getTokens,
  setTokens,
  requestLocationPermission
} from "../../../utils/misc";
import { getUserData } from "../../../Store/actions/details_action";
import * as firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.user = this.props.User.userData.uid;
    const params = [];
    parmas = this.props.Details.data;
    uidFraind = parmas.uid;
    nameFraind = params.fullName;

    this.chatRef = this.getRef().child("chat/" + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild("order");
    this.onSend = this.onSend.bind(this);
  }

  generateChatId() {
    if (this.user > uidFraind) return `${this.user}-${uidFraind}`;
    else return `${uidFraind}-${this.user}`;
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(chatRef) {
    console.log("333" + uidFraind);
    console.log("uid" + this.user);
    chatRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid
          }
        });
      });

      this.setState({
        messages: items
      });
    });
  }
  componentDidMount() {
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
    this.chatRefData.off();
  }

  onSend(messages = []) {
    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
    messages.forEach(message => {
      var now = new Date().getTime();
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user,
        order: -1 * now
      });
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.user.uid
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    User: state.User,
    Details: state.Details
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
const styles = StyleSheet.create({});
