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
  FlatList,
  //ScrollView,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
  WebView

} from 'react-native';


import * as E from 'tutorRN/src/service/env-config'
import * as C from 'tutorRN/src/service/connection'

//import NewsVideoCell from './ui/NewsVideoCell'
import NewsItemCell from 'tutorRN/src/view/ui/NewsItemCell'
import LoadingScreen from 'tutorRN/src/view/LoadingScreen'

import newsVM from 'tutorRN/src/VM/newsVM'
import targetUserVM from 'tutorRN/src/VM/targetUserVM'
import locationVM from 'tutorRN/src/VM/locationVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import userVM from 'tutorRN/src/VM/userVM'
import courseVM from 'tutorRN/src/VM/courseVM'


import PopupDialog, {DialogTitle, SlideAnimation, DialogButton, FadeAnimation, ScaleAnimation} from 'react-native-popup-dialog';
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')

//const viewModel = newsVM.getInstance()
const locationViewModel = locationVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const userViewModel = userVM.getInstance()
const targetUserViewModel = targetUserVM.getInstance()
const courseViewModel = courseVM.getInstance()


const slideAnimation = new SlideAnimation({ slideFrom: 'bottom',useNativeDriver: true });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

@observer
class NewsHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      
      //dataSource : viewModel.getNews(),
      dataSource : courseViewModel.getCourseList(),

      //dataSource : viewModel.tempNews(),
      //newsVM: viewModel.getNews(),
      //data: data,
      //data: viewModel.getNews(),
      locationVM : locationViewModel,
      isFetching: false ,

      showingIndex: 0,
      
    }
    this.cellItemOnClicked = this.cellItemOnClicked.bind(this)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.cellOnPressed = this.cellOnPressed.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
    this.pullToRefresh = this.pullToRefresh.bind(this)
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
            <Image source={require('tutorRN/image/exit-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
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

    if ( pageNum == -1 ){
      this.list.scrollToIndex({animated: true,index:0})
    }
    this.setState({
      showingIndex : pageNum
    })
    return 

    if ( pageNum == -1 ){
      if ( viewModel.getNews().length > 0){
        this.list.scrollToIndex({animated: true,index:0})
        pageNum = 0
      }
      
    }

    console.log('scrolled to page ', pageNum);

    if ( pageNum != this.state.showingIndex )
    {
      //DeviceEventEmitter.emit('showingNewsIndex', {showingIndex:pageNum});
      //console.log('setting showingIndex : ' + pageNum)
      //this.setState({
      //  showingIndex: this.state.showingIndex++
      //})
    }
    
  }

  soundBtnOnClicked (index)
  {
    console.log('soundBtnOnClicked : ' + index)
  }

  async likeBtnOnClicked(index)
  {
    
    const flag = await userViewModel.addFavourite(index)
    if ( flag)
    {
      
      console.log('likeBtnOnClicked succes')
    }
    else
    {
      console.log('likeBtnOnClicked fail')
    }
  }

  commentBtnOnClicked(index)
  {
    console.log('commentBtnOnClicked : ' + index)
  }

  async cellOnPressed(index)
  {
    //courseViewModel
    //console.log('cellOnPressed = '  + JSON.stringify(courseViewModel.getAllCourse() ))

    var tutor_id = courseViewModel.getAllCourse()[index].tutor_id
    var lesson_id = courseViewModel.getAllCourse()[index].id

    //var tutor_id = this.state.dataSource[index].tutor_id
    //var lesson_id = this.state.dataSource[index].id
   
    console.log('tutor_id = ' + tutor_id)
    console.log('lesson_id = ' + lesson_id)
    

    //tutor_id = 3
    //lesson_id = 2
    
    const flag = await targetUserViewModel.setUserProfile(tutor_id)
    
    if ( flag ){

      
      //console.log('ddd = ' + JSON.stringify(targetUserViewModel.getLessonById(lesson_id)) )

      this.props.navigation.navigate('NewsDetailView',{
        lessonDetailShow: true,
        tutor : targetUserViewModel.getUserProfile(),
        tutor_id : targetUserViewModel.getUserProfile().user_id,
        lesson_id : lesson_id,
        //lesson_list : targetUserViewModel.getUserProfile().course_list,
      })

      //console.log(targetUserViewModel.getUserProfile().user_id)
    }    
  }

 
  fetchMore(){
    console.log('fetchMore')

    courseViewModel.getNextCourseList()
    
    //viewModel.loadMore()
    /*
    const { data, newsVM } = this.state;
    if ( newsVM.length > data.length){
      this.setState({
        data:data.concat(newsVM[data.length])
      })
    }else{
      console.log('End of newsVM data ! Update the data in newsVM now')
    }
    */
  }

  async pullToRefresh(){

    console.log('pullToRefresh')
    courseViewModel.callAllCourseAPI()

    //viewModel.refresh()
    //viewModel.refresh()

    /*
    const res = await viewModel.refresh()
    if ( res )
    {
      this.setState({
        isFetching: false,
      })
    }
    return
    */
    
    /*

    var data = []
    for ( var i = 0; i < 2; i ++){
      data.push(viewModel.getNews()[i])
    }
    this.setState({
      dataSource : data,
      isFetching: false,
    })
    */

  }
  
  
  /*
  <NewsDetailView
              news = {this.state.newsVM[this.state.selectedIndex]}
            />
            */

  

  render() {
    //console.log('iii = ' + courseViewModel.getAllCourse().length)
    //<View style = {layout.styles.basicViewStyle}>
    return (
      
      <View style = {{height:layout.deviceHeight}}>
        {
          courseViewModel.getCourseList().length > 0 ?
          <FlatList

            keyExtractor= {(item, index)=>index.toString()}
            //windowSize = {1}
            onEndReached={this.fetchMore}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            ref={(ref) => { this.list = ref; }}
            onMomentumScrollEnd={this.onScrollEnd}
            //style = {{height:layout.contentHeight}}
            //style = {{flex:1}}
            //style = {layout.styles.basicViewStyle}
            data = {courseViewModel.getCourseList()}
            pagingEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={this.pullToRefresh}
              />
            }
            renderItem=
            {
              ({item, index, separators}) =>

              <NewsItemCell
                
                key = {index}
                item = {item}
                index = {index}
                showingIndex = {this.state.showingIndex}
                onClicked = {()=>this.cellOnPressed(index)}
                commentBtnOnClicked = {()=>this.commentBtnOnClicked(index)}
                likeBtnOnClicked = {()=>this.likeBtnOnClicked(index)}
                
              />
            }
          />
          :
          <View style = {{backgroundColor:'black'}}/>


        }
        
      </View>
    )
    
   
    return (
      <View style = {{flex:1}}>
        <FlatList
          onEndReached={this.fetchMore}
          onEndReachedThreshold={0.7}
          //windowSize={1}
          ref={(ref) => { this.list = ref; }}
          onMomentumScrollEnd={this.onScrollEnd}
          pagingEnabled={true}
          data={this.state.dataSource}
          //data = { viewModel.getNews()}
          extraData={this.state}

          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.pullToRefresh}
            />
          }

          keyExtractor={(item, index) => index.toString()}

          renderItem=
          {
            ({item, index, separators}) =>
              <NewsItemCell 
                item = {item}
              />

              
          }
        />
      </View>
    )
   
          /*
          <NewsVideoCell
                //news = {item}
                
                key = {index}
                item = {item}
                index = {index}
                showingIndex = {this.state.showingIndex}
                onClicked = {this.cellOnPressed}
                commentBtnOnClicked = {()=>this.commentBtnOnClicked(index)}
                likeBtnOnClicked = {()=>this.likeBtnOnClicked(index)}
                soundBtnOnClicked = {()=>this.soundBtnOnClicked(index)}
              />
              */
    return (
      <View style = {{flex:1}}>
      
        {
        
        <PopupDialog
          //dialogTitle={<DialogTitle title= "123" />}
              ///dialogTitle={<DialogTitle title= {viewModel.getNewsWithID(this.state.selectedNewsID) ? viewModel.getNewsWithID(this.state.selectedNewsID).news_title :"新聞標題"} />}
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
                commentBtnOnClicked = {()=>this.commentBtnOnClicked(index)}
                likeBtnOnClicked = {()=>this.likeBtnOnClicked(index)}
                soundBtnOnClicked = {()=>this.soundBtnOnClicked(index)}
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