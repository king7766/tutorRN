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
  FlatList,
  
  DeviceEventEmitter
} from 'react-native';

import * as M from 'tutorRN/src/service/membership'
import chatVM from 'tutorRN/src/VM/chatVM'
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




const userViewModel = userVM.getInstance()
const chatViewModel = chatVM.getInstance()


class ChatBox extends Component< Props>{


  constructor (props){
    super(props);

  }

  chatLayout()
  {

    //if ( this.props.data.sender_id != this.props.sender_id )
    if ( this.props.data.sender_id != this.props.sender_id )
      // sender
      return(
        <View 
          style = {{backgroundColor:'white', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', padding:5}}
        >
          <View
            style ={styles.ownerSideStyle}
          >
            <Text>{this.props.data.message}</Text>
          </View>
          
          <View
            style = {{padding:5}}
          >
            <Avatar
              onPress={() => {//this.AvatarOnClicked()
              }}
              round = {true}
              size = {40}
              //type = 'edit'
              url = {Assets.profile.default_avatar_man}
            />
          </View>
        </View>
    )
    else
    {
      return(
        <View 
          style = {{ backgroundColor:'white',flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingBottom:10}}
        >
          
          <View
            style = {{padding:5}}
          >
            <Avatar
              onPress={() => {//this.AvatarOnClicked()
                }}
              round = {true}
              size = {40}
              //type = 'edit'
              url = {Assets.profile.default_avatar_man}
            />
          </View>
          
          <View
            style ={styles.opponentSideStyle}
          >
            <Text >{this.props.data.message}</Text>
          </View>
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
    
    const { params } = this.props.navigation.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 
    const data = []
    for ( var i = 0 ; i < chatViewModel.getChat().length; i ++)
    {
      data.push(chatViewModel.getChat()[i])
    }

    this.state = {
      userVM: userViewModel,
      chatVM: chatViewModel,
      keyboardOnShow: false,
      dataSource: ds.cloneWithRows(data.sort(function(a,b){return a.id - b.id})),
      ddd : chatViewModel.getChat(),

      update_token: params ? params.update_token : null,
      sender_id: userViewModel.getUser().user_id,
      receiver_id: chatViewModel.getChatRoomDetail().receiver_id,
      showCalendarView: false,    
      lessonTimeDetail : '',
      chatUpdateInterval: 5000,
      chatRefreshDelay:1000,
    }

    this.showCalendar = this.showCalendar.bind(this) 
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.chatListRefresh()
    
  }

  componentWillMount = async() =>{

  }

  async componentDidMount() {
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

    this.chatUpdateInterval = setInterval(() => 
      this.chatUpdateCheck(), this.state.chatUpdateInterval
    )

  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    clearInterval(this.chatUpdateInterval)
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

  async chatUpdateCheck()
  {
    const token = await chatViewModel.getUpdateToken()
    if (token == this.state.update_token)
    {
      console.log('same !!! not need update UI')
    }
    else
    {
      console.log('token expired, update UI now')
      this.chatUpdate(token)
      
    }
  }

  chatUpdate(token)
  {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = []
    for ( var i = 0 ; i < chatViewModel.getChat().length; i ++)
    {
      data.push(chatViewModel.getChat()[i])
    }
    this.setState({
      dataSource: ds.cloneWithRows(data.sort(function(a,b){return a.id - b.id})),
      update_token: token,
    })

    this.refs.chatList.scrollTo(0)

    //this.chatListRefresh()
    
  }

  chatListRefresh()
  {
    
    //this.refs.chatList.scrollToEnd()

    /*
    setTimeout(()=>{
      // Update UI
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      this.refs.chatList.scrollToEnd({ animated:true })
    }, this.state.chatRefreshDelay); 
    */
  }

  confirmDateBtnOnClick()
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
    
    if ( this.state.lessonTimeDetail !== '')
    {

      return (
        <View style = {{margin:5,borderRadius:5, borderWidth:1, borderColor:layout.backgroundColor, height:70, alignItems:'center',flexDirection:'row', justifyContent:'space-around'}}>
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
            <Text style = {{height:40, textAlign:'center',}}> {this.state.lessonTimeDetail}</Text>
            <TouchableOpacity onPress={()=>this.confirmDateBtnOnClick()}
              style = {styles.confirmBtnStyle}
            > 
                <Text style = {[styles.confirmText, {padding:5}]}>
                  {strings.confirm}
                </Text>
             
            </TouchableOpacity>
          </View>
        {
          false ? 
          <Avatar
            round = {true}
            size = {40}
            type = 'edit'
            url = {Assets.profile.default_avatar_man}
          /> : <View style={{height:40, width:40}}/>
        }
           
        </View>
      )
    }
    else
    {
      return (
        <View style = {{margin:5,borderRadius:5, borderWidth:1, borderColor:layout.backgroundColor, height:70, alignItems:'center', justifyContent:'center'}}>
          <Text style = {{ textAlign:'center', fontSize:18, fontWeight:'bold'}}> {strings.startChat} </Text>
        </View>
        
      )
    }
  }

  textFieldUI()
  {
    return (
      <View style = {{height:40, padding:5}}>
        <TextInput
          ref= {(textfield) => { this.textfield = textfield }}
          style = {[styles.inputTextStyle, {padding:5}]}
          placeholder = {strings.messageHere}
          onSubmitEditing={(event) => this.keyboardSubmitHandle(event)}
        >
        </TextInput>
      </View>   
    )
  }

  keyboardSubmitHandle(event)
  {
    chatViewModel.addChat(event.nativeEvent.text)
    this.chatUpdateCheck()
    this.textfield.clear()
    
  }

  closeCalendar()
  {
    this.setShowCalendarView(false)
  }

  timeFromCalendarCallBack(day)
  {
    //對方提出以下時間預約 : {"\n"}2019年3月4日 由 19:00 至 20:0
    var dayString =  '對方提出以下時間預約 : \n'+ day
    this.setState({
      lessonTimeDetail:dayString,
    })
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
            <Image source={require('tutorRN/image/exit-100.png')} style={{height: 25, width: 25, marginLeft:10}} /> 
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
            confirmBtnOnClicked={(d)=>this.timeFromCalendarCallBack(d)}
          />
           
          
        </Modal>
        {
          this.topMessageUI()
        }
        <View style = {{height:10}}/>
        <FlatList
          inverted = {false}
          keyExtractor={(item, index) => index.toString()}
          ref="chatList"
          style = {{height:layout.deviceHeight - 100 - 200 - (this.state.keyboardOnShow ? 260:0) }}
          removeClippedSubviews = {false}
          data = {this.state.ddd}
          renderItem={({item})=>(
            <ChatBox data={item} sender_id={1}/>
          )}
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
    padding:5,
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:'white',
    //borderColor: layout.themeTextColor,
    borderColor: layout.backgroundColor,
    //color: 'black',
    overflow: 'hidden',
  },

  opponentSideStyle:{
    padding:5,
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:layout.backgroundColor,
    borderColor: layout.backgroundColor,
    //color: 'black',
    overflow: 'hidden',
  },
  inputTextStyle:{
    height:30, 
    borderRadius:15,
    borderWidth: 1,
    backgroundColor:'white',
    //borderColor: layout.themeTextColor,
    borderColor: layout.backgroundColor,
    color: 'black',
  },

  confirmBtnStyle:{
    height:26,
    width:80,
  },

  confirmText:{
    textAlign:'center',
    height:26,
    width:100,
    borderRadius:13,
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: layout.systemBlueColor,
    color: 'black',
    overflow: 'hidden',

  },

});


/*

<ListView
          //onContentSizeChange={() => this.chatList.scrollToEnd({animated: true})}
          ref='chatList'
          style = {{height:layout.deviceHeight - 100 - 200 - (this.state.keyboardOnShow ? 260:0) }}
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow = {
            (rowData, sectionID, rowID, higlightRow) => 
            //<ChatBox data={rowData} sender_id={this.state.sender_id}/>
            <ChatBox data={rowData} sender_id={1}/>
          }
        />
        */