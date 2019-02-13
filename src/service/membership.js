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
        'me?fields=address,first_name,last_name,name,email,location,photos,picture,public_key,birthday,gender,about,posts',
        null,
        facebookDataCallback
    );
      // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  
}

facebookDataCallback = (error, result) => {

    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {

        var newArr = Object.keys(result);
        var mappedArr = newArr.map(function(i) {
            return [i, result[i]];
        });
        //console.log('facebook result : ' + mappedArr )
        console.log('facebook result : ' + JSON.stringify(result) )

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
        
        loginAction(data.login, data.password, data)
    }
}

export async function loginAction(id, password, data)
{
    console.log('loginAction = '+ id)

    const res = await userViewModel.login(id , password)

    if ( res.data.verify_status == 'success')
    {
        console.log('success : ' + userViewModel.getUser().user_login )

        await AsyncStorage.setItem('userToken', id );
        await AsyncStorage.setItem('userPassword', password );
        
        N.loginAction( userViewModel.getUser().user_login );
      
    }
    else{

        console.log('no this account , go to registration')

        //DeviceEventEmitter.emit('alert', {message : strings.notRegisterMessage});

        //alert.getInstance().showAlert({ 'message': strings.notRegisterMessage});

        // go registration 
        registrationAction(id, password, data)
    }
}

export function registrationAction(id, password, data)
{
    console.log('registrationAction id : ' +id +', pw : '+ password)
    
}

export function logoutAction ()
{
    // fb logout token
    LoginManager.logOut()

    // call navigation logout
    N.logoutAction()
}