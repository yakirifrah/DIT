import React, {Component} from 'react';
import { StyleSheet, Text, View,Button , ScrollView, ActivityIndicator } from 'react-native';

import { 
  getOrintation,
  setOrientationListener ,
  removeOrientationListener,
  getPlatform,
  getTokens ,
  setTokens
}   from '../../utils/misc';
import LoginForm from './loginForm'

import LoadTabs from '../Tabs';
import Logo from './logo'
import LoginPanel from './loginPanel';

import {  connect } from 'react-redux';
import {autoSignIn} from '../../Store/actions/user_actions';
import {bindActionCreators} from 'redux';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      platform:getPlatform(),
      orientation: getOrintation(500)
    }

    setOrientationListener(this.chengeOrientation)

  }

  chengeOrientation = ()=>{
    this.setState({
      orientation:getOrintation(500)
    })
  }

  componentWillUnmount(){
    removeOrientationListener()
  }

  componentDidMount(){

    getTokens((value) =>{
      if(value[0][1]=== null){
        this.setState({loading:false})
      }
      else{
        this.props.autoSignIn(value[1][1]).then(()=>{
          if(!this.props.User.userData.token){
            this.setState({loading:false})/////////////////
          }
          else{
            setTokens(this.props.User.userData,()=>{
              LoadTabs()
            })
            
          }
        })
      }
    })
  }

  render() {
    if(this.state.loading){
      return(
          <View style={styles.container}>
            <ActivityIndicator/>
          </View>
      )
    }
    else{
      return (
        <ScrollView>
          <View style={styles.loading}>
            <Logo
            orientation={this.state.orientation}
            />
  
            <LoginPanel
            orientation={this.state.orientation}
            platform={this.state.platform}
            />
  
            
  
            <Button
            title="Home Screen"
            onPress= {()=>{
              LoadTabs();
            }}
            />
  
           </View>
        </ScrollView>
        
      );

    }
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  loading:{
    flex:1,
    backgroundColor:"#fff",
    alignItems: 'center',
    justifyContent: 'center',
  }

});


function mapStateToProps(state){
  return{
      User : state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
//export default Login;