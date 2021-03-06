const FBSDK = require('react-native-fbsdk');
const {LoginButton, ShareDialog, AccessToken, GraphRequest,
  GraphRequestManager,} = FBSDK;
//const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

import {
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';


import userVM from 'tutorRN/src/VM/userVM'
import * as E from 'tutorRN/src/service/env-config'
import * as N from 'tutorRN/src/service/navigation'
import * as C from 'tutorRN/src/service/connection'


import alert from 'tutorRN/src/service/alert'
import strings from './strings';


const userViewModel = userVM.getInstance()

export function facebookAccountCheck ()
{
    AccessToken.getCurrentAccessToken().then((data) => {
        
        console.log('facebookAccountCheck : '+ JSON.stringify(data))
        
        if ( data )
        {
            var newArr = Object.keys(data);
            var mappedArr = newArr.map(function(i) {
                return [i, data[i]];
            });
            
            getFacebookData()
        }
        else
        {

            // facebook token expired
            console.log('facebook token expired')
            return false
        }  
    })
}

function getFacebookData()
{
    const infoRequest = new GraphRequest(
        //'me?fields=address,first_name,last_name,name,email,location,photos,picture,public_key,birthday,gender,about,posts',
        'me?fields=address,first_name,last_name,name,email,location,photos%7Bpicture%7D,picture,public_key,birthday,gender,about,posts',
        null,
        facebookDataCallback
    );
      // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  
}

facebookDataCallback = (error, result) => {

    if (error) {
      console.log('Error fetching data: ' + (error) )
    } else {

        var newArr = Object.keys(result);
        var mappedArr = newArr.map(function(i) {
            return [i, result[i]];
        });
        //console.log('facebook result : ' + mappedArr )
        console.log('facebook result : ' + JSON.stringify(result) )

        /*
        var data = {
            token : E.token,
            //login : result.id,
            login : result.id  ,
            password : 'abcd1234',
            nickname : result.name,
            sex : 'null',
            occupation : 'null',
            education : 'null',
            birth : result.birthday,
            location : result.location.name,
            thumb : result.picture.data.url,
        }
        */
        //loginAction(data.login, data.password, result)
        //loginAction(result.id, 'abcd1234', result)
        //facebookLoginAction(result.id, 'abcd1234', result)
        facebookLoginAction(result.email, result.id, result)
    }
}

async function facebookLoginAction(id, password, result)
{
    console.log('facebookLoginAction = '+ id + ', pw: ' + password)
    const res = await callLoginAPI(id , password)
    //if ( res.data.verify_status == 'success')
    
    console.log('facebookLoginAction result = ' + JSON.stringify(res))
    if ( res.data.user_login !== undefined)
    {
        //console.log(data)
        userViewModel.setUserProfile(res.data)
        //if ( result.photos)
        //{
        //    userViewModel.setFacebookPhotos(result.photos.data)
        //}
        
        //console.log('success : ' + userViewModel.getUser().user_login )

        await AsyncStorage.setItem('userToken', id );
        await AsyncStorage.setItem('userPassword', password );
        
        N.loginAction( userViewModel.getUser().user_login );
      
        return true
    }
    else{

        //facebookRegistrationAction (id, password, result)
        console.log('no this account , go to registration ' + JSON.stringify(result) )
        console.log( result.name)
        console.log( result.id)
    
        var data = {
            token: E.token,
            login: result.email,
            password : result.id,
            nickname : result.name,
            sex: result.gender !== undefined ? result.gender : '-1',
            occupation : '-1',
            education : '-1',
            birth : result.birthday !== undefined ? result.birthday : '-1',
            location : result.location !== undefined ? result.location.name : '-1',
            thumb : result.picture.data.url !== undefined ? result.picture.data.url : '-1',
        } 

        console.log( JSON.stringify(data))
        facebookRegistrationAction (data)

        //return false

        //DeviceEventEmitter.emit('alert', {message : strings.notRegisterMessage});

        // go registration 
        //registrationAction(id, password, data)
    }
}

async function facebookRegistrationAction(data)
{
    registrationAction(data) 

}

export async function registrationAction( data)
{
    const res = await callingRegistrationAction(data)
    console.log('registrationAction : ' + JSON.stringify(res))
    if ( res.data.user_id !== undefined )
    {
        userViewModel.setUserProfile(res.data)
        //if ( res.data.user_thumb)
        //{
        //    userViewModel.setFacebookPhotos(res.data.user_thumb)
        //}

        //await AsyncStorage.setItem('userToken', res.data.user_login )
        //await AsyncStorage.setItem('userPassword', res.data.user_password )
        await AsyncStorage.setItem('userToken', data.login )
        await AsyncStorage.setItem('userPassword', data.password )

        N.loginAction( userViewModel.getUser().user_login )
      
        return true
    }
    else
    {
        console.log('registrationAction fail')
        return false
    }
}

async function callingRegistrationAction (data)
{
    console.log('data : ' +JSON.stringify (data) )
    
    return C.getResponseFromApi(E.REGISTER_USER, 'POST', data ).then( (json ) =>{
        if( json.statusCode == 200)	
        {
            console.log('REGISTER_USER data = ' + JSON.stringify(json.data, null, 2) )
            return json
        }
        else
        {
            console.log('this is error code : ' + json.data);
            return false
        }
    });
}


export async function loginAction(id, password, result)
{
    console.log('loginAction = '+ id + ', pw: ' + password)

    //const res = await userViewModel.login(id , password)
    const res = await callLoginAPI(id , password)

    //if ( res.data.verify_status == 'success')
    if ( res.data.user_login)
    {
        
        userViewModel.setUserProfile(res.data)
        //if ( result.photos)
        //{
        //    userViewModel.setFacebookPhotos(result.photos.data)
        //}
        
        //console.log('success : ' + userViewModel.getUser().user_login )

        await AsyncStorage.setItem('userToken', id );
        await AsyncStorage.setItem('userPassword', password );
        
        N.loginAction( userViewModel.getUser().user_login );
      
        return true
    }
    else{

        console.log('no this account , go to registration')
        return false

        //DeviceEventEmitter.emit('alert', {message : strings.notRegisterMessage});

        // go registration 
        //registrationAction(id, password, data)
    }
}

async function callLoginAPI (login, password)
{
    var data = {
        token: E.token,
        login: login,
        password : password
    }  

    return C.getResponseFromApi(E.LOGIN_AUTH, 'POST', data ).then( (json ) =>{

			
        if( json.statusCode == 200)	
         {
            
            console.log('membership login data = ' + JSON.stringify(json.data, null, 2) )
            console.log('writing to userVM at here')
            
            //this.userProfile = userModel.deserialize(json.data)

            return json
        
             
             
         }
         else
         {
             //console.log('error ')
            console.log('this is error code : ' + json.data);
            
            return false
         }

    })
}



export function logoutAction ()
{
    // fb logout token
    LoginManager.logOut()

    // call navigation logout
    N.logoutAction()
}
