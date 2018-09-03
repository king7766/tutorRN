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
  FlatList
} from 'react-native';




class NewsDetailView extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  render() {

    console.log('NewsDetailView')
    if ( this.props.news ){
      console.log('title = ' + this.props.news.news_title)
    }
      
    return (
      <View>
        { this.props.news &&
          <View
            style = {{flexDirection:'column'}}
          >
            <Image 
              style = {{height: 150, margin:10}}
              source = {{uri: this.props.news.news_thumb}}
              // cover, contain, stretch, center
              rezizeMode = 'stretch'
            />
            <ScrollView 
              style = {{height: 300, margin:10}}
            >
              <Text
                style = {{marginBottom:10}}
              >{this.props.news.description}</Text>
            </ScrollView>
          </View>
        }
      </View>
      
    );
  }
}

export default NewsDetailView;

/*
<FlatList 
              data = {[this.props.news.news_thumb,this.props.news.news_thumb,this.props.news.news_thumb,this.props.news.news_thumb]}
              style = {{height:150, backgroundColor:'red'}}
              horizontal
              renderItem = {({item: rowData}) => 
                <Image 
                  style = {{height: 150}}
                  source = {{uri: rowData}}
                  rezizeMode = 'stretch'
                />
              }
            />
            */