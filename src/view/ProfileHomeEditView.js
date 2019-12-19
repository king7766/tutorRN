/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  AsyncStorage,
  DeviceEventEmitter,
  CameraRoll
} from 'react-native';
import Picker from 'react-native-picker';
import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';

import CommentPageView from 'tutorRN/src/view/CommentPageView';

import * as M from 'tutorRN/src/service/membership'

import SegmentControl from './ui/SegmentControl'

import TutorProfilePreviewBlock from 'tutorRN/src/view/ui/TutorProfilePreviewBlock'
import PhotoShowView from 'tutorRN/src/view/PhotoShowView'

import courseVM from 'tutorRN/src/VM/courseVM'
import userVM from 'tutorRN/src/VM/userVM'
import locationVM from 'tutorRN/src/VM/locationVM'

import Assets from 'tutorRN/src/view/ui/Assets';
import strings from 'tutorRN/src/service/strings'

import {
  SelectableInputField,
  SeparatorBar,
  LessonListCell,
  TutorProfileBlock,
  TutorProfileTextBlock,
  TutorRatingBlock,
  LoadingScreen,
  PhotoThumbnailView,
  UploadImageCell

} from 'tutorRN/src/view/ui/UIComponent';

const userViewModel = userVM.getInstance()
const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()


const layout = require('tutorRN/src/Layout')
const numberOfItem = 4


class ProfileHomeEditView extends Component<Props> {

