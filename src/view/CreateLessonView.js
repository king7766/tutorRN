/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {observer} from 'mobx-react'
import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage,
  CameraRoll,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as E from 'tutorRN/src/service/env-config'

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Picker from 'react-native-picker';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree'


import categoryVM from 'tutorRN/src/VM/categoryVM'
import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'
import userVM from 'tutorRN/src/VM/userVM'
import strings from 'tutorRN/src/service/strings'
import alert from 'tutorRN/src/service/alert'

import PhotoThumbnailView from 'tutorRN/src/view/ui/PhotoThumbnailView'
import LoadingScreen from 'tutorRN/src/view/LoadingScreen'

const layout = require('tutorRN/src/Layout')
const locationViewModel = locationVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const userViewModel = userVM.getInstance()
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
    this.cancelBtnOnClicked = this.cancelBtnOnClicked.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      loadingVisible : false,
      imageSource : [],
      photos : [],
      
      //rowTitle:[strings.location, strings.category, strings.education, strings.price],
      rowTitle:[strings.location, strings.category,strings.subcategory, strings.price],
      optionData : [
        locationViewModel.getLocationName(),
        //['文員', '運輸','教學', '體育' ],
        //categoryViewModel.getCategories(),
        categoryViewModel.getCategoriesNames(),
        categoryViewModel.getSubCategoriesNameByCategoryKey(),
        //[strings.education_low, strings.education_mid,strings.education_high, strings.education_exHigh],
        [strings.price_low, strings.price_mid, strings.price_high]
      ],
      pickerResults :['','',strings.selectCategoryFirst,''],
      pickerResultsIndex : [-1, -1,-1,-1],
    }

  }

  
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  }
 

  componentWillMount() {
    this.mounted = true

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
    //console.log(JSON.stringify(event.nativeEvent))
    const element = ReactNativeComponentTree.getInstanceFromNode(event.nativeEvent.target);
    this.setState({
      [element._currentElement.props.name]:  event.nativeEvent.text
    })
  }

  photoThumbnailImageOnClicked(index){
    console.log('photoThumbnailImageOnClicked : '+index )    
    //this.setState(this.state.imageSource.splice(index,1))
  }

  photoThumbnailAddBtnOnClicked()
  {
    console.log('photoThumbnailAddBtnOnClicked')
    this.uploadPhoto()
  }

  deleteBtnOnClicked(index)
  {
    this.setState(this.state.imageSource.splice(index,1)) 
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  rawDataChecking(rawData){

    console.log(JSON.stringify(this.state.pickerResultsIndex))
    if (this.state.course_name == undefined || this.state.course_name.length < 1)
    {
      this.course_name.setNativeProps({
        placeholder:strings.notFilledInMessage,
        placeholderTextColor:'red'
      })
      return false
    }

    if (this.state.course_introduction == undefined || this.state.course_introduction.length < 1)
    {
      this.course_introduction.setNativeProps({
        placeholder:strings.notFilledInMessage,
        placeholderTextColor:'red'
      })
      return false
    }
    
    if ( this.state.pickerResultsIndex[0] == -1 ){
      
      return false
    }
    if ( this.state.pickerResultsIndex[1] == -1){
      
      return false
    }
    if ( this.state.pickerResultsIndex[2] == -1){
      
      return false
    }
    if ( this.state.pickerResultsIndex[3] == -1){
      
      return false
    }
    
    return true

  }

  async next ()
  {
    const userToken = await AsyncStorage.getItem('userToken')
    if ( userToken == 'guest' )
    {
      Alert.alert(
        '創立失敗',
        'Error : 請先登入',
        [{
            text:strings.confirm, onPress:()=>{
              this.setState({loadingVisible : false},function(){
                this.props.createLessonFinished()
              })
          }
        }]
      )
      return 
    }

    var location_id = locationViewModel.getLocationIdByName(this.state.pickerResults[0])
    var district_id = locationViewModel.getDistrictIdByLocationId(location_id)

    
    var rawData = {
      //token: 'xRW8DwqoIxZBSlF83b2P1',
      token: E.token,
      course_fee: this.state.pickerResultsIndex[3],
      course_name : this.state.course_name,
      course_introduction: this.state.course_introduction,
      'course_district_ids[]': district_id,
      'course_location_ids[]': location_id,
      'course_category_ids[]': categoryViewModel.getCategoryIDByName(this.state.pickerResults[2]),
      course_tutor_id: userViewModel.getUser().user_id,
      //course_tutor_id: 16,
    }

    console.log('rawData = ' + JSON.stringify(rawData))
    
    if ( this.rawDataChecking(rawData) ){
      this.setState({loadingVisible: true})
    }
    else
    {
      return 
    }
    
    //return 

    const submitData = new FormData();
    
    for ( var i = 0; i < this.state.imageSource.length ; i ++)
    {
      submitData.append('course_medias[]', {
        name: this.state.imageSource[i].name,
        type: this.state.imageSource[i].type,
        uri: this.state.imageSource[i].media_file          
      });
    }

    Object.keys(rawData).forEach(key => {
      submitData.append(key, rawData[key]);
    });

    console.log('fetching.... ' + JSON.stringify(submitData) )

    const res = await fetch(E.CREATE_COURSE, {
      method: "POST",
      body : submitData    
    })
    .then ( response => response.json()) 
    .then ( response => {
      console.log('cre : ' + JSON.stringify(response) )

      return response

    })
    .catch (error =>{
      console.log('error : ' + JSON.stringify(error) )
      return error
    })

    

    if ( res.id !== undefined ) 
    {
      Alert.alert(
        '創立成功',
        '課堂編號 : '+ res.id,
        [{
            text:strings.confirm, onPress:()=>{
              this.setState({loadingVisible : false},function(){
                this.props.createLessonFinished()
              })
          }
        }]
      )
    }
    else
    {  
      Alert.alert(
        '創立失敗',
        'Error : '+ res,
        [
          {
            text:strings.confirm, onPress:()=>{
              this.setState({loadingVisible : false},function(){
                this.props.createLessonFinished()
              })
                
            }
          }
        ]
      )        
    }
  }

  rowOnClick(index)
  {    
    var rawArray 

    if (index == 2 && this.state.pickerResultsIndex[1] == -1)
    {
      return
    }
  
    Picker.init({
      pickerData: this.state.optionData[index],
      pickerTitleText:strings.pleaseChoose,
      pickerConfirmBtnText:strings.confirm,
      pickerCancelBtnText: strings.cancel,
      //selectedValue: this.state.optionData[index],
      selectedValue : rawArray,
      onPickerConfirm: (pickedValue, pickedIndex) => {
          
          var pickerData = pickedValue[0]
          console.log('area : ' +  pickerData + ', i = ' + pickedIndex )

          var pickerResults = this.state.pickerResults
          pickerResults.splice(index, 1, pickerData)

          var pickerResultsIndex = this.state.pickerResultsIndex
          pickerResultsIndex.splice(index, 1, pickedIndex[0])
          var optionData = this.state.optionData

          if ( index == 1)
          {
            
            pickerResults[2] = strings.selectCategoryFirst
            pickerResultsIndex[2] = -1
            optionData[2] = categoryViewModel.getSubCategoriesNameByCategoryKey(categoryViewModel.getCategoryIDByName(pickedValue))
          
          }

          this.setState({
            optionData: optionData,
            pickerResults : pickerResults,
            pickerResultsIndex : pickerResultsIndex,
          })

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

  uploadPhoto () {
    
    this.defaultAnimationDialog.show();
    
    CameraRoll.getPhotos({
      first: 100,
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

    var photo = this.state.photos[index]
    var imageName = photo.node.image.uri.split("=")[1].split("&")[0] +'.' + photo.node.image.uri.split("=")[2]
    var type = photo.node.type
    var uri = photo.node.image.uri

    

    var imageSource = this.state.imageSource
    imageSource.splice(0, 0, {media_file:uri, name :imageName,type:photo.node.type  })
    //imageSource.push({url:uri})

    console.log('selectedPhoto = ' + JSON.stringify(imageSource))

    this.defaultAnimationDialog.dismiss(() => {
      this.setState({
        photo: this.state.photos[index],
        selectedAlbumPhotoIndex: index,
        imageSource : imageSource,
      })

      return
      
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

  cancelBtnOnClicked()
  {
    console.log('cancelBtnOnClicked')
    this.props.cancelBtnOnClicked()
    
    
    //this.next()
    //this.props.onClose()
  }
  
  renderItem = ({item, index}) =>
    <TouchableOpacity onPress={()=>this.selectedPhoto(index)}>
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
    </TouchableOpacity>

  render() {
    
    //console.log('::::: ' + locationViewModel.getDistrictIdByLocationId(2))
    //const {navigate} = this.props.navigation;
    return (
      //<SafeAreaView
      //  styles = {{flex:1}}
      //>
      <View 
        style = {styles.container}
      >
        <Modal 
          transparent={true}
          visible = {this.state.loadingVisible}
        >
          <LoadingScreen />
        </Modal>

        <PopupDialog
          //style = {{position:'absolute', top: 10}}
          dialogTitle={<DialogTitle title="請選取頭像圖片" />}
          //height= {350}
          height= {layout.deviceHeight - 75 }
          //dialogStyle={{marginTop:-300}} 
          dialogStyle={{ position:'absolute', top: 50}} 
          
          //ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          ref={(defaultAnimationDialog) => {
            this.defaultAnimationDialog = defaultAnimationDialog;
          }}
        >
          <View style = {{backgroundColor: 'white'}}>
            <FlatList
              style = {{ height: layout.deviceHeight -75}}
              numColumns ={2}
              contentContainerStyle={styles.list}
              //data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'}, {key: 'e'},{key: 'f'},{key: 'g'}, {key: 'h'},{key: 'i'},{key: 'j'}]}
              data = {this.state.photos}
              renderItem={this.renderItem}
            />
          </View>
        </PopupDialog>


        <View style={styles.navigationContent}>

          <TouchableOpacity 
            onPress={this.cancelBtnOnClicked}
            style = {{flex:1, height:30}}
          >
            <Image 
              style = {{height: 30, width:30}}
              source= {require('tutorRN/image/icons8-back-100.png')} 
            />
          </TouchableOpacity>
          <View style = {{flex:1, height:30, alignItems:'center', justifyContent:'center'}}>
            <Text style = {{fontSize:layout.stringsSizeMid,}}> {strings.newClass} </Text>
          </View>
          <View 
            //style = {{flex:1, height:30, alignItems:'center', flexDirection: 'column'}}
            style = {styles.confirmButtonBg}
          >
          </View>
        </View>
        {
          this.state.imageSource.length == 0 ? 
            <TouchableOpacity
              onPress={this.uploadPhoto}
            >
              <View style={styles.uploadButton}>
                <Image 
                  style = {{height: 30, width:30, marginLeft:10}}
                  source=  {Assets.icon.addImage}
                />
                <Text style = {styles.uploadText}>
                  {strings.uploadPhoto}
                </Text>
              </View>
            </TouchableOpacity>
              :
            <View
              style = {{height:100}}
            >
              <PhotoThumbnailView
                imageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
                addBtnOnClicked = {()=>this.photoThumbnailAddBtnOnClicked()}
                imageSource = {this.state.imageSource}
                addBtnVisible = {true}
                deleteBtnVisible = {true}
                deleteBtnOnClicked = {(index)=>this.deleteBtnOnClicked(index)}
              />
            </View>

        }

          <View style={{height:40,justifyContent: 'center', backgroundColor:layout.backgroundColor}}>
            <Text style = {{color:layout.headingTextColor ,fontSize:layout.stringsSizeMid, paddingLeft: 10} }>
              {strings.detailInformation}
            </Text>
          </View>
          <TextInput
            onChange= {this.handleInputChange}
            ref= {(course_name) => { this.course_name = course_name }}
            name = 'course_name'
            backgroundColor = 'white'
            style = {{ paddingRight:10, paddingLeft:10, fontSize:layout.stringsSizeSmall, height:40 }}
            placeholder = {strings.lessonName}
            placeholderTextColor = {layout.grayColor}
          /> 
          <View 
            style = {{height:0.5, backgroundColor:layout.grayColor}}
          />
          <TextInput
            onChange= {this.handleInputChange}
            ref= {(course_introduction) => { this.course_introduction = course_introduction }}
            name = 'course_introduction'
            backgroundColor = 'white'
            style = {{ paddingRight:10, paddingLeft:10, height:80, fontSize:layout.stringsSizeSmall, borderBottomWidth:0.5, borderBottomColor:layout.grayColor }}
            //numberOfLines = {3}
            textAlignVertical= 'top'
            multiline={true}
            placeholder = {strings.descriptionSample}
            placeholderTextColor = {layout.grayColor}
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
                        {this.state.pickerResults[index]}
                      </Text> 
                    </View>
                  </TouchableHighlight>
                )
              )
            }
          </View>

          <Text style = {{ textAlign: 'center', padding: 10, backgroundColor:layout.backgroundColor, color:layout.themeTextColor}}>
            **閣下提供的資料只用於有助本程式了解學員的需要及用於有關事宜上，請盡量提供有關資料，以便學員更能準確地搜尋閣下**
          </Text>
          <TouchableOpacity onPress={this.next}>
            <View style = {styles.submitBotton}>
              <Text style = {styles.submitText}>
                {strings.submit}
              </Text>
            </View>
          </TouchableOpacity>
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
    borderBottomColor: layout.themeTextColor,
    borderBottomWidth: 1,
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
    
    //backgroundColor : layout.themeTextColor,
    height:40,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems:'center'
  },
  uploadText:{
    paddingLeft: 10,
    color: 'black',
    fontSize:layout.stringsSizeMid,
  },
  confirmButtonBg:{
    flex:1, 
    height:30, 
    alignItems:'center', 
    flexDirection: 'column'

  },

  confirmText:{
  
    textAlign:'center',
    borderColor: layout.themeTextColor,
    borderRadius: 5,
    borderWidth: 1,
    color : layout.themeTextColor,
    fontSize : layout.stringsSizeSmall, 
    height: 30,
    width: 60,
    //paddingLeft: 10,
  },
  submitBotton:{
    height:40, 
    justifyContent:'center',
    alignItems:'center', 
    backgroundColor:layout.grayColor
  },

  submitText:{
    color:'white',
    fontSize:layout.stringsSizeMid

  }

});



//export default CreateLessonView;
