import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'


const generateIcon = (value) => {
    let name = '';
    switch (value) {
        case "All":
            name = "circle-o-notch";
            break;
        case "Cycling":
            name = "bicycle";
            break;
        case "Run":
            name = "street-view";
        case "Football":
            name = "soccer-ball-o";
            break;
        case "Ballet":
            name = "star";
            break;
        case "Boxing":
            name = "optin-monster";
            break;
        case "Crossfit":
            name = "wheelchair-alt";
            break;
        case "Gym":
            name = "soccer-ball-o";
            break;
        case "Swim":
            name = "grav";
            break;
        case "Skating":
            name = "dribbble";
            break;
        case "Surfing":
            name = "dribbble";
            break;
        case "Tennis":
            name = "soccer-ball-o";
            break;
        case "Walking":
            name = "street-view";
            break;
        case "Yoga":
            name = "shopping-bag";
            break;

        default:
            name = "";
    }
    return name;
}
class HorizontalScrollIcons extends Component {
    generateIcon = activity_type =>
        activity_type
            ? activity_type.map(item => (
                <View style={{ marginRight: 15 }} key={item}>
                    <Icon.Button
                        name={generateIcon(item)}
                        iconStyle={{ marginRight: 10, marginLeft: 3 }}
                        backgroundColor={
                            this.props.activity_typeSelcted !== item ? "#c1c1c1" : "#ff6444"
                        }
                        size={20}
                        borderRadius={100}
                        onPress={() => this.props.updateCategoryHandler(item)}
                    >
                        <Text style={{
                            color: '#ffffff',
                            marginRight: 5
                        }}>
                            {item}
                        </Text>
                    </Icon.Button>
                </View>
            ))
            : null;

    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}>


                    {this.generateIcon(this.props.activity_type)}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    }
});

export default HorizontalScrollIcons;