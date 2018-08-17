/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {observer} from 'mobx-react'
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
  AsyncStorage,
  RefreshControl

} from 'react-native';

//import Navigator from 'react-native-deprecated-custom-components'
import NewsCell from './ui/NewsCell'
import newsVM from '../VM/newsVM'
const layout = require('../Layout')
const viewModel = newsVM.getInstance()

@observer
class NewsHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.state = {
      newsVM: viewModel.getNews()
    }

    //console.log('data = ' + this.state.data)

    /*
    this.state = {
      data: [
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '1'
        },
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '2'
        },
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '3'
        },
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '4'
        },
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '5'
        },
        {
          'image': 'https://static.appledaily.hk/images/e-paper/vdo/20180427/720pix/1524815968_d8fd.jpg',
          'title': '標題標題標題標題標題標題標題標題標題標題標題標題標題',
          'content': '內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容',
          'id': '6'
        }
      ]
    };
    */

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
            <Image source={require('../image/exit-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
          </View>

        </TouchableHighlight>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ leftBtnOnClick: this._signOutAsync });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  refresh ()
  {
    console.log('refresh')
  }

  selectedIndex (index)
  {
    console.log('index = ' + index)
  }

  render() {
   
    return (
      <View>
      
        <ScrollView
          /*
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
          */
        >
        {
          this.state.newsVM.map((item, index) =>
            (
              <NewsCell
                key = {index}
                news = {item}
                onClicked = {this.selectedIndex }
                
              />

            )
          )
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default NewsHomeView;