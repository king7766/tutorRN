
import {
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';

export async function logoutAction ()
{
    await AsyncStorage.clear();
    DeviceEventEmitter.emit('signOut', {});
}


export async function loginAction (token)
{
    await AsyncStorage.setItem('userToken', token );
    DeviceEventEmitter.emit('signIn', token);
}