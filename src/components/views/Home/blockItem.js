import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const BlockItem = (props) => {

    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                Full Name: {item.fullName}
            </Text>
            <Text style={styles.itemText}>
                Age: {item.ageUser}
            </Text>
            <Text style={styles.itemText}>
                Activity type: {item.activity_type}
            </Text>
            <Text style={styles.itemText}>
                Gender: {item.genderUser}
            </Text>
        </View>
    )

    const itemImage = (item) => (
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                source={{ uri: item.profileUrl }}
            />
        </View>
    )

    const block = ({ item, i }) => (
        <View style={styles.blockRow}>
            <TouchableOpacity
                onPress={() => {
                    props.goto(item.blockOne)
                }}
                style={{ flex: 2 }}
            >
                <View
                    style={[styles.blockGridStyle, styles.blockGridStyleLeft]}
                >
                    {itemImage(item.blockOne)}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {
                    props.goto(item.blockTwo)
                }}
                style={{ flex: 2 }}
            >
                <View
                    style={[styles.blockGridStyle, styles.blockGridStyleRight]}
                >
                    {itemImage(item.blockTwo)} 
                    {itemText(item.blockTwo)}
                </View>
            </TouchableOpacity> */}
        </View>
    )

    return (
        <View>
            {block(props)}
        </View>
    )
}

const styles = StyleSheet.create({
    blockRow: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 5,
        justifyContent: "space-between"
    },
    itemImage: {
        width: "100%",
        height: 350
    },
    itemTextContainer: {
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#FF6444"
    },
    itemTextTitle: {
        fontFamily: "Roboto-Black",
        color: "#4C4C4C",
        marginBottom: 5
    },
    itemText: {
        fontFamily: "Roboto-Regular",
        color: "#00ada9",
        marginBottom: 5
    },
    blockGridStyle: {
        backgroundColor: "#f1f1f1"
    },
    blockGridStyleLeft: {
        marginRight: 2.5
    },
    blockGridStyleRight: {
        marginRight: 2.5
    }
});

export default BlockItem;