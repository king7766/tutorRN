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
  ListView
} from 'react-native';
import TutorProfileTextBlock from 'tutorRN/src/view/ui/TutorProfileTextBlock'
import PhotoThumbnailView from 'tutorRN/src/view/ui/PhotoThumbnailView'
import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
import Assets from 'tutorRN/src/view/ui/Assets';

import SegmentControl from './ui/SegmentControl'
const layout = require('tutorRN/src/Layout')
const numberOfItem = 4


class LessonDetailView extends Component<Props> {

  constructor(props) {
    super(props)
    
    this.backBtnOnClicked = this.backBtnOnClicked.bind(this)
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
   
  }

  componentWillMount() {

  }
 

  backBtnOnClicked(){
    this.props.backBtnOnClicked()
  }

  imageOnClicked(index){
    this.props.imageOnClicked(index)
  }

  ListingCatBtnOnClick(index){
    console.log('ListingCatBtnOnClick = ' + index)
  }

  render() {
    console.log('height = ' + layout.deviceHeight)


    return (
      <View
        style = {styles.background}
        onPress={()=>this.viewOnClicked()}
      >
        <View style = {styles.container} >
          <View style = {styles.titleBarStyle}>
            <TouchableOpacity 
              onPress={()=>this.backBtnOnClicked()}
            >
              <Image 
                style = {{height: 30, width:30}}
                source= {require('tutorRN/image/icons8-back-100.png')} 
              />
            </TouchableOpacity>
            <Text style = {styles.titleTextStyle}>英語</Text>
            <View style = {{height:30, width:30}}/>
          </View>
          <ScrollView style = {styles.scrollViewStyle}>
            <PhotoThumbnailView
              imageOnClicked = {(index)=>this.imageOnClicked(index)}
              imageSource = {this.props.imageSource}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'課堂簡介'}
              description = {'於約30分鐘課堂內, 以自創的「5老師口訣」配合圖像記憶法幫助學生記憶及學習, 並以魔術手法引發學生學習興趣及貫穿整個課程, 同時於課堂內運用多種教學技巧及方法, 使學生快樂而有效地進行學習。'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'地點'}
              description = {'九龍塘'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'價格'}
              description = {'$ 100'}
            />
            <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

            <FilteringToolsBar 
              onClicked = {(index)=>this.ListingCatBtnOnClick(index)}
              //catName = {['favourite', '聯絡', '報名']}
              //imageSource = {[Assets.actions.doc, Assets.actions.doc, Assets.actions.doc, Assets.actions.doc]}
            />
          </ScrollView>
        </View>
      </View>
      
    );
  }
}


export default LessonDetailView;

const styles = StyleSheet.create({  
  background:{

    flex:1,
    backgroundColor:'rgba(52,52,52,0.8)',
    height:layout.deviceHeight,
    width: layout.deviceWidth,
    //flexDirection:'column',
    //justifyContent:'center',
    alignItems: 'center',
  },

  hihi:{

    height:500,
    width:500,
    top:50,
    left:25,
    right:25,
    position:'absolute'
  },

  container:{
    
    borderRadius:20,
    backgroundColor:'white',
    height:layout.deviceHeight - 100,
    width:layout.deviceWidth - 50,
    alignItems:'center',
    top:50,
    bottom:50,
    left:25,
    right:25,
    position:'absolute'
  },

  titleBarStyle:{
    flexDirection:'row',
    borderRadius:20,
    height:40, 
    width:layout.deviceWidth - 50,
    //width:100,
    alignItems:'center',
    justifyContent:'space-between',

    //justifyContent:'center',
  
  },
  titleTextStyle:{
    fontWeight: 'bold',
    fontSize: layout.stringsSizeMid,
  },
  scrollViewStyle :{
    
    //backgroundColor:'blue',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0
  }
  
});


/*
<View style = {styles.container}>
     
          <View style = {styles.titleBarStyle}>
            <Text style = {styles.titleTextStyle}>英語</Text>
          </View>
          <ScrollView style = {styles.scrollViewStyle}>
            <View style = {{backgroundColor:'red', height:200}}></View>
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'課堂簡介'}
              description = {'於約30分鐘課堂內, 以自創的「5老師口訣」配合圖像記憶法幫助學生記憶及學習, 並以魔術手法引發學生學習興趣及貫穿整個課程, 同時於課堂內運用多種教學技巧及方法, 使學生快樂而有效地進行學習。'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'地點'}
              description = {'九龍塘'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'價格'}
              description = {'$ 100'}
            />
          </ScrollView>
          
        </View>
        */