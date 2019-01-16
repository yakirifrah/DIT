import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';




class Logo extends Component {
    render(){
        //console.log(this.props.orientation )
        //styles.logoStyles
        return(
            <View style={
                this.props.orientation === "portrait" 
                ? styles.logoStylesPortrait
                : styles.logoStylesLandscap}>
                <View>
                    <Text style={ styles.ditLogo}>
                        DIT
                    </Text>
                    
                </View>
            </View>
        )
    }
}
  
  const styles = StyleSheet.create({
    logoStylesPortrait:{
      marginTop: 50,
      flex: 1,
      flexDirection: 'row',
      maxHeight:100
    },
    logoStylesLandscap:{
      marginTop: 20,
      flex: 1,
      flexDirection: 'row',
      maxHeight:50
    },
    ditLogo:{
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color:"#555555"
    }
  
  });
  
  export default Logo;