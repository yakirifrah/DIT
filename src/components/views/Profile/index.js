import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal
} from "react-native";
import {
  EditInformation,
  resetInofmation,
  setImageUrl,
  getLocation,
  authRemoveToken
} from "../../Store/actions/user_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { autoSignIn } from "../../Store/actions/user_actions";
import { getTokens, setTokens, requestLocationPermission, setTokensLogout } from "../../utils/misc";
import Input from "../../utils/forms/inputs";
import validationRules from "../../utils/forms/validationRules";
import PickImage from "../../utils/PickImage/PickImage";
import firebase from 'firebase';
import App from '../../../../App';

class Profile extends Component {
  constructor(props) {
    super(props);
    //this.onButtonPress = this.onButtonPress.bind(this);

  }
  componentDidMount() {
    requestLocationPermission();
    // console.log("enter")

  }

  state = {
    loading: false,
    hasErrorrs: false,
    modalVisibale: false,
    modalSuccess: false,
    errorsArray: [],
    value: {},
    currentLocation: {
      latitude: null,
      longitude: null,
      error: null,
    },
    form: {
      activity_type: {
        value: "",
        name: "activity_type",
        valid: false,
        type: "picker",
        options: [
          "",
          "Ballet",
          "Bicycling",
          "Boxing",
          "Crossfit",
          "Football",
          "Gym",
          "Run",
          "Swim",
          "Skating",
          "Surfing",
          "Tennis",
          "Walking",
          "Yoga"
        ],
        rules: {
          isReqired: true
        },
        errorMsg: "You need to select a category"
      },
      fullName: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isReqired: true
        },
        errorMsg: "You need to write the full name "
            },
      ageUser: {
        value: "",
        name: "ageUser",
        valid: false,
        type: "picker",
        options: [
          "",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "80",
          "81",
          "82",
          "83",
          "84",
          "85",
          "86",
          "87",
          "88",
          "89",
          "90",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99"
        ],
        rules: {
          isReqired: true
        },
        errorMsg: "You need to select an age"
      },
      genderUser: {
        value: "",
        name: "genderUser",
        valid: false,
        type: "picker",
        options: ["", "Male", "Female"],
        errorMsg: "You need to select your gender",
        rules: {
          isReqired: true
        }
      },

      maximumDistanse: {
        value: "",
        name: "maximumDistanse",
        valid: false,
        type: "picker",
        options: ["", "1km-25km", "25km-50km"],
        errorMsg: "You need to select your maximun distance",
        rules: {
          isReqired: true
        },
      }
      

    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrorrs: false
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;
    let rules = formCopy[name].rules;
    let valid = validationRules(value, rules, formCopy);
    formCopy[name].valid = valid;
    // console.log(valid);
    this.setState({
      form: formCopy
    });
  };
   logOut = () => {
    // console.log("logout")
    setTokensLogout(this.props.User.userData, () => {
      App();
    })
  }

  EditInformation = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }
    if (isFormValid) {
      // console.log(dataToSubmit);
      this.setState({
        loading: true
      });
      getTokens(value => {
        //console.log(value)
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: value[3][1]
        };
        //console.log("111111111" + form.uid)

        if (expiration > value[2][1]) {
          //console.log("logout")
          this.props.autoSignIn(value[1][1])
          .then(() => {
            setTokens(this.props.User.userData, () => {
              this.props
                .EditInformation(form, this.props.User.userData.token)
                .then(() => getTokens(value => {
                  this.props.getLocation(value[3][1], this.state.currentLocation);
                }))
                .then(() => {
                  this.setState({ modalSuccess: true });
                });
            });
          });
        } else {
          // console.log("post the information");
          //console.log("value:"+value[0][1])
          this.props.EditInformation(form, value[0][1])
          .then(()=> 
              getTokens(value => {
                this.props.getLocation(value[3][1], this.state.currentLocation);
          }))
          .then(() => {
            this.setState({ modalSuccess: true });
          });
        }
      });
    } else {
      var errorsArray = [];
      for (let key in formCopy) {
        if (!formCopy[key].valid) {
          errorsArray.push(formCopy[key].errorMsg);
        }
      }
      this.setState({
        modalSuccess: false,
        loading: false,
        hasErrorrs: true,
        modalVisibale: true,
        errorsArray
      });
    }
  };
  showErrorsArray = errors =>
    errors
      ? errors.map((item, i) => (
          <Text key={i} style={styles.errorItem}>
            -{item}
          </Text>
        ))
      : null;

  resetInofmation = () => {
    const formCopy = this.state.form;
    for (let key in formCopy) {
      formCopy[key].valid = false;
      //formCopy[key].value = "";
    }
    this.setState({
      modalSuccess: false,
      hasErrors: false,
      errorsArray: [],
      loading: false
    });

    //this.props.resetInofmation();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <Text style={styles.mainTitle}>Information</Text> */}
          </View>
          <View>
            <PickImage />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              type={this.state.form.fullName.type}
              value={this.state.form.fullName.value}
              onChangeText={value => this.updateInput("fullName", value)}
              autoFocus={true}
              autoCapitalize="words"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Select youre gender</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select youre gender"
                type={this.state.form.genderUser.type}
                value={this.state.form.genderUser.value}
                onValueChange={value => this.updateInput("genderUser", value)}
                options={this.state.form.genderUser.options}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Select favorite activity</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select favorite activity type"
                type={this.state.form.activity_type.type}
                value={this.state.form.activity_type.value}
                onValueChange={value =>
                  this.updateInput("activity_type", value)
                }
                options={this.state.form.activity_type.options}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Select your age</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select youre age"
                type={this.state.form.ageUser.type}
                value={this.state.form.ageUser.value}
                onValueChange={value => this.updateInput("ageUser", value)}
                options={this.state.form.ageUser.options}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Maximum distance</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select youre maximum distance"
                type={this.state.form.maximumDistanse.type}
                value={this.state.form.maximumDistanse.value}
                onValueChange={value => this.updateInput("maximumDistanse", value)}
                options={this.state.form.maximumDistanse.options}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignsContent: "space-between",
              padding: 30
            }}
          >
            <Button
              title="Submit"
              color="#ff6444"
              onPress={this.EditInformation}
            />
            <View style={{ padding: 10 }} />
            <Button title="Sign out" color="#ff6444" onPress={this.logOut} />
          </View>
          <Modal
            animationType="slide"
            visible={this.state.modalVisibale}
            onRequestClose={() => { }}
          >
            <View style={{ padding: 20 }}>
              {this.showErrorsArray(this.state.errorsArray)}
              <Button
                title="Got it !!"
                onPress={() =>
                  this.setState({
                    hasErrorrs: false,
                    modalVisibale: false,
                    errorsArray: []
                  })
                }
              />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => { }}
          >
            <View style={{ padding: 20 }}>
              <Text>We got your information</Text>
              <Button
                title="Go back home"
                onPress={() => {
                  this.resetInofmation();
                  this.props.navigator.switchToTab({
                    tabIndex: 2
                  });
                }}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  mainTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: 15,
    color: "#00ADA9"
  },
  inputContainer: {

    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 0.1,
  },
  input: {
    flex: 1,
    height: 20,
    backgroundColor: "#fff",
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    padding: 5
  },
  ProfilePicturePicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#485460"
  }
});

function mapStateToProps(state) {
  // console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ EditInformation, autoSignIn, resetInofmation, getLocation }, dispatch); //לבדוקקקק
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