  constructor(props) {
    super(props);

    var cert_list = []
    for ( var i = 0; i < userViewModel.getUser().cert_list.length; i ++)
    {
      cert_list.push({media_file:userViewModel.getUser().cert_list[i]})
    }

    this.state = {
      haveLogin : false,
      loadingVisible : false,
      cert_list : cert_list,
      photos : [],
      //data: courseViewModel.getCourseByTag(0),
      tutor: 
      {
        'user_thumb': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
        'user_nickname': '陳小明',
        'job': '最強博士級中文導師#\n現代中文科升GRADE王\n香港大學哲學博士（Ph.D',
        'exp': '10年工作經驗',
        'title': '中文大學學士',
        'gender': '男',
        'age': '40',
        'location' : '黃大仙',
        'user_occupation':'功力深厚：學士一級榮譽畢業，中文科各範疇基本功毋庸置疑，文、史、哲兼精，猶精於文言文。\n探囊取物：大學攻讀學士期間，奪A無數，多次入選「院長優秀學生」名單。\n專業分析：精研試題出題模式及走勢，自擬教材，對症下藥。\n百川匯海：精簡創意寫作、修辭學、現代漢語、古典漢語等科目之大學教材，融入筆記，讓門生學習正宗語文、寫作手法、修辭手法、文言閱讀技巧等。\n字字珠機：筆記內容絕不假手他人，所有教材、作文均由黃海星博士一人負責，當中暗藏玄機，並於課堂逐一解說。',
        'achievement': '連續兩年現代教育中文科最多5**/5*/5之導師^\n連續兩年5科5**尖子選報^',

      },
      rowTitle:[strings.job, strings.education],//,strings.location ],
      optionData: [
        ['文員', '運輸','教學', '體育' ],
        [strings.education_low, strings.education_mid, strings.education_high, strings.education_exHigh],
        //[['a','b','c'],['111','222']]
        //[['1','2'],[locationViewModel.getLocationName()]]
      ],
      rowData :[userViewModel.getUser().user_occupation,userViewModel.getUser().user_education,userViewModel.getUser().user_location],
      
    }

    this.ListingCatBtnOnClick = this.ListingCatBtnOnClick.bind(this)
    this.ratingBlockOnClicked = this.ratingBlockOnClicked.bind(this)
    this.rowOnClick = this.rowOnClick.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)

    
    //this.cellStyle = this.cellStyle.bind(this)
    //this.tabOnClicked = this.tabOnClicked.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      //headerLeft:<Button title="Info" onPress = {params.leftBtnOnClick}/>,
      headerRight: (

        //<Button onPress={params.increaseCount} title="Info" />
        <TouchableOpacity 
          //onPress={params.leftBtnOnClick}
          //onPress={params.increaseCount}
          underlayColor = {layout.touchHighlightColor}
        >
          <View style = {{borderWidth:1,borderRadius:5, height: 30, width: 80, marginRight:10, justifyContent: 'center', flexDirection: 'row', alignItems:'center'}}>

            <Text>更新</Text>
            
          </View>

        </TouchableOpacity>
      ),
    };
  };
  
  async componentDidMount() {

    

    this.props.navigation.setParams({ leftBtnOnClick: this._signOutAsync });
    

    const userToken = await AsyncStorage.getItem('userToken')
    if ( userToken == 'guest' || userToken == null)
    {
      // Please login
      this.setState({
        haveLogin: false
      })
    }
    else
    {
      this.setState({
        haveLogin: true
      })
    }


  }
 
  _signOutAsync = async () => {

   

    console.log('_signOutAsync from ProfileHome')
    //await AsyncStorage.clear();
    //this.props.navigation.navigate('Auth');
    await AsyncStorage.clear();
    //this.props.navigation.navigate('Auth');
    //DeviceEventEmitter.emit('logout', {name:'John', age:23});
    DeviceEventEmitter.emit('signOut', {});
    //DeviceEventEmitter.emit('logout', {name:'John', age:23});
  };

  goToLogin()
  {
    M.logoutAction();
  }

  ratingBlockOnClicked()
  {
    console.log('ratingBlockOnClicked');
    this.props.navigation.navigate('CommentPageView',{})
  }

  uploadPhoto () {
    
    this.defaultAnimationDialog.show();
    
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    })
    .then(r => {
      let a = this.state.photos.slice()
      
      for ( var i = 0; i< r.edges.length; i ++ )
      {
        a[i] = r.edges[i]
      }
      this.setState({ photos: a });
    })
    .catch((err) => {
      console.log(err)
       //Error Loading Images
    })
  }

  photoThumbnailImageOnClicked(index){
    console.log('photoThumbnailImageOnClicked : '+index )    
  }
 
  deleteBtnOnClicked(index)
  {
    this.setState(this.state.cert_list.splice(index,1)) 
  }


  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    var tempArray = this.state.optionData
    var rowData = this.state.rowData  

    Picker.init({
      pickerData: tempArray[index],
      pickerTitleText:strings.pleaseChoose,        pickerConfirmBtnText:strings.confirm,
      pickerCancelBtnText: strings.cancel,
      //selectedValue: tempArray[index],
      onPickerConfirm: pickedValue => {
        pickerData = pickedValue[0]
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


  async ListingCatBtnOnClick (index)
  {
    console.log('ListingCatBtnOnClick ' + index)
    
    //console.log('ListingCatBtnOnClick ' + rowData.id)
    const res = await courseViewModel.loadCourse('TAG',index)
    if (res == true)
    {
      console.log('111 res = ' + res);
      this.setState({
        //tag: rowData.id,
        tag: index,
        data : courseViewModel.getCourseByTag(index)
      })
      //console.log(courseViewModel.getCourseByTag(rowData.id))
    }
    else
    {
      
    }
    
  }


  displayContent()
  {

    

    return (
      
      <ScrollView
        scrollEnabled = {true}
      >
        <TutorProfileBlock
          allowEdit = {true}
          tag = {0}
          tutor = {this.state.tutor}
          //tutor = {userViewModel.getUser()}
          arrowOn = {false}
          //onClicked = {this.arrowOnClicked}
        />

        <SeparatorBar/>

        <TutorProfileTextBlock
          allowEdit = {true}
          tag = {1}
          arrowOn = {false}
          title = {strings.description}
          description = {userViewModel.getUser().user_introduction}
          //description = {userViewModel.getUser().user_occupation}
          onClicked = {this.arrowOnClicked}
          
        />

        <SeparatorBar/>

        <View>
          {
            this.state.rowTitle.map(
              (item, index) =>
                (
                  <TouchableHighlight 
                    onPress={() => this.rowOnClick(index)}
                    key = {index}
                  >
                    <View>
                      <SelectableInputField 
                        title = {item}
                        data = {this.state.rowData[index]}
                      />
                    </View>
                  </TouchableHighlight>
                )
              )
            }
          </View>

        <SeparatorBar/>

        <TouchableOpacity
          onPress={this.uploadPhoto}
        >
          <UploadImageCell />
        </TouchableOpacity>

        {
          this.state.cert_list.length > 0 &&
          <PhotoThumbnailView
            imageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
            imageSource = {this.state.cert_list}
            deleteBtnVisible = {true}
            deleteBtnOnClicked = {(index)=>this.deleteBtnOnClicked(index)}
          />
        }
        

            

        
        {
          //<PhotoShowView
          //source = {userViewModel.getFacebookPhotos()}
        ///>
        }
        
        
    
      </ScrollView> 
    )
  }

  displayNonLoginContent()
  {
    return (
      <View 
        style = {{justifyContent: 'center',alignItems: 'center',flex:1 }}
      >
        <Text color='black'>
          {strings.notLoginErrorMessage}
        </Text>
        <Button
          onPress={this.goToLogin}
          title= {strings.loginText}
          color="#841584"
          //accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }

  selectedPhoto(index)
  {
    var photo = this.state.photos[index]
    var imageName = photo.node.image.uri.split("=")[1].split("&")[0] +'.' + photo.node.image.uri.split("=")[2]
    var type = photo.node.type
    var uri = photo.node.image.uri

    var cert_list = this.state.cert_list
    cert_list.splice(0, 0, {media_file:uri, name :imageName,type:photo.node.type  })

    console.log('selectedPhoto = ' + JSON.stringify(cert_list))

    this.defaultAnimationDialog.dismiss(() => {
      this.setState({
        //photo: this.state.photos[index],
        //selectedAlbumPhotoIndex: index,
        cert_list : cert_list,
      })
    });
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

    //console.log('user === ' + userViewModel.getUser())
    console.log('haveLogin = ' + this.state.haveLogin)
    return (
      <View 
        style = {layout.styles.basicViewStyle}
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
              style = {{ height: layout.deviceHeight - 50}}
              numColumns ={2}
              contentContainerStyle={styles.list}
              //data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'}, {key: 'e'},{key: 'f'},{key: 'g'}, {key: 'h'},{key: 'i'},{key: 'j'}]}
              data = {this.state.photos}
              renderItem={this.renderItem}
            />
          </View>
        </PopupDialog>



        {
          this.displayContent()
          //this.state.haveLogin == true ? this.displayContent() : this.displayNonLoginContent() 
        }
      </View>
    );
  }
}

export default ProfileHomeEditView;

const styles = StyleSheet.create({   
  
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor : 'red'
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

  listViewStyle:{        
    flexDirection:'row', //设置横向布局       
    flexWrap:'wrap'    //设置换行显示
  },    
  bgStyle:{        
    backgroundColor:'gray',        
    width:(layout.deviceWidth-50)/2, //cell的宽度        
    height:250,        
    marginLeft:10,        
    marginTop:10    
  },    
  imageStyle:{        
    width:(layout.deviceWidth-30)/2,       
    height:230,        
    backgroundColor:'gray',        
    marginBottom:0,    
  }

});
