/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {observer} from 'mobx-react'
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage,
  CameraRoll,
  FlatList,
} from 'react-native';


import ReactNativeComponentTree from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree';

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Picker from 'react-native-picker';
import locationVM from 'tutorRN/src/VM/locationVM'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import * as M from 'tutorRN/src/service/membership'

import alert from 'tutorRN/src/service/alert'
import LoadingScreen from 'tutorRN/src/view/LoadingScreen'

const layout = require('tutorRN/src/Layout')
/*
import Avatar from 'tutorRN/src/view/ui/Avatar';
import Assets from 'tutorRN/src/view/ui/Assets';
import TopMenuBar from 'tutorRN/src/view/ui/TopMenuBar';
import TutorRowFlatList from 'tutorRN/src/view/ui/TutorRowFlatList';
import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
*/

const locationViewModel = locationVM.getInstance()

import {
  Avatar,
  Assets,
  //TopMenuBar,
  TutorRowFlatList,
  FilteringToolsBar,
} from 'tutorRN/src/view/ui/UIComponent';
import strings from '../service/strings';

@observer
class Register extends Component<Props> {
  constructor(props) {    
    super(props);

    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.next = this.next.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.selectedPhoto = this.selectedPhoto.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      loadingVisible : false,
      photo: '',
      //albumPhoto:'',
      email:'',
      password: '',
      name: '',
      gender: '',
      job: '',
      education: '',
      brithday:'',
      location: '',
      photos : [],
      rowTitle:[strings.gender, strings.job, strings.education,strings.location ,'出生日期'],
      rowDataChoose: [
        [strings.gender_m, strings.gender_f],
        ['文員', '運輸','教學', '體育' ],
        [strings.education_low, strings.education_mid, strings.education_high, strings.education_exHigh],
        [locationViewModel.getLocationName()]
      ],
      
      rowData :['','','','',''],

    }
  }

  componentWillMount() {
    this.mounted = true

    var tmp = []
    for ( var i = 0; i < locationViewModel.getFullList().length ; i ++)
    {
      tmp.push ('=== ' + locationViewModel.getDistrict()[i].district_name  + ' ===')
  
      for (var j = 0 ; j < locationViewModel.getLocationListFromDistrict(i).length ; j ++ )
      {
        var item = locationViewModel.getLocationListFromDistrict(i)[j].location_name
        tmp.push(item)
      }
    }

    this.setState({
      locationSelectArray: tmp,
    })
  }

  textInputStyle(index)
  {
    //console.log('textInputStyle = '+ index)
    return {
      paddingLeft: 5,
      color: 'gray',
      backgroundColor: 'white',
      
    }

  } 

  handleInputChange(event)
  {
    console.log(JSON.stringify(event.nativeEvent))
    
    const element = ReactNativeComponentTree.getInstanceFromNode(event.nativeEvent.target);
    const name = element._currentElement.props.name
    if ( element._currentElement.props.name == 'account'){
      this.setState({
        account: event.nativeEvent.text
      })
    }else if ( element._currentElement.props.name == 'password'){
      this.setState({
        password: event.nativeEvent.text
      })
    }else if ( element._currentElement.props.name == 'name'){
      this.setState({
        name: event.nativeEvent.text
      })
    } 
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  async next ()
  {

    this.setState({
      loadingVisible: true
    })

    console.log('next : ' +this.state.account)

    const rawData = {
      token : 'xRW8DwqoIxZBSlF83b2P',
      login : this.state.account,
      password : this.state.password,
      nickname : this.state.name,
      sex: this.state.rowData[0],
      occupation: this.state.rowData[1],
      education : this.state.rowData[2],
      location : locationViewModel.getLocationIdByName(this.state.rowData[3]),
      birth : this.state.rowData[4],
    }
    
    /*
    const rawData = {
      token : 'xRW8DwqoIxZBSlF83b2P',
      login : 'T013@g.com',
      password : '1111',
      nickname : 'T013',
      sex: 'M',
      occupation: 'IT',
      education : 'U',
      location : 1,
      birth : '1990-01-01',
    }
    */

    const registerData = new FormData();

    var photo = this.state.photos[this.state.selectedAlbumPhotoIndex]
    var imageName = photo.node.image.uri.split("=")[1].split("&")[0] +'.' + photo.node.image.uri.split("=")[2]
    var type = photo.node.type
    var uri = photo.node.image.uri

    console.log('name = ' + imageName)
    console.log('type = ' + type)
    console.log('uri = ' + uri)

    registerData.append('image_thumb', {
      name: imageName,
      type: type,
      uri: uri          
    });

    Object.keys(rawData).forEach(key => {
      registerData.append(key, rawData[key]);
    });

    const res = await fetch(E.REGISTER_USER, {
      method: "POST",
      //body: createFormData(this.state.photo, { userId: "123" })
      body: registerData,
    })
    .then( response => response.json())
    .then( response => {
      console.log('sss : ' + JSON.stringify(response) )
      
      this.setState({ loadingVisible: false }, function() {
        setTimeout(
          () => {
            if ( response.user_id != undefined )
            {
              AsyncStorage.setItem('userPassword', this.state.password )
              alert.getInstance().showAlert({title:'創立成功', message:'你的會員帳號: ' + this.state.account})
              this.props.navigation.navigate('App')    
            }
            else
            {
              console.log('register failed ')
              alert.getInstance().showAlert({title:'創立失敗', message:'Error : ' + response})
            }
          },
          500
        )
      });      
    })
    .catch (error =>{
 
      this.setState(
        { loadingVisible: false }, 
        () => 
        setTimeout(
          () => {alert.getInstance().showAlert({title:'創立失敗', message:'Error : ' + error}) },
          500
        )
         
      )
        //alert.getInstance().showAlert({title:'創立失敗', message:'Error : ' + error})
      //})
      
      //return error
      
    })

    
    
    


      //login : '201908211518@gmail.com',
      //password : 'abcd1234',
      //nickname : "222p",
      //sex : 'null',
      //occupation : 'IT',
      //education : 'Degree',
      
      //location : "HK",
      /*
      thumb : 
      {
        name: this.state.photo.node.image.uri.split("=")[1].split("&")[0],
        type: this.state.photo.node.type,
        //uri: Platform.OS === "android" ? photo.uri : photo.node.image.uri.replace("assets-library://", "")
        uri : this.state.photo.node.image.uri,
      },
      */
    

    //return 
    
    /*
      fetch(E.UPLOAD_FILE, {
        method: "POST",
        //body: createFormData(this.state.photo, { userId: "123" })
        body: data,
      })
        .then(response => response.json())
        .then(response => {
          console.log("upload succes : ", response);
        })
        .catch(error => {
          console.log("upload error", error);
        });
    */

    /*
    const data = new FormData()
    data.append("fileToUpload", {
      name: "123imageFile",
      type: this.state.photo.node.type,
      //uri: Platform.OS === "android" ? photo.uri : photo.node.image.uri.replace("assets-library://", "")
      uri : this.state.photo.node.image.uri,
    });
    
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    */
    

    //return 

    /*
    const res = await M.registrationAction(registerData)
    if ( res == true )
    {
      await AsyncStorage.setItem('userPassword', this.state.password )
      this.props.navigation.navigate('App')
      
    }
    else
    {
      console.log('register failed ')
    }
    */
    //this.loginAction(data.login, data.password, data)

  }

  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    var tempArray 
    var rowData = this.state.rowData
    if ( index < 3)
    {
      tempArray = this.state.rowDataChoose[index]
    }else if ( index == 3)
    {
      tempArray = locationViewModel.getLocationName()
    }
    else{
      tempArray = this._createDateData()
    }
      
    Picker.init({
      pickerData: tempArray,
      pickerTitleText:strings.pleaseChoose,        pickerConfirmBtnText:strings.confirm,
      pickerCancelBtnText: strings.cancel,
      selectedValue: tempArray,
      onPickerConfirm: pickedValue => {
        var pickerData = ''
        if ( index == 4){
          pickerData = pickedValue[0] + '' + pickedValue[1] +''+ pickedValue[2]
        }else {
          pickerData = pickedValue[0]
        }
        rowData.splice(index, 1, pickerData)
        this.setState({ rowData: rowData })
      },
      onPickerCancel: pickedValue => {            
        console.log('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
        console.log('area', pickedValue);
      }
    });
    Picker.show();
  }

  uploadPhoto () {
    
    
    //this.props.navigation.navigate('App');
    //return
    //this.popupDialog.show();
    this.defaultAnimationDialog.show();
    
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      let a = this.state.photos.slice()
      //a[0] = Assets.profile.default_avatar_man
      //a[1] = Assets.profile.default_avatar_girl
      
      for ( var i = 0; i< r.edges.length; i ++ )
      {
        //a[2+i] = r.edges[i]
        a[i] = r.edges[i]
      }
      this.setState({ photos: a });
      
      //this.setState({ photos: r.edges });
    })
    .catch((err) => {
      console.log(err)
       //Error Loading Images
    })
  }

  selectedPhoto(index)
  {
    this.defaultAnimationDialog.dismiss(() => {

      //var p =  this.state.photos[index]
      this.setState({
        //selectedAlbumPhotoIndex: this.state.photos[index]
        photo : this.state.photos[index],
        selectedAlbumPhotoIndex: index
      })
    });
  }

  _createDateData() {
    var today = new Date();
    let date = [];
    for(let i=1900 ; i < today.getFullYear() ;i++){
        let month = [];
        for(let j = 1;j<13;j++){
            let day = [];
            if(j === 2){
                for(let k=1;k<29;k++){
                    day.push(k+'日');
                }
                //Leap day for years that are divisible by 4, such as 2000, 2004
                if(i%4 === 0){
                    day.push(29+'日');
                }
            }
            else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                for(let k=1;k<32;k++){
                    day.push(k+'日');
                }
            }
            else{
                for(let k=1;k<31;k++){
                    day.push(k+'日');
                }
            }
            let _month = {};
            _month[j+'月'] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i+'年'] = month;
        date.push(_date);
    }
    return date;
  }

  AvatarOnClicked()
  {
    console.log('AvatarOnClicked')
    this.uploadPhoto()
  }

  renderItem = ({item, index}) =>
    <TouchableHighlight onPress={()=>this.selectedPhoto(index)}>
      <View style={{
        flex: 1,
        margin: 5,
        width: (layout.deviceWidth- 20)/2,
        maxWidth: (layout.deviceWidth- 20)/2,
        height: (layout.deviceWidth- 20)/2,
        maxHeight: (layout.deviceWidth- 20)/2,
        backgroundColor: '#CCC',
      }}>
        <Image
          style = {{height:(layout.deviceWidth- 20)/2, width:(layout.deviceWidth- 20)/2}}
          //source={{ uri: item.node.image.uri }}
          source={ item.node ? { uri: item.node.image.uri } : item}
        />
      </View>
    </TouchableHighlight>
  
  render() {
    
    return (
      //<SafeAreaView
      //  styles = {{flex:1}}
      //>
      <View>
        <Modal 
          transparent={true}
          visible = {this.state.loadingVisible}
        >
          <LoadingScreen />
        </Modal>
        <PopupDialog
          //style = {{position:'absolute', top: 10}}
          dialogTitle={<DialogTitle title={strings.pleaseSelectPhoto}/>}
          //height= {350}
          height= {layout.deviceHeight * 2 / 3}
          //dialogStyle={{marginTop:-300}} 
          dialogStyle={{ position:'absolute', top: 50}} 
          
          //ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          ref={(defaultAnimationDialog) => {
            this.defaultAnimationDialog = defaultAnimationDialog;
          }}
        >
          
          
          <View
            style = {{backgroundColor: 'white'}}
            //styles = {{height:layout.deviceHeight*3/5, backgroundColor: 'red'}}
          >
            <FlatList
              style = {{ height: (layout.deviceHeight * 2/ 3) - 50}}
              numColumns ={2}
              contentContainerStyle={styles.list}
              //data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'}, {key: 'e'},{key: 'f'},{key: 'g'}, {key: 'h'},{key: 'i'},{key: 'j'}]}
              data = {this.state.photos}
              renderItem={this.renderItem}
            />
          </View>
        </PopupDialog>
        

        <ScrollView>
          <View style={{ height:40, justifyContent: 'center'}}>
            <Text style = {{ color: 'black', paddingLeft: 10 }}>
              {strings.avatar}
            </Text>
          </View>
          <TouchableHighlight
            onPress={this.uploadPhoto}
            //underlayColor = {layout.themeTextColor}
          >
          {
            this.state.photo ? 
              <View
                style = {{ alignItems:'center', backgroundColor : 'white'}}
              >
                <Avatar
                  onPress={() => {
                    //console.log('123123')
                    //'https://placeimg.com/140/140/any'
                    //this.state.photo.node.image.uri
                    this.AvatarOnClicked()
                  }}
                  round = {true}
                  size = {70}
                  type = 'edit'
                  //url = {this.state.photo.node.image.uri}
                  url = {this.state.photo}
                  //url = { this.state.photo.node ? this.state.photo.node.image.uri : this.state.photo }
                />
                
              </View> 
            : (
              <View style={styles.uploadButton}>
                <Text style = {styles.uploadText}>
                  {strings.uploadPhoto}
                </Text>
              </View>
            )
          }
            
          </TouchableHighlight>

          <View style={{
            //backgroundColor : 'rgba(255, 255, 255, 1.0)',
            height:40,
            flex:1,
            justifyContent: 'center'
          }}
          >
            <Text style = {styles.headingText}>
              {strings.generalInformation}
            </Text>
          </View>

          <TextInput 
            onChange= {this.handleInputChange}
            name = 'account'
            style = {styles.inputTextFieldStyle}
            placeholder = {strings.emailPlaceHolder}
          />
          <TextInput 
            onChange= {this.handleInputChange}
            name = 'password'
            style = {styles.inputTextFieldStyle}
            secureTextEntry={true}
            placeholder = {strings.passwordPlaceHolder}
          />

          <TextInput 
            onChange= {this.handleInputChange}
            name = 'name'
            style = {styles.inputTextFieldStyle}
            placeholder = {strings.name}
          />
          <View style={{ height:40, flex:1, justifyContent: 'center'}}>
            <Text style = {styles.headingText}>
              {strings.detailInformation}
            </Text>
          </View>
          <View>
            {
              this.state.rowTitle.map(
                (item, index) =>
                (
                  <TouchableHighlight 
                    onPress={() => this.rowOnClick(index)}
                    key = {index}
                  >
                    <View
                      style = {styles.textInputView}
                      key = {index}
                    >
                      <Text
                        style = {this.textInputStyle(index)}
                      >
                        {item}
                      </Text> 
                      <Text
                        style = {styles.inputTextStyle}
                      >
                        {this.state.rowData[index]}
                      </Text> 
                    </View>
                  </TouchableHighlight>
                )
              )
            }
          </View>
          <View style={{
            //backgroundColor : 'rgba(255, 255, 255, 1.0)',
            height:40,
            flex:1,
            justifyContent: 'center',
            alignItems:'center'     
          }}
          >
            <Text style = {{
              color: 'black',
              paddingLeft: 10,
              paddingRight: 10
            }}
            >
              註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註
            </Text>
          </View>
          <TouchableHighlight onPress={this.next}>
            <View style={styles.registerButton}>
              <Text style = {styles.registerText}>
                {strings.register}
              </Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  textInputView: {
    flexDirection:'row',
    width: '100%',
    height: 40,
    //flex: 1,
    //justifyContent: 'center',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    //backgroundColor : 'rgba(242,242,242,1)'
    backgroundColor: 'white',
  },
  passwordField:{
    width: '100%',
    height: 40,
    backgroundColor : 'rgba(242,242,242,1)'
  },

  uploadButton: {

    //backgroundColor : 'rgba(61,89,148,1)',
    backgroundColor: layout.themeTextColor,
    height:40,
    flex:1,
    justifyContent: 'center'
    //alignItems:'center'     
  },
  uploadText:{
    paddingLeft: 10,
    color: 'white',
    fontSize:16
  },

  registerButton:{
    backgroundColor : 'white',
    height:40,
    flex:1,
    justifyContent: 'center',
    alignItems:'center'  

  },
  registerText:{
    color : layout.themeTextColor,
    //paddingLeft: 10,
    fontWeight: 'bold',
    fontSize:16
  },
  inputTextFieldStyle:{
    height:40, 
    paddingLeft:10, 
    backgroundColor:'white', 
    color:layout.themeTextColor, 
    fontSize:14
  },
  inputTextStyle:{
    color : layout.themeTextColor,
    paddingRight:10,
    //paddingLeft: 10,
    fontSize:14
  },
  headingText:{
    color: 'black',
    paddingLeft: 10
  }

  });



export default Register;
