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
  RefreshControl,
  DeviceEventEmitter

} from 'react-native';

//import Navigator from 'react-native-deprecated-custom-components'
import NewsCell from './ui/NewsCell'
import NewsVideoCell from './ui/NewsVideoCell'
import newsVM from '../VM/newsVM'
import NewsDetailView from '/view/NewsDetailView'
import AddBtnPopUpDialog from '/view/ui/AddBtnPopUpDialog'
import PopupDialog, {DialogTitle, SlideAnimation, DialogButton, FadeAnimation, ScaleAnimation} from 'react-native-popup-dialog';

const layout = require('../Layout')
const viewModel = newsVM.getInstance()

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom',useNativeDriver: true });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });


@observer
class NewsHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.state = {
      newsVM: viewModel.getNews(),
      selectedIndex: 0
    }
    this.cellItemOnClicked = this.cellItemOnClicked.bind(this)

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
    console.log('_signOutAsync')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    DeviceEventEmitter.emit('logout', {name:'John', age:23});
  };

  cellItemOnClicked (newsID)
  {
    //console.log('cellItemOnClicked = ' + newsID)
    //console.log(viewModel.getNewsWithID(newsID))
    this.setState({selectedNewsID: newsID})

    // Required to bind to this component first, otherwise cant find method
    this.defaultAnimationDialog.show()
  }

  
  
  /*
  <NewsDetailView
              news = {this.state.newsVM[this.state.selectedIndex]}
            />
            */

  

  render() {
   
   
   

    return (
      <View>
        {
          
          
        <PopupDialog
          //dialogTitle={<DialogTitle title= "123" />}
              dialogTitle={<DialogTitle title= {viewModel.getNewsWithID(this.state.selectedNewsID) ? viewModel.getNewsWithID(this.state.selectedNewsID).news_title :"新聞標題"} />}
              //height= {350}
              height= {layout.deviceHeight * 2 / 3}
              dialogStyle = {{position:'absolute', top:70}}
              dialogAnimation={slideAnimation}
              //dialogButton = {<DialogButton text={'TEXTEXT'}/>}
              //dialogStyle={{marginTop:-300}} 
              //dialogStyle={{ position:'absolute', top: layout.deviceWidth/3}} 
              //dialogAnimation = {fadeAnimation}
              //ref={(popupDialog) => { this.popupDialog = popupDialog; }}

              actions={[
                <DialogButton
                  text="DISMISS"
                  onPress={() => {
                    this.defaultAnimationDialog.dismiss();
                  }}
                  key="button-1"
                />
              ]}

              ref={(defaultAnimationDialog) => {
                this.defaultAnimationDialog = defaultAnimationDialog;
              }}

              
              // <TouchableHighlight underlayColor = {'transparent'} onPress={() => { this.refs._scrollView.scrollTo({x:SCREEN_WIDTH}) }}>
              //ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            >
         
            
              <NewsDetailView
                news = {viewModel.getNewsWithID(this.state.selectedNewsID)}
              />
              
          
            
        </PopupDialog>
        }
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
                onClicked = {this.cellItemOnClicked }
                
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