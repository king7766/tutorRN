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
import strings from 'tutorRN/src/service/strings'


import * as M from 'tutorRN/src/service/membership'
import * as Strings from 'tutorRN/src/service/strings'
import * as N from 'tutorRN/src/service/navigation'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

import ReactNativeComponentTree from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree';


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

    this.state = {
      // loginMethod
      // 0 = email
      // 1 = facebook
      // 2 = wechat

      loginMethod : 0,
      account: '',
      password: '',
    };

    
    //this.getFacebookData = this.getFacebookData.bind(this)
    this.logoutFinished = this.logoutFinished.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    //userVM.getInstance()
    
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  componentWillMount() {
    this.mounted = true
    //this.getFacebookData()
    
  }

  facebookFetchingFinished(result )
  {
    console.log('facebookFetchingFinished ' + result)
    M.facebookAccountCheck()
    
    //this.getFacebookData()
  }

  getFacebookData ()
  {

    const infoRequest = new GraphRequest(
      'me?fields=address,first_name,last_name,name,email,location,photos,picture,public_key,birthday,gender,about,posts',
      null,
      this.facebookDataCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();

    /*
    AccessToken.getCurrentAccessToken().then((data) => {
      //const { accessToken } = data
      
      console.log('FBSDK data = ' + data)

      var newArr = Object.keys(data);
      var mappedArr = newArr.map(function(i) {
        return [i, data[i]];
      });
      console.log(mappedArr);
   

      if ( data )
      {
        
        
        //N.loginAction(data.accessToken);
        //this.initUser()
      }
      else
      {

      }
    })
    */
  }

  logoutFinished()
  {
    console.log('logoutFinished')
  }

  initUser() {

    console.log('initUser')

    const infoRequest = new GraphRequest(
      //'me/videos?type=uploaded&fields=title,description,thumbnails',
      //'me?fields=address,first_name,last_name,name,email,location,photos,picture,public_key,birthday,gender,about,posts',
      'me?fields=address,first_name,last_name,name,email,location,photos{picture},picture{url},public_key,birthday,gender,about,posts,videos{id}',

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

  facebookDataCallback = (error, result) => {

    if (error) {
      console.log('Error1 fetching data: ' + error.toString());
    } else {
      console.log('facebook result : ')
      console.log(result.name + ' ' + result.id)

      this.setState({
        loginMethod: 1,
      });

     

      var data = {
        token : E.token,
        //login : result.id,
        login : result.id + '1',
        password : 'abcd1234',
        nickname : result.name,
        sex : 'null',
        occupation : 'null',
        education : 'null',
        birth : result.birthday,
        location : result.location.name,
        thumb : result.picture.data.url,
      }

      this.loginAction(data.login, data.password, data)

      //REGISTER_USER
      //LOGIN_AUTH
      /*
      C.getResponseFromApi(E.LOGIN_AUTH, 'POST', data)
      .then( (json ) =>{
        if( json.statusCode == 200)	
        {
          if ( isNaN(json.data) )
          {
            
            console.log(' Login success with id = ' +  json.data.user_id);
            N.loginAction(json.data.user_id);
          }
          else
          {
            // something wrong, should be json
            console.log('this is error code : ' + json.data);
            //console.log(' Login success with id = ' +  json.data.user_id);
          }
          
        }
      })
      */


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

  registerAction ()
  {
    
    

    /*
    this.accountInput.setNativeProps({
      //value :'213',
      //placeholder:'nonono',
      //placeholderTextColor:'red'
      
    });
    */
    
    
    
    this.props.navigation.navigate('Register');
    
    
  }

  async loginAction (id, password, info)
  {

    console.log('loginAction')
    console.log('account = ' + this.state.account)
    console.log('password = ' + this.state.password)
    
    if ( this.state.account < 1 )
    {
      this.accountInput.setNativeProps({
        placeholder:strings.notFilledInMessage,
        placeholderTextColor:'red'
      })
    }

    if ( this.state.password < 1)
    {
      this.passwordInput.setNativeProps({
        placeholder:strings.notFilledInMessage,
        placeholderTextColor:'red'
      })
    }

    const res = M.loginAction(id, password, info)

    
    if ( res == true )
    {
      
      //console.log('loginAction success : ' + userViewModel.getUser() )
    }
    else
    {
      console.log('login fail !! set UI for related action')
      //M.registrationAction(id, password, info)
    }
    


    /*
    console.log('loginAction : ' + id + ', ' + password )
  
    const res = await userViewModel.login(id , password)

    if ( res.data.verify_status == 'success')
    {
      console.log('success : ' + userViewModel.getUser() )
      //this.props.navigation.navigate('Register')
    }
    else
    {
      console.log('login fail')
      this.registerAction()

      
    }
    */

  }

  /*
  async registerAction ()
  {
    if ( this.state.loginMethod == 0 )
    {
      // register account by email
      console.log('register account by email')
      const res = await userViewModel.register(info);
      if ( res )
      {
        N.loginAction(json.data.user_id);
      }

    }
    else if ( this.state.loginMethod == 1)
    {

      // register account by facebook 
      console.log('register account by facebook ')
    }
  }
  */

  /*
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
    
    
    //login( (id) => {
    //  Actions.editor({ storyId: id })
    //});
    

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
  */
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

  handleInputChange(event) {
    console.log(JSON.stringify(event.nativeEvent))
    /*
    const element = ReactNativeComponentTree.getInstanceFromNode(event.nativeEvent.target);
    const name = element._currentElement.props.name
    //element._currentElement.props.name == 'account' ? this.setState({
    //  account: event.nativeEvent.text
    //}) : this.setState({
    //  password: event.nativeEvent.text
    //})
    this.setState({
      name: event.nativeEvent.text
    })
    */
  }

  onFocus (event)
  {
    const element = ReactNativeComponentTree.getInstanceFromNode(event.nativeEvent.target); 
    element.setNativeProps({
      placeholder: element._currentElement.props.name == 'account' ? strings.emailPlaceHolder : strings.passwordPlaceHolder,
      //placeholderTextColor:'grey'
      placeholderTextColor:'white'
      
    });
  }


  render() {

    return (
      <View style = {styles.background}>  
        <Image source={require('tutorRN/src/image/background.jpg')} style={styles.image} /> 
        
        <View style = {{width: layout.deviceWidth, backgroundColor:'transparent', top:70, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('tutorRN/src/image/iconLogo1.png')} style= {styles.welcomeIcon}/> 
        </View>


        <View style = {styles.ButtonContainer}>
          

          <View  style = {styles.emailField}>
            <TextInput
              ref= {(accountInput) => { this.accountInput = accountInput }}
              style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'rgba(200, 200, 200, 0.9)', height: '100%'}}
              //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              //onChangeText={(text) => this.setState({account: text})}
              placeholder = {strings.emailPlaceHolder}
              placeholderTextColor='white'
              //value={this.state.text}

              name= "account"
              //onChangeText={ (text) => this.handleInputChange(text)}
              onChange= {this.handleInputChange}
              //value={this.state.account}
              onFocus = { (event) => this.onFocus(event)}
            />
          </View>

          <View 
            style = {styles.passwordField}
          >
            <TextInput
              ref= {(passwordInput) => { this.passwordInput = passwordInput }}
              style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'rgba(200, 200, 200, 0.9)', height: '100%'}}
              //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              name= "password"
              secureTextEntry = {true}
              placeholderTextColor='white'
              //onChangeText={(text) => this.setState({password: text})}
              onChange= {this.handleInputChange}
              placeholder = {strings.passwordPlaceHolder}
              //value={this.state.password}
              onFocus = { (event) => this.onFocus(event)}
            />
          </View>

          <TouchableHighlight 
            onPress={()=>this.registerAction()} 
            style = {styles.registerBtnStyle}
          >
            <View>
              <Text style = {styles.loginText}>
                {strings.registrationText}
              </Text>
            </View>
          </TouchableHighlight>


          <TouchableHighlight 
            onPress={()=>this.loginAction(this.state.accountID, this.state.password, null)}
            style = {styles.loginBtnStyle}
          >
            <View>
              <Text style = {styles.loginText}>
                {strings.loginText}
              </Text>
            </View>
          </TouchableHighlight>

          <View style = {styles.fbBtnStyle}>
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

                // must use FacebookSDKs-iOS-4.38.0 sdk , else will be cannot connect

                console.log("login has error: " + error + ", " + result);
                //console.log("login has error: " + result);

                var newArr = Object.keys(error);
                var mappedArr = newArr.map(function(i) {
                  return [i, error[i]];
                });
                console.log(mappedArr);


              } else if (result.isCancelled) {
                console.log("login has isCancelled: " );
                //alert("login is cancelled.");
              } else {
                this.facebookFetchingFinished(result)
              }
            }}
            onLogoutFinished = {
              this.logoutFinished
            }
            />
          
          </View>


          <TouchableHighlight onPress={this.guestInAction}>
            <View style={styles.guestButtonStyle}>
              <Text style = {styles.guestBtnText}>
                {strings.guestLoginText}
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
    //top:200,
    width: '100%',
    height: 40,
    //backgroundColor : 'rgba(242,242,242,0.7)'

  },
  passwordField:{
    top:5,
    //top:205,
    width: '100%',
    height: 40,
    //backgroundColor : 'rgba(242,242,242,0.7)'
  },

  background:{

    flex: 1,
    //backgroundColor:'red',
    
  },

  welcomeIcon:{
    //top: layout.deviceHeight - 100,
    
    height:170,
    width:170,
    
    //width: layout.deviceWidth - 100,
    opacity:0.7,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    //resizeMode: 'center',
    //width: undefined,
    //height: undefined,
    //backgroundColor: '#889DAD',

    width: '100%',
    height: '100%',
    //resizeMode :'center',
    position: 'absolute',
    //alignItems:'center', 
    //backgroundColor:'transparent'
    //justifyContent: 'center',
  },

  registerBtnStyle:{

    top:10,
    //width:'100%',
    //flex:1,
    
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
    //backgroundColor: layout.themeTextColor,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    width: layout.deviceWidth,

  },
  loginBtnStyle:{
    top:10,
    //width:'100%',
    //flex:1,
    
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
    //backgroundColor: layout.themeTextColor,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    width: layout.deviceWidth,
  },



  fbBtnStyle:{
    top:15,
  },

  loginText:{
    color: 'white',
    fontSize:15
  },

  guestBtnText:{
    color: 'white',
    fontSize: 15
    
  },
  guestButtonStyle: {
    top:240,
    width: '100%',
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor : 'rgba(61,89,148,1)',
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    width: layout.deviceWidth,
    height: 40,
    
  },

  ButtonContainer: {
    flexDirection: 'column',
    //backgroundColor: 'green',
    position: 'absolute',
    top: layout.deviceHeight - 500,
    height:layout.deviceHeight - 500,
    width: layout.deviceWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }

});


export default Welcome;