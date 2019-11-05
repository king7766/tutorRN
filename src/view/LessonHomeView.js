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
  AsyncStorage
} from 'react-native';

//import segmentedControl from 'tutorRN/src/segmentedControlMain'

//import NewsCell from './ui/NewsCell'
import LessonCell from './ui/LessonCell'
import SegmentControl from './ui/SegmentControl'

import Welcome from './Welcome'

const layout = require('tutorRN/src/Layout')


class LessonHomeView extends Component<Props> {

  constructor(props) {
    super(props);

    this.navButtonOnClick = this.navButtonOnClick.bind(this)


    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      data: [
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 1,
          'id': '1'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '2'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 3,
          'id': '3'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 1,
          'id': '4'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '5'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '6'
        },
      ]
    };
    
  }

  navButtonOnClick= (index) =>
  {
    console.log('navButtonOnClick ' + index)
  }
  
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      //headerLeft:<Button title="Info" onPress = {params.rightBtnOnClick}/>,
      headerRight: (

        //<Button onPress={params.increaseCount} title="Info" />
        <TouchableHighlight 
          onPress={params.rightBtnOnClick}
          //onPress={params.increaseCount}
          underlayColor = {layout.touchHighlightColor}
        >
          <View style = {{height: 30, width: 100, justifyContent: 'center', flexDirection: 'row'}}>
            <Image source={require('tutorRN/image/inbox-filled-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
          </View>

        </TouchableHighlight>
      ),
    };
  };

  /*
  static navigationOptions = {

    //const params = navigation.state.params || {};
    //const { params } = this.props.navigation.state;

    headerTitle: this.title,
    headerLeft: <Button 
      title="Info"
      onPress = {this.goBack}
      />,
    //headerLeft: <Button onPress={this.goBack} title="+1" color="#fff" />,
    //headerLeft: ({ goBack }) => <Icon name={"close"} onPress={goBack} />,
    headerRight: 
    <TouchableHighlight 
        //const { params } = this.props.navigation.state;
        //onPress= {this.navButtonOnClick}
        onPress={this.navButtonOnClick }
        //onPress={this.selectTutor }
        //underlayColor = {layout.touchHighlightColor}
        underlayColor = {layout.touchHighlightColor}
        >
      <Image source={require('tutorRN/image/inbox-filled-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
      
        
      
    </TouchableHighlight>
  
    
  };
  */

  componentWillMount() {
    //this.props.navigation.setParams({ handleSave: this.navButtonOnClick });
    this.props.navigation.setParams({ rightBtnOnClick: this._signOutAsync });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


  rightBtnOnClick = () => {
    console.log('rightBtnOnClick')
    //this._navigate('SOME NAME')
  };

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  selectedLesson (index ){
    console.log('selectedLesson ' + index)
    //this.props.navigation.navigate('SearchTutorDetailView',{
    //  id :'121'
    //  }
    //)
  }

  render() {



    return (
      <View>
        <SegmentControl
          //onClicked = {this.tabOnClicked}
          onClicked = {this.tabOnClicked}
          data = {this.state.sgData}
          colorTheme = {'rgba(216,72,118,1)'}
          textColor = {'rgba(216,72,118,1)'}
          numberOfItem = {3}
          //touchColor = {'rgba(216,72,118,1)'}
        />
        
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
        
        <ScrollView>
        {
          this.state.data.map((item, index) =>
            (
              <LessonCell
                key = {index}
                id = {item.id}
                onClicked = {this.selectedLesson }
                lesson = {item}
                imageURL = {item.image}
                
                title = {item.title}
                content = {item.content}
              />
              
            )
          )
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default LessonHomeView;
