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


import {
  AddBtnPopUpDialog,
  CreateLessonView,
} from './view/ui/UIComponent';


import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';

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
        isDialogVisible: false
    };
}

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener('add', (a) => {
        //alert('收到通知：' + a);
        //this.showDialog()
        //this.hideDialog()
        this.defaultAnimationDialog.show()
    });
  }

  addBtnOnClick(){
    console.log('addBtnOnClick')

    this.showDialog()
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
    return (
      
      <View style = {{ height: layout.deviceHeight + 30 }}>
        
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

  },{
    lazy: true,
    tabBarOptions: {
      selectedTabFontSize: 12,
      tinColor: '#fff',
      //activeTintColor: '#eee',
      activeTintColor: 'red',
      inactiveTintColor: '#fff',
      showIcon: true,
      showLabel: true,
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

