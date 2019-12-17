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
import Assets from 'tutorRN/src/view/ui/Assets'

import * as M from 'tutorRN/src/service/membership'
import * as Strings from 'tutorRN/src/service/strings'
import * as N from 'tutorRN/src/service/navigation'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

import ReactNativeComponentTree from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree';


import {
  SeparatorBar,
} from 'tutorRN/src/view/ui/UIComponent';


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

    //LoginManager.logOut()

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

    const res = await M.loginAction(this.state.account, this.state.password, info)

    if ( res == true )
    {
      console.log('loginAction success : ' + userViewModel.getUser().user_login )
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
  

  handleInputChange(event) {
    console.log(JSON.stringify(event.nativeEvent))
    
    const element = ReactNativeComponentTree.getInstanceFromNode(event.nativeEvent.target);
    const name = element._currentElement.props.name
    element._currentElement.props.name == 'account' ? this.setState({
      account: event.nativeEvent.text
    }) : this.setState({
      password: event.nativeEvent.text
    })
    this.setState({
      name: event.nativeEvent.text
    })
    
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
    //<Image source={require('tutorRN/image/background-01.jpg')} style={styles.defaultImage} > 
    console.log('Welcome loginMethod ' + this.state.loginMethod)
    return (
      <View style = {styles.background}>  
        
        <Image source={Assets.background.welcome} style={styles.defaultImage} > 
          <View style = {styles.upperPartContainer}></View>
          <View style = {styles.ButtonContainer}>
          
            <View  style = {styles.textFieldStyle}>
              <TextInput
                ref= {(accountInput) => { this.accountInput = accountInput }}
                style = {{paddingLeft : 5, paddingRight : 5, height: '100%'}}
                //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                //onChangeText={(text) => this.setState({account: text})}
                placeholder = {strings.emailPlaceHolder}
                placeholderTextColor='white'
                name= "account"
                //onChangeText={ (text) => this.handleInputChange(text)}
                onChange= {this.handleInputChange}
                //value={this.state.account}
                onFocus = { (event) => this.onFocus(event)}
              />
            </View>
            <SeparatorBar height={1}/>

            <View 
              style = {styles.textFieldStyle}
            >
              <TextInput
                ref= {(passwordInput) => { this.passwordInput = passwordInput }}
                style = {{paddingLeft : 5, paddingRight : 5, height:'100%'}}
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
            <SeparatorBar height={1}/>

            <TouchableOpacity 
              onPress={()=>this.registerAction()} 
            >
              <View style = {styles.btnStyle}>
                <Text style = {styles.loginText}>
                  {strings.registrationText}
                </Text>
              </View>
            </TouchableOpacity>

            <SeparatorBar height={1}/>

            <TouchableOpacity 
              onPress={()=>this.loginAction(this.state.account, this.state.password, null)}
              
            >
              <View style = {styles.btnStyle}>
                <Text style = {styles.loginText}>
                  {strings.loginText}
                </Text>
              </View>
            </TouchableOpacity>

            <SeparatorBar height={1}/>

            <TouchableOpacity onPress={this.guestInAction}>
              <View style={styles.btnStyle}>
                <Text style = {styles.guestBtnText}>
                  {strings.guestLoginText}
                </Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style = {styles.lowerPartContainer}>
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

                  console.log("login has error: " + JSON.stringify(error) + ", " + JSON.stringify(result) );
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
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  background:{
    flex: 1,

  },
  
  defaultImage: {
    flex: 1,
    resizeMode: 'cover',    
    width: '100%',
    height: '100%',

  },

  textFieldStyle:{
    width: layout.deviceWidth,
    height:50,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
  },

  btnStyle:{
    height:50,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    width: layout.deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  loginText:{
    color: 'white',
    fontSize:15
  },

  guestBtnText:{
    color: 'white',
    fontSize: 15
    
  },
  

  ButtonContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperPartContainer:{
    flex:1,
  },
  lowerPartContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }

});


export default Welcome;