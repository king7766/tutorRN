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
  ScrollView
} from 'react-native';

//import SegmentControl from './ui/SegmentControl'
//import TutorSelectCell from './ui/TutorSelectCell'

import {
  SegmentControl,
  TutorSelectCell,
  TopMenuBar
} from '/view/ui/UIComponent';


const layout = require('../Layout')


class SearchTutorView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.selectTutor = this.selectTutor.bind(this)
    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      data: [
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 1,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 2,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 3,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 4,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 5,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
      ]
    };
  }

  componentWillMount() {

  }

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  selectTutor (index ){
    console.log('selectTutor ' + index)
    this.props.navigation.navigate('SearchTutorDetailView',{
      id :'121'
      }
    )
  }

  TopMenuBarOnClicked(index)
  {
    
    console.log('TopMenuBarOnClicked :' + index)  
  }

  render() {

    const { params } = this.props.navigation.state;
    const location = params ? params.location : null;
    const district = params ? params.district : null;
    const education = params ? params.education : null;
    const subject = params ? params.subject : null;

    var condition = [location, district, education, subject]
    console.log( 'condition = ' + condition)

    return (
      <View>
        
        <TopMenuBar 
          //data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
          data = {condition}
          size = {50}
          itemHeight = {30}
          itemWidth = {50}
          selected = {0}
          
          onClicked={ this.TopMenuBarOnClicked }
        />
        <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>
        <ScrollView>
        {
          
          this.state.data.map((item, index) =>
            (
              
                <TutorSelectCell
                  key = {index}

                  onClicked = {this.selectTutor }
                  id = {item.id}
                  imageURL = {item.image}
                  name = {item.name}
                  subject = {item.subject}
                  rating = {item.rating}
                  location = {item.location}
                  price = {item.price}
                />
              

            )
          )
          
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default SearchTutorView;


/*

<SegmentControl
          onClicked = {this.tabOnClicked}
          data = {condition}
          touchColor = {'transparent'}
          textColor = {'rgba(216,72,118,1)'}
          numberOfItem = {4}
          pressEnable = {false}
          //touchColor = {'rgba(216,72,118,1)'}
        />
        */