/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Image,
  Modal,
  Keyboard,
  TextInput, 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  
  DeviceEventEmitter
} from 'react-native';

import * as M from 'tutorRN/src/service/membership'

import userVM from 'tutorRN/src/VM/userVM'
import strings from '../service/strings'
import {
  Avatar,
  Assets,
  //TopMenuBar,
  TutorRowFlatList,
  FilteringToolsBar,
} from 'tutorRN/src/view/ui/UIComponent';
import CalendarView from 'tutorRN/src/view/CalendarView';
const layout = require('tutorRN/src/Layout')



class ChatBox extends Component< Props>{

  constructor (props){
    super(props);

  }

  chatLayout()
  {
    if ( this.props.data.id == this.props.ownerId )
      // sender
      return(
        <View 
          style = {{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingBottom:10}}
        >
          <View style = {{width:10, height:10}}/>
          <Text style ={[styles.ownerSideStyle, {padding:5}]}>{this.props.data.message}</Text>
          <View style = {{width:10, height:10}}/>
          <Avatar
            onPress={() => {//this.AvatarOnClicked()
            }}
            round = {true}
            size = {40}
            type = 'edit'
            url = {Assets.profile.default_avatar_man}
          />
          <View style = {{width:10, height:10}}/>
        </View>
    )
    else
    {
      return(
        <View 
          style = {{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingBottom:10}}
        >
          <View style = {{width:10, height:10}}/>
          <Avatar
            onPress={() => {//this.AvatarOnClicked()
              }}
            round = {true}
            size = {40}
            type = 'edit'
            url = {Assets.profile.default_avatar_man}
          />
          <View style = {{width:10, height:10}}/>
          <Text style ={[styles.opponentSideStyle, {padding:5}]}>{this.props.data.message}</Text>
          <View style = {{width:10, height:10}}/>
        </View>
      )
    }
  }

  drawLayout()
  {
    if ( 1 )
    {
      // this is chat
      return(
        this.chatLayout()
      )
      
    }
    else if (2)
    {
      // this is calendar
    }
    else
    {

    }
    
  }

  render(){
    return (
      this.drawLayout()
    )
  }
}


class ChatHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      keyboardOnShow: false,
      dataSource: ds.cloneWithRows([
        { "id": 1, "message": "Hello, i wanna find a tutor" },
        { "id": 1, "message": "Here?" },
        { "id": 2, "message": "Sure, man" },
        { "id": 1, "message": "May i request a ..... a ..... May i request a ....." },
        { "id": 2, "message": "....." },
        { "id": 1, "message": "May i request a ....." },
        { "id": 2, "message": "....." },
        { "id": 1, "message": "May i request a ....." },
        { "id": 2, "message": "....." },
        { "id": 1, "message": "May i request a ....." },
        { "id": 2, "message": "....." },
        { "id": 1, "message": "May i request a ....." },
        { "id": 2, "message": "....." },
      ]),
      ownerId: 1,
      opponentId: 2,  
      showCalendarView: false,    
    }

    

    
    
    this.showCalendar = this.showCalendar.bind(this) 
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    
    //this.cellStyle = this.cellStyle.bind(this)
    //this.tabOnClicked = this.tabOnClicked.bind(this)
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    this.props.navigation.setParams({
      callCalendar : this.showCalendar
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow()
  {
    this.setState({
      keyboardOnShow:true
    })
  }

  _keyboardDidHide()
  {
    this.setState({
      keyboardOnShow:false
    })
  }

  confirmDataBtnOnClick()
  {

  }

  setShowCalendarView(b)
  {
    this.setState({
      showCalendarView: b,
    })
  }
  
  topMessageUI()
  {
    return (
      <View style = {{backgroundColor:'white',height:80, alignItems:'center',flexDirection:'row', justifyContent:'space-around'}}>
      {
        1 && 
        <Avatar
            round = {true}
            size = {40}
            type = 'edit'
            url = {Assets.profile.default_avatar_man}
        />
      }
        
        <View style = {{flexDirection:'column', alignItems:'center', }}>
          <Text style = {{height:40, textAlign:'center',}}> 對方提出以下時間預約 : {"\n"}2019年3月4日 由 19:00 至 20:00</Text>
          <TouchableOpacity onPress={()=>this.confirmDataBtnOnClick()}
            style = {styles.confirmBtnStyle}
          > 
              <Text style = {[styles.confirmText, {padding:5}]}>
                {strings.confirm}
              </Text>
           
          </TouchableOpacity>
        </View>
        {
          false ? <Avatar
            round = {true}
            size = {40}
            type = 'edit'
            url = {Assets.profile.default_avatar_man}
          /> : <View style={{height:40, width:40}}/>
        }
         
      </View>
    )
    return (
      <View style = {{height:60, alignItems:'center',flexDirection:'column', justifyContent:'center'}}>
        <Text style = {{ textAlign:'center'}}> 你們現在可以開始對話 </Text>
      </View>
      
    )
  }

  textFieldUI()
  {
    return (
      <View style = {{height:40, padding:5}}>
        <TextInput
          style = {[styles.inputTextStyle, {padding:5}]}
          placeholder = {strings.messageHere}
        >
        </TextInput>
      </View>   
    )
  }

  closeCalendar()
  {
    this.setShowCalendarView(false)
  }

  showCalendar()
  {
    console.log('showCalendar')

    this.setShowCalendarView(true)
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <TouchableOpacity 
          onPress={() => params.callCalendar()}
        >
          <View style = {{height: 30, width: 100, justifyContent: 'center', flexDirection: 'row'}}>
            <Image source={require('tutorRN/src/image/exit-100.png')} style={{height: 25, width: 25, marginLeft:10}} /> 
          </View>
        </TouchableOpacity>
      ),
    }
  }

  
  render() {

    return (
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible = {this.state.showCalendarView}
        >
          
          <CalendarView 
            spaceOnPress={()=>this.closeCalendar()}
          />
           
          
        </Modal>
        {
          this.topMessageUI()
        }
        <View style = {{height:10}}/>
        <ListView
          style = {{height:layout.deviceHeight - 100 -200- (this.state.keyboardOnShow ? 260:0) }}
          removeClippedSubviews={false}
          //style = {{flex:1}}
          //contentContainerStyle = {styles.list}
          dataSource={this.state.dataSource}
          //renderRow={(rowData) => <Image>{rowData}</Image>}
          renderRow = {(rowData, sectionID, rowID, higlightRow) => <ChatBox data={rowData} ownerId={1}/>}
          //renderRow = {(rowData, sectionID, rowID, higlightRow) => <View style ={{height:30, flex:1}} backgroundColor='green'/>}
        />
        {
          this.textFieldUI()
        }  
      </View>
    );
  }
}

export default ChatHomeView;

const styles = StyleSheet.create({   
  
  ownerSideStyle:{  
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:'white',
    //borderColor: layout.themeTextColor,
    borderColor: layout.shadowColor,
    color: 'black',
    overflow: 'hidden',
  },

  opponentSideStyle:{
    
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:layout.shadowColor,
    borderColor: layout.shadowColor,
    color: 'black',
    overflow: 'hidden',
  },
  inputTextStyle:{
    height:30, 
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:'white',
    //borderColor: layout.themeTextColor,
    borderColor: layout.shadowColor,
    color: 'black',
  },

  confirmBtnStyle:{
    height:30,
    width:80,
  },

  confirmText:{
    textAlign:'center',
    height:30,
    width:80,
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: layout.systemBlueColor,
    color: 'black',
    overflow: 'hidden',

  },

});
