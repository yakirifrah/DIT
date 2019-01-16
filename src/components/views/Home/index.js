import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { Navigation } from "react-native-navigation";

import { connect } from "react-redux";
import { EditInformation } from "../../Store/actions/user_actions";
import { bindActionCreators } from "redux";
import HorizontalScroll from "./horizontal_scroll_icons";
import {
  getTokens,
  setTokens,
  requestLocationPermission,
  gridTwoColumns
} from "../../utils/misc";
import { getDetails, getUserData } from "../../Store/actions/details_action";
import Icon from "react-native-vector-icons/FontAwesome";
import BlockItem from "./blockItem";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_type: [
        "All",
        "Cycling",
        "Football",
        "Boxing",
        "Run",
        "Ballet",
        "Crossfit",
        "Gym",
        "Swim",
        "Skating",
        "Surfing",
        "Tennis",
        "Walking",
        "Yoga"
      ],
      activity_typeSelcted: "All",
      details: [],
      isLoading: false
    };
  }
  
  updateCategoryHandler = value => {
    this.setState({
      isLoading: true,
      activity_typeSelcted: value,
      details: []
    });
console.log(this.state)
    getTokens(value => {
      this.props
        .getDetails(value[3][1], this.state.activity_typeSelcted, "gedz")
        .then(() => {
          const newDetails = gridTwoColumns(this.props.Details.list);
          //console.log(newDetails);
          this.setState({
            isLoading: false,
            details: newDetails
          });
        });
    });

    //const newDetails = gridTwoColumns(this.props.Details.list);
    // console.log(newDetails);
  };
  goToChatTab = props => {

    this.props.getUserData(props)
      this.props.navigator.push({
        screen: "Dit.Chat",
        animationType : "slide-horizontal"
    });
    //this.test1(props);

  
  };

  // test1 = (props) => {
  //     console.log("1110"+props.uid)

  // }
  showDetails = () =>
    this.state.details.map((item, i) => (
      <BlockItem
        key={`columnHome-${i}`}
        item={item}
        iteration={i}
        goto={this.goToChatTab}
      />
    ));


  render() {
    const details = this.showDetails();

    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            activity_type={this.state.activity_type}
            activity_typeSelcted={this.state.activity_typeSelcted}
            updateCategoryHandler={this.updateCategoryHandler}
          />
        </View>
        <View style={styles.container}>
          {this.state.isLoading ? (
            <View style={styles.isLoading}>
              <Icon name="gears" size={30} color="lightgrey" />
              <Text style={{ color: "lightgrey" }}>Loading...</Text>
            </View>
          ) : null}
          <View style={styles.detailsContainer}>
            <View style={{ flex: 1 }}>{details}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { Details: state.Details };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDetails, getUserData }, dispatch); //לבדוקקקק
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    padding: 10,
    alignSelf: "center"
  },
  container: {
    marginTop: 5
  },
  isLoading: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  containerPage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
