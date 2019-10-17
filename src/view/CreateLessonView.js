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
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import * as E from 'tutorRN/src/service/env-config'

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Picker from 'react-native-picker';

import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')

const locationViewModel = locationVM.getInstance()
const courseViewModel = courseVM.getInstance()

import {
  Avatar,
  Assets,
  //TopMenuBar,
  TutorRowFlatList,
  FilteringToolsBar,
} from 'tutorRN/src/view/ui/UIComponent';



export default class CreateLessonView extends React.Component {
//export default class CreateLessonView extends Component {
//class CreateLessonView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.next = this.next.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.selectedPhoto = this.selectedPhoto.bind(this)
    this.confirmBtnOnClick = this.confirmBtnOnClick.bind(this)
    this.uploadData = this.uploadData.bind(this)

    this.state = {

      photos : [],
      //rowTitle:['電郵地址 / 電話', '密碼', '名稱', '性別', '職業', '學歷', '出生日期', '地區'],
      rowTitle:[strings.location, strings.category, strings.education, strings.price],
      rowDataChoose : [
        ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
        ['文員', '運輸','教學', '體育' ],
        [strings.education_low, strings.education_mid,strings.education_high, strings.education_exHigh],
        [strings.price_low, strings.price_mid, strings.price_high]
      ],

      genderSelectArray: ['男', '女'],
      //locationSelectArray : ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
      locationSelectArray : [],
      eductionSelectArray :['小學', '中學', '大學以上'],
      jobSelectArray :['文員', '運輸','教學', '體育' ],


      rowData :['','',''],
    }

  }

  
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
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
      //textAlign: 'center',
      //flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      //height : '100%'
    }

  } 

  handleTextChange(event, index)
  {
    console.log('handleTextChange = ' + event.text + ': '+ index)
    
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

  next ()
  {
    console.log('next')

  
    /*
    Picker.init({
      pickerData: ['a','b','c'],
      pickerTitleText:'請選擇',
      selectedValue: ['河北', '唐山', '古冶区'],
      onPickerConfirm: pickedValue => {
          console.log('area', pickedValue);
      },
      onPickerCancel: pickedValue => {
          console.log('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
          //Picker.select(['山东', '青岛', '黄岛区'])
          console.log('area', pickedValue);
      }
    });
    Picker.show();
    */

    // call update profile API
    //this.props.navigation.navigate('App')
    
  }

  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    
    var tempArray = this.state.rowDataChoose[index]
    
    var rowData = this.state.rowData
    if( 1)
    {
      /*
      if ( index == 3)
      {
        tempArray = this.state.genderSelectArray
      }
      else if ( index == 4)
      {
        tempArray = this.state.jobSelectArray
      }
      else if ( index == 5)
      {
        tempArray = this.state.eductionSelectArray
      }
      else if (index == 6)
      {
        tempArray = this._createDateData()
      }
      else if ( index == 7)
      {
        tempArray = this.state.locationSelectArray
      }
      */
      Picker.init({
        pickerData: this.state.rowDataChoose[index],
        pickerTitleText:strings.pleaseChoose,
        pickerConfirmBtnText:strings.confirm,
        pickerCancelBtnText: strings.cancel,
        selectedValue: this.state.rowDataChoose[index],
        onPickerConfirm: pickedValue => {
            console.log('area', pickedValue);
            var arr = this.state.rowData
            arr[index] = pickedValue

            this.setState({
              rowData: arr
            })

            /*
            rowData.splice(index, 1, pickedValue)
            this.setState({
              rowData: rowData
            })
            */

        },
        onPickerCancel: pickedValue => {
            console.log('area', pickedValue);
        },
        onPickerSelect: pickedValue => {
            //Picker.select(['山东', '青岛', '黄岛区'])
            console.log('area', pickedValue);
        }
      });
      Picker.show();

    }
    else
    {
      this.refs["index" + index].focus(); 
    }
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
    //console.log('selectedPhoto = ' + index)
    this.defaultAnimationDialog.dismiss(() => {
      this.setState({
        photo: this.state.photos[index]
      })

      return 
      
      var d = {
        token : E.token,
        course_tutor_id : 3,
        course_name : 'name',
        course_introduction :'in',
        course_fee :'200',
        'course_category_ids[]' : 4,
        'course_location_ids[]' : 1,
        'course_district_ids[]' : 3,
        //'course_medias[]' :
  
      }

      courseViewModel.createCourse(JSON.stringify(d))

      return 

      fetch(E.CREATE_COURSE, {
        method: "POST",
        body: JSON.stringify(d), 
      })
      .then (response => response.json())
      .then (response => {
        console.log("CREATE_COURSE : " + response)
      })
      .catch(error => {
        console.log("CREATE_COURSE error", error);
      });
      //let body = new FormData();
      //body.append('course_medias[]', {uri: this.state.photos[index],name: 'photo.png',filename :'imageName.png',type: 'image/png'});
      //body.append('Content-Type', 'image/png');


      //const rawData = this.uploadData (this.state.photos[index], d)
  
      //const res = courseViewModel.createCourse(rawData)

      //console.log('data = ' + this.state.photo.data)
      //console.log('callback - will be called immediately ' + index)
    });

    
  }

  uploadData (photo, body)
  {
    //console.log(photo.node.image.uri)
    //console.log( photo.node.type)
    
    var imageName = photo.node.image.uri.split("=")[1].split("&")[0]
    console.log('imageName = ' + photo.node.image.uri.split("=")[1].split("&")[0])
    
    const data = new FormData();
    
    /*
    data.append("image_thumb", {
      //name: photo.node.image.uri.split("=")[1].split("&")[0],
      name: "aaa",
      type: photo.node.type,
      //uri: Platform.OS === "android" ? photo.uri : photo.node.image.uri.replace("assets-library://", "")
      uri : photo.node.image.uri,
    });
    */

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

  confirmBtnOnClick()
  {
    console.log('confirmBtnOnClick')
    this.next()
    //this.props.onClose()
  }
  
  //renderItem={({item, index})=>
  //renderItem({ item, index }) {
  

  renderItem = ({item, index}) =>
    <TouchableHighlight onPress={()=>this.selectedPhoto(index)}>
      <View style={{
        flex: 1,
        margin: 5,
        //minWidth: 170,
        //maxWidth: 223,
        //width: 50,
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
  
  /*
  <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>排序</Text>

          <FilteringToolsBar />

          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>篩選</Text>
        
          <TutorRowFlatList
            title = '熱門推介'
            height = {120}
            data = {this.state.tutorRowData}
          />

          <TutorRowFlatList
            title = '優惠'
            height = {120}
            data = {this.state.tutorRowData}
          />
          */
  render() {
    
    //const {navigate} = this.props.navigation;
    return (
      //<SafeAreaView
      //  styles = {{flex:1}}
      //>
      <View 
        style = {styles.container}
      >

        <PopupDialog
          //style = {{position:'absolute', top: 10}}
          dialogTitle={<DialogTitle title="請選取頭像圖片" />}
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


        <View style={styles.navigationContent}>
          
          
          <View style= {{flex:1,height:30, }}/>
          <View style = {{flex:1, height:30, alignItems:'center', justifyContent:'center'}}>
            <Text style = {{fontSize:16}}> {strings.newClass} </Text>
          </View>
          <View 
            //style = {{flex:1, height:30, alignItems:'center', flexDirection: 'column'}}
            style = {styles.confirmButtonBg}
          >
            <TouchableOpacity  onPress={this.confirmBtnOnClick}>
              <Text 
                style = {styles.confirmText}
                adjustsFontSizeToFit= {true} // this amazing 
              >
                {strings.confirm} 
              </Text>
            </TouchableOpacity>
          </View>
          
          
          
          
          
         
            
        </View>


        <View style={{ height:40, justifyContent: 'center', backgroundColor:layout.shadowColor}}>
          <Text style = {{ color: 'black', paddingLeft: 10 }}>
            {strings.generalInformation}
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
                  round = {false}
                  size = {100}
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

          <View style = {{flexDirection:'row', height:40, alignItems:'center', backgroundColor:'white', paddingLeft:10}} >
            <Text style = {{flex:1, color:'gray'}}>
              {strings.lessonName}
            </Text> 
            <TextInput
              backgroundColor = 'white'
              style = {{ paddingRight:10, flex:1, textAlign:'right' }}
            /> 
          </View>
          

         
            

          <View style={{height:40,justifyContent: 'center', backgroundColor:layout.shadowColor}}>
            <Text style = {{color: 'black',paddingLeft: 10} }>
              {strings.detailInformation}
            </Text>
          </View>
          
          <TextInput
            backgroundColor = 'white'
            style = {{ paddingRight:10, paddingLeft:10, height:80, fontSize:14, borderBottomWidth:0.5, borderBottomColor:'grey'}}
            //numberOfLines = {3}
            textAlignVertical= 'top'
            multiline={true}
            placeholder = {strings.descriptionSample}
            placeholderTextColor = 'gray'
          /> 
          <View>
            {
              this.state.rowTitle.map(
                (item, index) =>
                (
                  <TouchableHighlight 
                    onPress={() => this.rowOnClick(index)}
                    key = {index}
                  >
                    <View style = {styles.textInputView} key = {index}>
                      <Text style = {this.textInputStyle(index)}>
                        {item}
                      </Text> 
                      <Text
                        //ref= {"index" + index}
                        style = {{ paddingRight:10, color:layout.themeTextColor }}
                        //value = {this.state.rowData[index]}
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
            alignItems:'center'     ,
            backgroundColor: layout.shadowColor
          }}
          >
            <Text style = {{
              color: 'black',
              paddingLeft: 10,
              paddingRight: 10,
              
            }}
            >
              註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註冊說明註
            </Text>
          </View>
          

      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F6AE2D',
  },
  navigationContent: {
    //backgroundColor: '#F6AE2D',
    marginTop: 30,
    height: 60,
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
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
    //let touchHighlightColor = 'rgba(237,182,202,0)'
    //let themeTextColor = 'rgba(225,19,101,1)'
    //backgroundColor : 'rgba(61,89,148,1)',
    backgroundColor : layout.themeTextColor,
    height:40,
    
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

  confirmButtonBg:{
    flex:1, 
    height:30, 
    alignItems:'center', 
    flexDirection: 'column'

    /*
    flex:1, 
    height:30, 
    alignItems:'center', 
    justifyContent:'center',
    borderColor: layout.themeTextColor,
    borderRadius: 5,
    borderWidth: 1,
    */
  },

  confirmText:{
    //flex:1,
    
    
    
    //textAlignVertical: 'center',
    textAlign:'center',
    borderColor: layout.themeTextColor,
    borderRadius: 5,
    borderWidth: 1,
    color : layout.themeTextColor,
    fontSize : 14, 
    height: 30,
    width: 60,
    //paddingLeft: 10,
  }

});



//export default CreateLessonView;

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