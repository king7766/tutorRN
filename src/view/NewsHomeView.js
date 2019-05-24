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
  DeviceEventEmitter,
  FlatList,
  WebView

} from 'react-native';


//import Navigator from 'react-native-deprecated-custom-components'

import NewsVideoCell from './ui/NewsVideoCell'
import newsVM from 'tutorRN/src/VM/newsVM'

import locationVM from 'tutorRN/src/VM/locationVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'

//import AddBtnPopUpDialog from 'tutorRN/src/view/ui/AddBtnPopUpDialog'
import PopupDialog, {DialogTitle, SlideAnimation, DialogButton, FadeAnimation, ScaleAnimation} from 'react-native-popup-dialog';
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')

const viewModel = newsVM.getInstance()
const locationViewModel = locationVM.getInstance()
const categoryViewModel = categoryVM.getInstance()

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom',useNativeDriver: true });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });


@observer
class NewsHomeView extends Component<Props> {

  constructor(props) {
    super(props);

    //const { navigate } = this.props.navigation;
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    //props.navigation.setParams({
    //  onTabFocus: this.handleTabFocus
    //});

    this.state = {
      newsVM: viewModel.getNews(),
      locationVM : locationViewModel,
    

      showingIndex: 0,
      data :[
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: '6HQvwHpEzao',
          type: 1,
        },
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: '6HQvwHpEzao',
          type: 2,
        },
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: null,
          type: 0,
        },
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: '6HQvwHpEzao',
          type: 1,
        },
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: '6HQvwHpEzao',
          type: 2,
        },
        {
          creator:'KingTai Leung',
          comment_count: 53,
          like_count : 24,
          profilePic : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=95ad2a3e8d4367d6bb6a56f8c02fa0a1&oe=5CB99BD7',
          news_title : '現代教育補習班',
          news_content : '現代教育補習社-提供各類型中小學補習班,包括英文補習班、數學補習班、中文補習班、通識補習班、物理補習班等. 我們的補習導師均為行內知名的星級補習名師',
          video :'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8',
          //video:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4',
          //cover : 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg',
          cover : 'https://img.youtube.com/vi/6HQvwHpEzao/0.jpg',
          youtubeId: null,
          type: 0,
        }
      ]
    }
    this.cellItemOnClicked = this.cellItemOnClicked.bind(this)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.cellOnPressed = this.cellOnPressed.bind(this)
  }


  /*
  static navigationOptions = ({ navigation }) => ({
    title: strings.home,
  });

  handleTabFocus = () => {
    console.log('tabBarOnPress')
    // perform your logic here
  };
  */

  /*
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      
      tabBarOnPress({ jumpToIndex, scene }) {
        
        // now we have access to Component methods
        console.log('onTabFocus')
        params.onTabFocus();
        jumpToIndex(scene.index);
      }
    };
  }
  */
    

  

  
  /*
  static navigationOptions = ({ navigation }) => ({
    title: '123',
  });
  

  
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
  */

  componentDidMount()
  {
    
  }

  componentWillMount() {
    //this.props.navigation.setParams({ leftBtnOnClick: this._signOutAsync });
  }

  _signOutAsync = async () => {
    console.log('_signOutAsync from NewsHome')
    await AsyncStorage.clear();
    //this.props.navigation.navigate('Auth');
    //DeviceEventEmitter.emit('logout', {name:'John', age:23});
    DeviceEventEmitter.emit('signOut', {});
  };

  cellItemOnClicked (newsID)
  {
    //console.log('cellItemOnClicked = ' + newsID)
    //console.log(viewModel.getNewsWithID(newsID))
    this.setState({selectedNewsID: newsID})

    // Required to bind to this component first, otherwise cant find method
    this.defaultAnimationDialog.show()
  }

  onScrollEndDrag(e){
    console.log(e.nativeEvent);
  }

  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    //console.log('contentOffset = ' + contentOffset)
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.y / viewSize.height);
    console.log('scrolled to page ', pageNum);

    this.setState({
      showingIndex: pageNum
    })
  }

  cellOnPressed(index)
  {
    console.log('cell OnPressed ' + index)
    this.props.navigation.navigate('NewsDetailView',{})
    //this.props.navigation.navigate('SearchTutorDetailView');
    /*
    this.props.navigation.navigate('SearchTutorDetailView',{
      id :'121',
      allowEdit: false,
    });
    */
    
    //console.log(locationViewModel.getLocationListFromDistrict(1) );
    //console.log(locationViewModel.getDistrictList() )

    //console.log(categoryViewModel.getCategory() )
    //console.log(categoryViewModel.getSubCategory() )
    //console.log(categoryViewModel.getSubCatFromCat(1))

  }

 
  
  
  /*
  <NewsDetailView
              news = {this.state.newsVM[this.state.selectedIndex]}
            />
            */

  

  render() {
   
    
   

    return (
      <View style = {{flex:1}}>
      
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
              /*
                           <NewsDetailView
                news = {viewModel.getNewsWithID(this.state.selectedNewsID)}
              />*/
            >
         
              <View/>
              
          
            
        </PopupDialog>
        }

        
       
        <ScrollView
          style = {{flex:1}}
          pagingEnabled = {true}
          onMomentumScrollEnd={this.onScrollEnd}

          /*
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
                      <PhotoSlideView/>
          */
        >
        
        
          
        {  
          this.state.newsVM.map((item, index) =>
          //this.state.data.map((item, index) =>
            (
             /* 
              <YouTube
              key = {index}
              //ref={(component) => { this._youTubePlayer = component }}
              videoId="vzPmI0GCDPM"           // The YouTube video ID
              //playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
              play={true}                     // control playback of video with true/false
              playsInline={true}              // control whether the video should play full-screen or inline
              loop={true}   
              showinfo = {false}                 // control whether the video should loop when ended
              //control = {2}
              showFullscreenButton = {true}
              //modestbranding = {true}
            
              onReady={e => console.log('onReady')}
              //onReady={e => this.setState({ isReady: true })}
              //onChangeState={e => this.setState({ status: e.state })}
              onChangeState={e => console.log('onChange State = ' + e.state)}
              //onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => console.log('onError ' + e.error )}
              //onError={e => this.setState({ error: e.error })}
              //onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}
            
              //style={{ alignSelf: 'stretch', height: 300, width: 300, backgroundColor: 'black', marginVertical: 10 }}
              style = {{height: layout.deviceHeight, width: layout.deviceWidth}}
            />
              */
             
              
              
              <NewsVideoCell
                //news = {item}
                
                key = {index}
                item = {item}
                index = {index}
                showingIndex = {this.state.showingIndex}
                onClicked = {this.cellOnPressed}
              />
              
             
         
              /*
              <NewsCell
                key = {index}
                news = {item}
                onClicked = {this.cellItemOnClicked }
                
              />
              */
              
            )
          )
        }
        </ScrollView>
        
      </View>
      
    );
  }
}

export default NewsHomeView;