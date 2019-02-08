const FBSDK = require('react-native-fbsdk');
const {LoginButton, ShareDialog, AccessToken, GraphRequest,
  GraphRequestManager,} = FBSDK;
//const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

import userVM from 'tutorRN/src/VM/userVM'
import * as E from 'tutorRN/src/service/env-config'
import * as N from 'tutorRN/src/service/navigation'

const userViewModel = userVM.getInstance()

export function facebookAccountCheck ()
{
    AccessToken.getCurrentAccessToken().then((data) => {
        console.log('FBSDK data = ' + data)
        
        if ( data )
        {
            var newArr = Object.keys(data);
            var mappedArr = newArr.map(function(i) {
                return [i, data[i]];
            });
            console.log(mappedArr);

            getFacebookData()
        }
        else
        {

            // facebook token expired
            console.log('facebook token expired')
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

        console.log('facebook result : ')

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
        N.loginAction( userViewModel.getUser().user_login );
      
    }
    else{

        console.log('no this account , go to registration')
        // go registration 
    }
}

export function registration()
{

}

export function logoutAction ()
{
    // fb logout token
    LoginManager.logOut()

    // call navigation logout
    N.logoutAction()
}