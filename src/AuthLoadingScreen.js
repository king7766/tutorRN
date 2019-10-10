import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  DeviceEventEmitter,
} from 'react-native';
import * as M from 'tutorRN/src/service/membership'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.init();
  }
  
  init ()
  {
    this.deEmitter = DeviceEventEmitter.addListener('signOut', (a) => {
      //alert('收到通知：' + a);
      console.log('signOut Action');
      //const userToken =  AsyncStorage.getItem('userToken');
      this.props.navigation.navigate('Auth');
      //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    });

    DeviceEventEmitter.addListener('signIn', (token) => {
      //alert('收到通知：' + a);
      console.log('signIn Action with ', token);
      this.props.navigation.navigate('App');
      
    });


    //const userToken = AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    const userPassword = await AsyncStorage.getItem('userPassword');
    //userPassword = '1111'

    console.log('userToken = ' + userToken + ' , password = ' + userPassword)
    //M.facebookAccountCheck()

    if ( userToken == null )
    {
      this.props.navigation.navigate('Auth');
      return
    }

    
   

    if( userToken == 'guest')
    {
      //M.facebookTokenCheck()
      this.props.navigation.navigate('App');
    }
    else
    {
      
      if ( isFinite(String(userToken)) )
      {
        // go facebook check

        M.facebookAccountCheck()

        /*
        // facebook id
        if ( res == true )
        {
          // success
          console.log('fb token ok')
        }
        else{
          console.log('fb token fail')
        }
        */

      }
      else{
        // email account 
        console.log('this is email login account ')

        M.loginAction(userToken, userPassword, null)
        
        
        
      }

      return

      if ( M.facebookAccountCheck() )
      {
        // this is facebook acc
      }
      else
      {
        // this is not facebook acc
      }

      //M.facebookCheck()
    }
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default AuthLoadingScreen;