import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
  SafeAreaView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { TabBarTop, TabNavigator, StackNavigator, SwitchNavigator, NavigationActions, createBottomTabNavigator} from 'react-navigation';
//import { BottomNavigation } from 'react-native-paper';


import Welcome from './view/Welcome'

import RNCameraRollPicker from 'tutorRN/src/Libs/RNCameraRollPicker'
import LoadingScreen from 'tutorRN/src/view/LoadingScreen'
import RNImagePicker from 'tutorRN/src/Libs/RNImagePicker'

const layout = require('tutorRN/src/Layout')

// Tab 1
import NewsStack from 'tutorRN/src/stack/NewsStack'

// Tab 2
import LessonStack from 'tutorRN/src/stack/LessonStack'

// Tab 3
import SearchStack from 'tutorRN/src/stack/SearchStack'

// Tab 4
import NoticeStack from 'tutorRN/src/stack/NoticeStack'

// Tab 5
import ProfileStack from 'tutorRN/src/stack/ProfileStack'
import { action } from '../node_modules/mobx';

import PopUpView from './view/PopUpView'
import alert from 'tutorRN/src/service/alert'
import * as C from 'tutorRN/src/service/connection'

import {
  AddBtnPopUpDialog,
  CreateLessonView,
} from './view/ui/UIComponent';


import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import strings from './service/strings';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

/*
const backgroundColor = props.position.interpolate({
  inputRange: [0,1,2],
  outputRange: ['#e74c3c','#9b59b6','#3498db'],
})
*/


const indicatorStyle = (props, alignSelf) => ({
	backgroundColor: props.activeTintColor,
	alignSelf: 'flex-start',
});

const TabBarComponent = (props) => (<BottomTabBar {...props} />)


class onTopView extends Component {

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      createLessonViewVisible : false,
      addBtnOnTopViewVisible: false,
      uploadScreenVisible: false,
      loadingVisible: false,

      listeners :[]
    };  
  }

  setCreateLessonViewVisible (visible)
  {
    this.setState({
      createLessonViewVisible:visible
    })
  }

  setAddBtnOnTopViewVisible(visible)
  {
    this.setState({
      addBtnOnTopViewVisible: visible
    })
  }

  setUploadScreenVisible(visible) {
    this.setState({
      uploadScreenVisible: visible
    })
  }

  setLoadingVisible(visible) {
    
    console.log('start loading : ' + visible )
    if ( visible == this.state.loadingVisible)
    {
      return
    }
    
    this.setState({
      loadingVisible:visible
    })
  }

  componentWillMount()
  {
    console.log('Tabs componentWillMount')
  }

  componentDidMount() {
    console.log('Tabs componentDidMount')

    this.state.listeners.push (DeviceEventEmitter.addListener('popUp', (popUpInfo)=>{
      this.setUploadScreenVisible(popUpInfo.flag)
    }))

    this.state.listeners.push (DeviceEventEmitter.addListener('add', (a)=>{
      this.setAddBtnOnTopViewVisible(true)
      //this.defaultAnimationDialog.show()
    }))

    this.state.listeners.push (DeviceEventEmitter.addListener('alert', (info)=>{
      alert.getInstance().showAlert(info);
    }))

    this.state.listeners.push (DeviceEventEmitter.addListener('loading', (info)=>{
      this.setLoadingVisible(info.flag)
    }))
  

    /*
    
    this.de = DeviceEventEmitter.addListener('popUp', (popUpInfo)=>{
      this.setModalVisible(popUpInfo.flag)
      //console.log(popUpInfo);
    })
    
    
    this.deEmitter = DeviceEventEmitter.addListener('add', (a) => {
        //alert('收到通知：' + a);
        //this.showDialog()
        //this.hideDialog()
        this.defaultAnimationDialog.show()
    });
    
    DeviceEventEmitter.addListener('popUp', (popUpInfo)=>{
      this.setModalVisible(popUpInfo.flag)
      //console.log(popUpInfo);
    })
    
    DeviceEventEmitter.addListener('alert', (info)=>{
      //console.log('alert : ' +info.error);
      alert.getInstance().showAlert(info);
    })

    DeviceEventEmitter.addListener('loading', (info)=>{
      
      this.setLoadingVisible(info.flag)
      
    })
    */
  }

  componentWillUnmount() {
  
    console.log('Tabs componentWillUnmount')

    this.state.listeners.map((listener ) => {
      listener.remove()
    });
  }

  addBtnOnClick(){
    console.log('addBtnOnClick')
    this.setCreateLessonViewVisible(true);
    return 

    this.setAddBtnOnTopViewVisible(true)
    //this.setCreateLessonViewVisible(true)
    //this.setUploadScreenVisible(true)
    
    
    //this.showDialog()

    //DeviceEventEmitter.emit('popUp', {flag:true, age:23});
    //return ; //test
    
    //this.defaultAnimationDialog.show()
  }

  addBtnOnTopViewOnClickWithIndex (index)
  {
    this.setAddBtnOnTopViewVisible(false);
    this.setCreateLessonViewVisible(true);


    //this.setState({isDialogVisible:false});
    //this.defaultAnimationDialog.show()
  }


  render() {
    //const UploadScreen = RNImagePicker;
    const UploadScreen = RNCameraRollPicker;

    return (
      
      <View style = {{ height: layout.deviceHeight + 30 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible = {this.state.uploadScreenVisible}
        >
          <UploadScreen />
        </Modal>
        <Modal 
          transparent={true}
          visible = {this.state.loadingVisible}
        >
          <LoadingScreen />
        </Modal>
                                        
        <AddBtnPopUpDialog
          _dialogVisible={this.state.addBtnOnTopViewVisible}
          //_dialogLeftBtnAction={()=> {this.hideDialog()}}
          //_dialogRightBtnAction={()=>{this.hideDialog()}}
          
          onPress = {(index)=>{this.addBtnOnTopViewOnClickWithIndex(index)}}
          closeView = {()=>{this.setAddBtnOnTopViewVisible(false)}}
        />
        <Modal
          animationType="slide"
          transparent= {false}
          visible = {this.state.createLessonViewVisible}
        >
          <CreateLessonView 
            createLessonFinished = {()=>{this.setCreateLessonViewVisible(false)}}
            cancelBtnOnClicked = {()=>{this.setCreateLessonViewVisible(false)}}
          />
        </Modal>
        

       
        <PopupDialog
          //style = {{position:'absolute', top: 10}}
          dialogTitle={<DialogTitle title="新增課堂" />}
          //height= {350}
          //height= {layout.deviceHeight * 2 / 3}
          //dialogStyle={{marginTop:-300}} 
          dialogStyle={{ position:'absolute', top: layout.deviceWidth/3}} 
          //ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          // <TouchableHighlight underlayColor = {'transparent'} onPress={() => { this.refs._scrollView.scrollTo({x:SCREEN_WIDTH}) }}>
          ref={(defaultAnimationDialog) => {
            this.defaultAnimationDialog = defaultAnimationDialog;
          }}
        >
          <CreateLessonView/>
        </PopupDialog>
        <Tabs 
          addBtnOnClicked={ this.addBtnOnClicked }
        />
        {
          /*
          <View style = {{ left:(layout.deviceWidth - 30 )/2, top: -70, height: 30, width: 30,backgroundColor :'white', borderRadius:25  }} >
            <TouchableHighlight style={{ backgroundColor: layout.touchHighlightColor, width: 30, height: 30, borderRadius: 15, borderWidth:1, borderColor:layout.touchHighlightColor ,alignItems: 'center'}} 
              onPress={()=>{this.addBtnOnClick()}}  
            >
              <Text
                style = {{color:'black', fontSize : 20, fontWeight:'bold' }}
              >
                +
              </Text>
            </TouchableHighlight>
          </View>
          */ 
        }
        
        
      </View>
      
    )
  }
}

const tabOptions = {    
  tabBarOptions: {
      activeTintColor:'white',
      inactiveTintColor:'#D3D3D3',
      style:{
          backgroundColor:'green',
          borderTopWidth:1,
          borderTopColor:'#D3D3D3'
      },
      indicatorStyle: {
          backgroundColor: 'red',
      },
  },
}

const Tabs = TabNavigator(
  {
    search: SearchStack,  
    news: NewsStack,
    //search: SearchStack,  
    add: LessonStack,
    notice: NoticeStack,
    profile : ProfileStack,

  },
  {
    
    tabBarComponent: props => (
      <TabBarTop {...props} 
        indicatorStyle={{ 
          backgroundColor: 'white',
          height: 2,
          bottom:25,
        }} 
      />
    ),
  
    lazy: true,
    //tabBarComponent: (props)=> <TabBarTop {...props} indicatorStyle={indicatorStyle(props, 'flex-end')} />,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
        height: 10,
        width:60,
        marginLeft: 30
      },
      showIcon: true,
      showLabel: false,
      iconStyle: {
        //width: 50,
        height: 50
      },
      //activeTintColor: '#fff',
      //activeTintColor: '#808080',
      //inactiveTintColor: '#D3D3D3',
      //inactiveTintColor : '#696969',
      //activeTintColor: layout.touchHighlightColor,
      activeTintColor : '#FFFFFF',
      inactiveTintColor : '#FFFFFF',
      
      
      style: {
        backgroundColor: 'rgba(22, 22, 22, 0.7)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        height: 90
      }
    }
});

