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

import userVM from 'tutorRN/src/VM/userVM'


import * as Membership from 'tutorRN/src/service/membership';
import * as Strings from 'tutorRN/src/service/strings';
import * as N from 'tutorRN/src/service/navigation';


//import { LoginManager } from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {LoginButton, ShareDialog, AccessToken, GraphRequest,
  GraphRequestManager,} = FBSDK;
//const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;


const layout = require('tutorRN/src/Layout')

const userViewModel = userVM.getInstance()

class Welcome extends Component<Props> {

  constructor(props) {
    super(props);

    
    this.loginFinished = this.loginFinished.bind(this)
    this.logoutFinished = this.logoutFinished.bind(this)

    //userVM.getInstance()
    
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  componentWillMount() {
    this.mounted = true
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      if ( accessToken )
      {
        this.initUser()
      }
      
    })
  }

  loginFinished(result )
  {
    console.log('loginFinished')
    console.log(result)
    this.initUser()
    
   
    
  }

  logoutFinished()
  {
    console.log('logoutFinished')
  }

  initUser() {

    console.log('initUser')

    const infoRequest = new GraphRequest(
      'me/videos?type=uploaded&fields=title,description,thumbnails',
      
      //'tutorRN/src/me/videos?type=uploaded&field=file_size,title,description',
      //624073744/videos?type=uploaded
      //'tutorRN/src/me?fields=name,picture,email',
      //'tutorRN/src/me/videos',
      null,
      this._responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();

  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('facebook result : ')
      console.log(result)
      //this.setState({name: result.name, pic:result.picture.data.url, email : result.email});
    }
  }

  guestInAction = async() => {

    N.loginAction('guest');
    //await AsyncStorage.setItem('userToken', 'guest');
    //this.props.navigation.navigate('App');
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
  //async loginAction(){

    //const res = Membership.login('123','pw')


    try {

      const res = await userViewModel.login('kevin', 'qwer1234%T')
      
      if ( res.data.verify_status == 'success' )
      {
        console.log('success : ' + userViewModel.getUser() )
        this.props.navigation.navigate('Register')

      }
      else
      {
        console.log( 'error = ' + res.data)
      }

    }
    catch ( error ){
      console.warn('Error !!' + error );
    }
    
    /*
    login( (id) => {
      Actions.editor({ storyId: id })
    });
    */

    //this.props.navigation.navigate('Register')

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
        <Image source={require('tutorRN/src/image/background.jpg')} style={styles.image} /> 
        <View style = {styles.ButtonContainer}>

          <View 
            style = {styles.emailField}
          >
            <TextInput
            style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'rgba(255, 255, 255, 1.0)', height: '100%'}}
            //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            placeholder = {Strings.emailPlaceHolder}
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
            placeholder = {Strings.passwordPlaceHolder}
            //value={this.state.text}
            />
          </View>

          <TouchableHighlight onPress={this.loginAction}>
            <View style={styles.loginButton}>
              <Text style = {styles.loginText}>
                {Strings.loginText}
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
          <LoginButton 
            readPermissions={[
              "public_profile",
              "email",
              "user_friends",
              "user_hometown",
              "user_location",
              "user_birthday",
              "user_likes",
              "user_photos",
              "user_posts",
              "user_tagged_places",
              "user_videos",
              "user_events",
              'pages_show_list',
              'user_videos',
              //161110067273366
              //'manage_pages',
            ]}
            onLoginFinished = {
              (error, result) => {

              if (error) {
                //alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                //alert("login is cancelled.");
              } else {
                this.loginFinished(result)
              }
            }}
            onLogoutFinished = {
              //console.log('hihi')
              this.logoutFinished
            }
            

          />
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
    //backgroundColor: 'green',
    position: 'absolute',
    top: layout.deviceHeight - 200,
    width: layout.deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  }

});


export default Welcome;