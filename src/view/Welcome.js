/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import userVM from '../VM/userVM'
//import { LoginManager } from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;


const layout = require('../Layout')
const viewModel = userVM.getInstance()

class Welcome extends Component<Props> {

  constructor(props) {
    super(props);

    
    //userVM.getInstance()
    
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  componentWillMount() {
    this.mounted = true
  }

  guestInAction = async() => {

    await AsyncStorage.setItem('userToken', 'guest');
    this.props.navigation.navigate('App');
    return 
    
    /*

    if( viewModel.getUser().user_status == 'guest')
    {
      // already have data
      // go to news page

      await AsyncStorage.setItem('userToken', 'guest');
      this.props.navigation.navigate('App');
    }
    else
    {

      this.props.navigation.navigate('Register');
    }
    */
    

  }

  loginAction = async() =>{

    this.props.navigation.navigate('Register')
    return

    console.log('loginAction' + AsyncStorage.getItem('userToken'))
    if( viewModel.getUser().user_status === 'noINFO')
    {
      await AsyncStorage.setItem('userToken', 'noINFO');
      this.props.navigation.navigate('Register');
    }
    else
    {
      //user_token
      await AsyncStorage.setItem('userToken', viewModel.getUser().user_token);
      this.props.navigation.navigate('App');
    }
  }
  
  /*
  handleFacebookLogin () {

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  */
  render() {

    

    return (
      <View style = {styles.background}>  
        <Image source={require('../image/background.jpg')} style={styles.image} /> 
        <View style = {styles.ButtonContainer}>

          <View 
            style = {styles.emailField}
          >
            <TextInput
            style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'rgba(255, 255, 255, 1.0)', height: '100%'}}
            //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder = '電郵地址'
            //value={this.state.text}
            />
          </View>

          <View 
            style = {styles.passwordField}
          >
            <TextInput
            style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'rgba(255, 255, 255, 1.0)', height: '100%'}}
            //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder = '密碼'
            //value={this.state.text}
            />
          </View>

          <TouchableHighlight onPress={this.loginAction}>
            <View style={styles.loginButton}>
              <Text style = {styles.loginText}>
                登入
              </Text>
            </View>
          </TouchableHighlight>


          <TouchableHighlight onPress={this.guestInAction}>
            <View style={styles.facebookButton}>
              <Text style = {styles.facebookText}>
                遊客進入
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

        


    );
  }
}

const styles = StyleSheet.create({

  emailField: {
    width: '100%',
    height: 40,
    backgroundColor : 'rgba(242,242,242,1)'

  },
  passwordField:{
    width: '100%',
    height: 40,
    backgroundColor : 'rgba(242,242,242,1)'
  },

  background:{
     flex: 1,
     alignItems:'center', 
     backgroundColor:'transparent'
  },

  image: {
    flex: 1,
    //resizeMode: 'cover',
    resizeMode: 'contain',
    //width: undefined,
    //height: undefined,
    //backgroundColor: '#889DAD',
  },

  loginButton:{
    //width:'100%',
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
    backgroundColor: layout.themeTextColor,
    width: layout.deviceWidth,
  },

  loginText:{
    color: 'white',
    fontSize:15
  },

  facebookText:{
    color: 'white',
    fontSize: 15
    
  },
  facebookButton: {
    width: '100%',
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'rgba(61,89,148,1)',
    width: layout.deviceWidth,
    height: 40,
    
  },

  ButtonContainer: {
    flexDirection: 'column',
    backgroundColor: 'green',
    position: 'absolute',
    top: layout.deviceHeight - 200,
    width: layout.deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  }

});


export default Welcome;