const defaultGetStateForAction = Tabs.router.getStateForAction

Tabs.router.getStateForAction = (action, state) => {

  /*
  //const userToken = AsyncStorage.getItem('userToken').then
  AsyncStorage.getItem('userToken').then((userToken) => {
    // this work !!

    if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'profile'))
    {
      //DeviceEventEmitter.emit('alert', {error : strings.notLoginErrorMessage})

      //const userToken =  await AsyncStorage.getItem('userToken');
      console.log('profile on pressed : ' + userToken)
      if ( userToken == 'guest')
      {
      
        //DeviceEventEmitter.emit('alert', {error : strings.notLoginErrorMessage})
        return null 
      }

    }
  })
  */


  console.log('action.routeName = ' + action.routeName)
  
  if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'news'))
  {
    //DeviceEventEmitter.emit('changeTab', {})
    DeviceEventEmitter.emit('player', {state:1})

  }else if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'add')){

    //DeviceEventEmitter.emit('player', {state:0})
    DeviceEventEmitter.emit('add', {name:'John', age:23});
    return null
  }
  else
  {
    DeviceEventEmitter.emit('player', {state:0})
  }

  /*
  if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'add'))
  {
    console.log('add on pressed')
    //_navigate()
    DeviceEventEmitter.emit('add', {name:'John', age:23});

    return null
  }
  */

  /*
  if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'profile'))
  {
    //DeviceEventEmitter.emit('alert', {error : strings.notLoginErrorMessage})

    //const userToken =  await AsyncStorage.getItem('userToken');
    console.log('profile on pressed : ' + userToken)
    if ( userToken == 'guest')
    {
      DeviceEventEmitter.emit('alert', {error : strings.notLoginErrorMessage})
      return null 
    }

  }
  */
  //return Tabs.router.getStateForAction( action, state)
  return defaultGetStateForAction(action, state)
}


export default onTopView;
//export default Tabs;


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

