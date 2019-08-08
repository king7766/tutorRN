/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ListView,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';
import CommentPageView from 'tutorRN/src/view/CommentPageView';

import * as M from 'tutorRN/src/service/membership'

import SegmentControl from './ui/SegmentControl'

import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
import TutorProfileBlock from 'tutorRN/src/view/ui/TutorProfileBlock'
import TutorProfileTextBlock from 'tutorRN/src/view/ui/TutorProfileTextBlock'
import TutorRatingBlock from 'tutorRN/src/view/ui/TutorRatingBlock'
import TutorProfilePreviewBlock from 'tutorRN/src/view/ui/TutorProfilePreviewBlock'
import PhotoShowView from 'tutorRN/src/view/PhotoShowView'

import courseVM from 'tutorRN/src/VM/courseVM'
import userVM from 'tutorRN/src/VM/userVM'

import Assets from 'tutorRN/src/view/ui/Assets';
import strings from '../service/strings'

import {

  TutorSelectCell,

} from 'tutorRN/src/view/ui/UIComponent';

const userViewModel = userVM.getInstance()
const courseViewModel = courseVM.getInstance()



const layout = require('tutorRN/src/Layout')
const numberOfItem = 4


class ProfileHomeEditView extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      haveLogin : false,
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

      }

      
    }

    this.ListingCatBtnOnClick = this.ListingCatBtnOnClick.bind(this)
    this.ratingBlockOnClicked = this.ratingBlockOnClicked.bind(this)
    
    

    
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
        //style = {{height: 130}}
        scrollEnabled = {true}
        //pagingEnabled = {true}
        //horizontal = {false}
      >
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
        <TutorProfileBlock
          allowEdit = {true}
          tag = {0}
          tutor = {this.state.tutor}
          //tutor = {userViewModel.getUser()}
          arrowOn = {false}
          //onClicked = {this.arrowOnClicked}
        />

        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <TutorProfileTextBlock
          allowEdit = {true}
          arrowOn = {false}
          title = {strings.education}
          description = {this.state.tutor.achievement}  
        />

        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <TutorProfileTextBlock
          allowEdit = {true}
          tag = {1}
          arrowOn = {false}
          title = {strings.description}
          description = {this.state.tutor.user_occupation}
          //description = {userViewModel.getUser().user_occupation}
          onClicked = {this.arrowOnClicked}
          
        />

        

        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        
        

        <TutorRatingBlock
          viewOnClicked = {this.ratingBlockOnClicked}
          arrowOn = {false}
        />

        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <PhotoShowView
          source = {userViewModel.getFacebookPhotos()}
        />
        
    
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

  render() {

    //console.log('user === ' + userViewModel.getUser())
    console.log('haveLogin = ' + this.state.haveLogin)
    return (
      <View 
        style = {{flex:1}}
      >
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