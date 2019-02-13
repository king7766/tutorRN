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
import { TabNavigator, StackNavigator, SwitchNavigator, NavigationActions, createBottomTabNavigator} from 'react-navigation';
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

class onTopView2 extends TabNavigator{

  constructor (props){
    super(props);

  }

  render(){
    return <Tabs/>
  }
}

class onTopView extends Component {

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {

      isDialogVisible: false,
      modalVisible: false,
      loadingVisible: false,
      listeners :[]
    };  
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLoadingVisible(visible) {
    
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
      this.setModalVisible(popUpInfo.flag)
    }))

    this.state.listeners.push (DeviceEventEmitter.addListener('add', (a)=>{
      this.defaultAnimationDialog.show()
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
    this.showDialog()
    
    //DeviceEventEmitter.emit('popUp', {flag:true, age:23});
    //return ; //test
    
    //this.defaultAnimationDialog.show()
  }

  showDialog(){
    this.setState({isDialogVisible:true});
  }
  

  hideDialog(index){  
    this.setState({isDialogVisible:false});
  }

  popUpDialogBtnOnClickWithIndex (index)
  {
    this.setState({isDialogVisible:false});
    this.defaultAnimationDialog.show()
  }


  render() {
    //const UploadScreen = RNImagePicker;
    const UploadScreen = RNCameraRollPicker;

    return (
      
      <View style = {{ height: layout.deviceHeight + 30 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
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
          _dialogVisible={this.state.isDialogVisible}
          _dialogLeftBtnAction={()=> {this.hideDialog()}}
          _dialogRightBtnAction={()=>{this.hideDialog()}}
          onPress = {(index)=>{this.popUpDialogBtnOnClickWithIndex(index)}}
          closeView = {()=>{this.hideDialog()}}
        />
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
        
        <View style = {{ left:(layout.deviceWidth - 30 )/2, top: -70, height: 30, width: 30,backgroundColor :'blue', borderRadius:25  }} >
          <TouchableHighlight style={{ backgroundColor: layout.touchHighlightColor, width: 30, height: 30, borderRadius: 15, borderWidth:1, borderColor:layout.touchHighlightColor ,alignItems: 'center'}} onPress={()=>{this.addBtnOnClick()}}  >
            <Text
              style = {{color:'white', fontSize : 20, fontWeight:'bold' }}
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
  //search:animatedbasic,
  add: LessonStack,
  //lesson : LessonStack,
  //search : SearchStack,
  notice: NoticeStack,
  profile : ProfileStack,

  },
  {
    lazy: true,
    tabBarOptions: {
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress: (scene) => {
          console.log('onPress:', scene.route);
          //jumpToIndex(scene.index);
        },
      }),
      showIcon: true,
      showLabel: false,
      activeTintColor: '#fff',
      //inactiveTintColor: '#A9A9A9',
      inactiveTintColor : '#696969',
      

      style: {
        backgroundColor: 'rgba(22, 22, 22, 0.3)',
        borderTopWidth: 3,
        //borderTopColor: '#996600',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0

      }
      //selectedTabFontSize: 12,
      //tintColor: '#fff',
      //activeTintColor: '#eee',
      //activeTintColor: 'red',

      /*
      activeTintColor: '#fff',
      inactiveTintColor: '#A9A9A9',
      showIcon: true,
      showLabel: false,
      lazyLoad: true,
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: 'transparent'
      },
      style: {
        backgroundColor: 'rgba(22, 22, 22, 0.3)',
        borderTopWidth: 3,
        //borderTopColor: '#996600',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }
      */
    }

    /*
    navigationOptions: {
      header: <View 
        style = {{height:500, width:500, backgroundColor:'red'}}
      />
      }
    */
  }

  
);



/*
_navigate() {
  console.log('hihihi')
}
*/



const defaultGetStateForAction = Tabs.router.getStateForAction

Tabs.router.getStateForAction = (action, state) => {

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

  if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === 'add'))
  {
    console.log('add on pressed')
    //_navigate()
    DeviceEventEmitter.emit('add', {name:'John', age:23});

    return null
  }
  
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

//export default onTopView2;
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

