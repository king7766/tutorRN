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
  Button,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage,
  CameraRoll,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree';

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Picker from 'react-native-picker';
import locationVM from 'tutorRN/src/VM/locationVM'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import * as M from 'tutorRN/src/service/membership'

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

var albumPhoto = null

@observer
class Register extends Component<Props> {

  

  constructor(props) {

    
    super(props);


    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.next = this.next.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.selectedPhoto = this.selectedPhoto.bind(this)
    this.uploadData = this.uploadData.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {

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
        ['男', '女'],
        ['文員', '運輸','教學', '體育' ],
        ['小學', '中學', '大學以上'],
        ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
      ],
      
      //locationSelectArray : ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
      locationSelectArray : [],
      eductionSelectArray :['小學', '中學', '大學以上'],
      jobSelectArray :['文員', '運輸','教學', '體育' ],


      rowData :['','','','',''],

      tutorRowData:[
        {
          name:'name111',
          id:'111',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
        {
          name:'name222',
          id:'222',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
        {
          name:'name333',
          id:'333',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
      ]


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

  onFocus (index)
  {
    //console.log('onFocus : ' + index)
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
    console.log('next : ' +this.state.account)

    //const birth = this.state.rowData[4][0] + '' +this.state.rowData[4][1] + '' + this.state.rowData[4][2]
    const occupation = this.state.rowData[1]
    console.log('occupation : ' +occupation)

    const rawData = {
      token : 'xRW8DwqoIxZBSlF83b2P',
      login : this.state.account,
      password : this.state.password,
      nickname : this.state.name,
      sex: this.state.rowData[0],
      occupation: this.state.rowData[1],
      education : this.state.rowData[2],
      location : this.state.rowData[3],
      birth : this.state.rowData[4],
    }

    /*
    const rawData = {
      token : E.token,
      //login : result.id,
      login : '201908211518@gmail.com',
      password : 'abcd1234',
      nickname : "222p",
      sex : 'null',
      occupation : 'IT',
      education : 'Degree',
    }
    */

    //const registerData = this.uploadData(albumPhoto,rawData)
    const registerData = rawData
    
    
    //return 

    /*
    fetch(E.REGISTER_USER, {
      method: "POST",
      //body: createFormData(this.state.photo, { userId: "123" })
      body: registerData,
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes : ", response);
      })
      .catch(error => {
        console.log("upload error", error);
      });
    */


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
    //const data = this.uploadData(albumPhoto, {user_id:'1', token:'xRW8DwqoIxZBSlF83b2P'})

    /*
    const registerData = this.uploadData(albumPhoto,
      {
        token : 'xRW8DwqoIxZBSlF83b2P',
        login : this.state.account,
        password : this.state.password,
        nickname : this.state.name,
        sex: this.state.rowData[0],
        occupation: this.state.rowData[1],
        education : this.state.rowData[2],
        location : this.state.rowData[3],
        birth : birth,
      })
    */
    //const data = this.uploadData(this.state.photos[index], {user_id:'1', token:'xRW8DwqoIxZBSlF83b2P'})
      
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
    //const uploadData = this.uploadData(this.state.photos[index],registerData)
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
    //this.loginAction(data.login, data.password, data)

  }

  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    var tempArray 
    var rowData = this.state.rowData
    if ( index < 4)
    {
      tempArray = this.state.rowDataChoose[index]
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
    //photoSelected = this.state.photos[index]
    this.defaultAnimationDialog.dismiss(() => {

      //var p =  this.state.photos[index]
      this.setState({
        albumPhoto: this.state.photos[index]
      })

      albumPhoto = this.state.photos[index]

      //this.uploadData(this.state.photo, {'user_id':1, 'token':'xRW8DwqoIxZBSlF83b2P'})
      
      const data = this.uploadData(albumPhoto, {user_id:'2', token:'xRW8DwqoIxZBSlF83b2P'})
      
      

      //console.log('uploadData = ' + JSON.stringify(data) )
      //return

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
      

    });
  }

  uploadData (photo, body)
  {
    //console.log(photo.node.image.uri)
    //console.log( photo.node.type)
    
    var imageName = photo.node.image.uri.split("=")[1].split("&")[0]
    //console.log('imageName = ' + photo.node.image.uri.split("=")[1].split("&")[0])
    
    const data = new FormData();
    
    data.append("image_thumb", {
      //name: photo.node.image.uri.split("=")[1].split("&")[0],
      name: imageName,
      type: photo.node.type,
      //uri: Platform.OS === "android" ? photo.uri : photo.node.image.uri.replace("assets-library://", "")
      uri : photo.node.image.uri,
    });

    var d = {
      image_thumb: {
        //name: photo.node.image.uri.split("=")[1].split("&")[0],
        name: imageName,
        type: photo.node.type,
        //uri: Platform.OS === "android" ? photo.uri : photo.node.image.uri.replace("assets-library://", "")
        uri : photo.node.image.uri,
      },
      
      msg:'hihihi',
      user_id:'1', 
      token:'xRW8DwqoIxZBSlF83b2P'
    }

    //console.log('d = ' + JSON.stringify(d));

    

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    
    return data;
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
            albumPhoto ? 
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
                  url = {albumPhoto}
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

/*
<TextInput             
                      style = {this.textInputStyle(index)}
                      key = {index}
                      //style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'clear', height: '100%'}}
                      onFocus = { this.onFocus(index) }
                      onChangeText={(text) => this.handleTextChange({text}, index)}
                      placeholder = {item}
                      //value={this.state.text}
                    >
                      <View>

                      </View>
                    </TextInput>


                      <TopMenuBar 
            data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
            size = {50}
            itemHeight = {30}
            itemWidth = {50}
            selected = {0}
          />
          
                    */