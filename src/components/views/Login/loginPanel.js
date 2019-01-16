import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import LoginForm from './loginForm';

import BackImage from '../../../assets/images/DitLogo01.png';



class LoginPanel extends Component{
    render(){
        return( 
            <View>
                <Image
                style={
                    this.props.orientation === "portrait"
                    ?styles.imageStylePortrait
                    :styles.imageStyleLandscap
                }
                source= {BackImage}
                
                />

                <LoginForm 
                    platform={this.props.platform}
                />
            </View>
                )
       
    }
}

const styles = StyleSheet.create({
    imageStylePortrait:{
        width:230,
        height:180
    },
    imageStyleLandscap:{
        width:270,
        height:0
    }

})

export default LoginPanel;