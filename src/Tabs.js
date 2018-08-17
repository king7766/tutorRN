import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import { TabNavigator, StackNavigator, SwitchNavigator, NavigationActions, createBottomTabNavigator} from 'react-navigation';
//import { BottomNavigation } from 'react-native-paper';


import Welcome from './view/Welcome'

const layout = require('./Layout')

// Tab 1
import NewsStack from './stack/NewsStack'

// Tab 2
import LessonStack from './stack/LessonStack'

// Tab 3
import SearchStack from './stack/SearchStack'

// Tab 4
import NoticeStack from './stack/NoticeStack'

// Tab 5
import ProfileStack from './stack/ProfileStack'
import { action } from '../node_modules/mobx';

class onTopView extends Component {

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener('add', (a) => {
        //alert('收到通知：' + a);
        console.log('addBtnOnClicked !!!!')
    });
  }



  render() {
    return (
      
      <View style = {{ height: layout.deviceHeight + 40 }}>
        
        
        <Tabs 
          
          addBtnOnClicked={ this.addBtnOnClicked }
        />
        <View style = {{ left:(layout.deviceWidth - 30 )/2, top: -70, height: 30, width: 30,backgroundColor :'blue', borderRadius:25  }} >
          <TouchableHighlight style={{ backgroundColor: layout.touchHighlightColor, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}} onPress={()=>{console.log('touched');}}  >
            <Text
              style = {{color:'white'}}
            >
              +
            </Text>
          </TouchableHighlight>
        </View>
       
        
      </View>
    )
  }
}

const Tabs = TabNavigator({

  news: NewsStack,
  search: SearchStack,
  add: LessonStack,
  //lesson : LessonStack,
  //search : SearchStack,
  notice: NoticeStack,
  profile : ProfileStack,

  },{
  lazy: true
  }

  
);



/*
_navigate() {
  console.log('hihihi')
}
*/



const defaultGetStateForAction = Tabs.router.getStateForAction;

Tabs.router.getStateForAction = (action, state) => {
  if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'add'))
  {
    console.log('add on pressed')
    //_navigate()
    DeviceEventEmitter.emit('add', {name:'John', age:23});

    return null;
  }
  return defaultGetStateForAction(action, state)
}

export default onTopView;


/*
export default class App extends Component<Props> {
  render() {
    return (
      <Tabs />
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

