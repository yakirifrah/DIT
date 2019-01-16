import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Input from '../../utils/forms/inputs';
import validationRules from '../../utils/forms/validationRules';
import LoadTabs from '../Tabs';

import {connect} from 'react-redux';
import {signUp, signIn} from '../../Store/actions/user_actions';
import {bindActionCreators} from 'redux';

import {setTokens,getTokens} from '../../utils/misc'

class LoginForm extends Component{

    state = {
        type:'Login',
        action:'Login',
        actionMode:'Not a user? Register Here!',
        
        hasErrorrs:false,

        form:{
            email:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isReqired:true,
                    isEmail:true
                }
            },
            password:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isReqired:true,
                    minLength:6
                }
            },
            confirmPassword:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    confirmPass:"password"
            }
        }
    }


        
    }

    updateInput = (name,value)=>{
       // alert("aa")
        this.setState({
            hasErrorrs:false
        })
        let formCopy = this.state.form
        formCopy[name].value = value

        let rules = formCopy[name].rules
        let valid = validationRules( value ,rules,formCopy )

        formCopy[name].valid = valid

        this.setState({
            form:formCopy
        }) 
    }

    confirmPassword = () =>(
        this.state.type != 'Login' ? 
        <Input
                    placeholder="Confirm your password"
                    type={this.state.form.confirmPassword.type}
                    value={this.state.form.confirmPassword.value}
                    onChangeText={value=>this.updateInput("confirmPassword",value)}
                    secureTextEntry
                />
        : null
    )

    formHasErrorrs = ()=>(
        this.state.hasErrorrs 
        ?   <View style= {styles.errorContainer}>
                <Text style = {styles.errorLabel}> Opps,check your info </Text>
            </View>
        : null
    )

    manageAccess = () =>{
        if(!this.props.User.userData.uid){
            this.setState({hasErrorrs: true })
        }
        else{
            setTokens(this.props.User.userData,()=>{
                //console.log("works")
                this.setState({hasErrorrs:false});
                LoadTabs();
            })

        }
    }

    ChangeFormType=()=>{
        const type = this.state.type;
        this.setState({
            type: type ==='Login' ? 'Register' : 'Login',
            action: type ==='Login' ? 'Register' : 'Login',
            actionMode : type ==='Login'? 'Go to Login' : 'Not a user? Register Here!',
        })
    }

    submitUser = ()=>{
        let isFormValid = true;
        let formToSubmit = { };
        const formCopy = this.state.form;
        for(let key in formCopy){
            if(this.state.type === "Login"){
                if(key !== 'confirmPassword'){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            }
            else{
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }
        
        if(isFormValid){
            if(this.state.type === "Login"){
                this.props.signIn(formToSubmit).then( () => {
                    this.manageAccess()
                })

            }
            else{
                this.props.signUp(formToSubmit).then( () => {
                    //console.log(this.props.User)
                    this.manageAccess()
                })
            }
        }
        else{
            this.setState({
                hasErrorrs:true
            })
        }

    }

/*     componentDidMount(){//we can see all the tokens that pass
        getTokens((values)=>{
            console.log(values)
        })
    } */

    render(){
        return(
            <View style={styles.formInputContainer}>
                <Input
                placeholder="Enter your email"
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                onChangeText={value => this.updateInput("email",value)} 
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                
                />

                <Input
                    placeholder="Enter your password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value=>this.updateInput("password",value)}
                    secureTextEntry
                />

                {this.confirmPassword()} 
                {this.formHasErrorrs()}

                <View style={
                    this.props.platform === "android"
                    ? styles.buttonStyleAndroid
                    : styles.buttonStyleIos
                }>
                    <Button
                        title={this.state.action}//login Button
                        color="#575fcf"
                        onPress={this.submitUser}
                        />
                </View>

                <View style={
                    this.props.platform === "android"
                    ? styles.buttonStyleAndroid
                    : styles.buttonStyleIos
                }>
                    <Button
                        title={this.state.actionMode}//register Button
                        color="lightgrey"
                        onPress={()=>this.ChangeFormType()}
                        />
                </View>
        </View>
        )
        
    }
}

const styles = StyleSheet.create({
    formInputContainer:{
        minHeight: 400,
    },
    buttonStyleAndroid:{
        marginBottom: 10,
        marginTop: 10,

    },
    buttonStyleIos:{
        marginBottom: 0,
    },
    errorContainer:{
        marginBottom:10,
        marginTop:10,
    },
    errorLabel:{
        color:'red',
        fontFamily: 'Roboto-LightItalic',
    }

})

function mapStateToProps(state){
    return{
        User : state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp,signIn},dispatch)
}

//export default LoginForm;
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)