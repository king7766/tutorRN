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

import SegmentControl from './ui/SegmentControl'

import TutorProfileBlock from './ui/TutorProfileBlock'
import TutorProfileTextBlock from './ui/TutorProfileTextBlock'
import TutorRatingBlock from './ui/TutorRatingBlock'

const layout = require('tutorRN/src/Layout')
const numberOfItem = 4


class ProfileHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      tutor: 
      {
        'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
        'name': '陳小明',
        'job': 'iOS 程式設計師',
        'exp': '10年工作經驗',
        'title': '中文大學學士',
        'gender': '男',
        'age': '40',
        'location' : '黃大仙',
        'description':'對某些人來說，技術分析可用以在看似混亂的證券市場中理出邏輯，利用過往的數據來預測未來；但對於另一些人來說，技術分析可能與占星術不相伯仲。然而，不論你的看法如何，技術分析在現今的證券市場擔當著舉足輕重的角色。',
        'achievement': 'HKAL - 中文(A), 英文(B)'

      }
      
    }

    
    

    
    //this.cellStyle = this.cellStyle.bind(this)
    //this.tabOnClicked = this.tabOnClicked.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      //headerLeft:<Button title="Info" onPress = {params.leftBtnOnClick}/>,
      headerRight: (

        //<Button onPress={params.increaseCount} title="Info" />
        <TouchableHighlight 
          onPress={params.leftBtnOnClick}
          //onPress={params.increaseCount}
          underlayColor = {layout.touchHighlightColor}
        >
          <View style = {{height: 30, width: 100, justifyContent: 'center', flexDirection: 'row'}}>
            <Image source={require('tutorRN/src/image/exit-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
          </View>

        </TouchableHighlight>
      ),
    };
  };
  
  componentWillMount() {
    this.props.navigation.setParams({ leftBtnOnClick: this._signOutAsync });
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

  render() {

    return (
      <ScrollView
        style = {{height: 130}}
        scrollEnabled = {true}
        pagingEnabled = {true}
        //horizontal = {false}
      >
        <TutorProfileBlock
          tag = {0}
          tutor = {this.state.tutor}
          arrowOn = {false}
          //onClicked = {this.arrowOnClicked}
        />

        <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

        <TutorProfileTextBlock
            arrowOn = {false}
            title = '學歷'
            description = {this.state.tutor.achievement}
        />

        <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

        <TutorProfileTextBlock
          tag = {1}
          arrowOn = {false}
          title = '課程簡介'
          description = {this.state.tutor.description}
          onClicked = {this.arrowOnClicked}
        />

        

        <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

        
        

        <TutorRatingBlock
          arrowOn = {false}
        />
    
      </ScrollView>  
      
    );
  }
}

export default ProfileHomeView;

const styles = StyleSheet.create({    
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
