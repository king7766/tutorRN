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
import Assets from 'tutorRN/src/view/ui/Assets';

import {
  LessonListCell,
  RowMenuListingBar
} from 'tutorRN/src/view/ui/UIComponent';





import courseVM from 'tutorRN/src/VM/courseVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import targetUserVM from 'tutorRN/src/VM/targetUserVM'

const layout = require('tutorRN/src/Layout')
const courseViewModel = courseVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const targetUserViewModel = targetUserVM.getInstance()

class SearchTutorView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    const { params } = this.props.navigation.state;
    const tag = params ? params.tag : null
    const data = params ? params.data : null

    this.selectedLesson = this.selectedLesson.bind(this)
    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      tag: tag,
      //data: courseViewModel.getCourseByTag(tag)
      data : data,
    };

    console.log('11data = ' + this.state.data)
  }

  componentWillMount() {

  }

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  async selectedLesson (index ){

    console.log('selectedLesson ' + JSON.stringify(this.state.data[index]) )
    //console.log('selectedLesson ' + JSON.stringify(courseViewModel.getCourseByTag(this.state.tag)[index]))

    var tutor_id = this.state.data[index].tutor_id
    var lesson_id = this.state.data[index].id

    const flag = await targetUserViewModel.setUserProfile(tutor_id)
    
    if ( flag ){
      this.props.navigation.navigate('NewsDetailView',{
        lessonDetailShow: true,
        tutor : targetUserViewModel.getUserProfile(),
        tutor_id : targetUserViewModel.getUserProfile().user_id,
        lesson_id : lesson_id,
      })
    }
    
    /*
    this.props.navigation.navigate('SearchTutorDetailView',{
      id :'121',
      allowEdit: false,
      }
    )
    */
  }

  async TopMenuBarOnClicked(index)
  {
   
    if ( index == 0 )
    {

    }
    else
    {

    
     
    }
    console.log('TopMenuBarOnClicked :' + index)  
  }

  render() {

    const { params } = this.props.navigation.state;
    //const location = params ? params.location : null;
    //const district = params ? params.district : null;
    //const education = params ? params.education : null;
    //const subject = params ? params.subject : null;

    //var condition = ['',categoryViewModel.getCategoryNameByID( this.state.tag)]
    //var dataSource = [categoryViewModel.getCategoryNameByID( this.state.tag)]


    //var name = categoryViewModel.getCategoryNameByID( this.state.tag)
    //var rowListBarDataSource = [name]
    var tagSelectedArray = []
    for ( var i = 0 ; i <= this.state.tag.length; i ++)
    {
      tagSelectedArray.push(true)
    }
    //var rowMenuInitArray = [true, true]

    //console.log('getCategoryNameByID = ' + JSON.stringify(categoryViewModel.getCategoryNameByID( this.state.tag)))
    return (
      <View style = {layout.styles.basicViewStyle}>
        {
          <RowMenuListingBar 
            firstItemShowIcon = {true}
            firstImageSource = {Assets.icon.advanceSearch} 
            //data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
            data = {this.state.tag}
            //data = {rowListBarDataSource}
            
            itemHeight = {30}
            itemWidth = {50}
            selected = {0}
            multiSelect = {true}
            //multiSelectArray = {rowMenuInitArray}
            multiSelectArray = {tagSelectedArray}
            onClicked={ this.TopMenuBarOnClicked }
          />
          
        }
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
        <ScrollView>
        {
          
          //this.state.data.map((item, index) =>
          this.state.data.map((item, index) =>
            (
              
              <LessonListCell
                key = {index}
                action = {"LIKE"}
                onClicked = {()=>this.selectedLesson(index) }
                id = {item.id}
                item = {item}
                  /*
                  imageURL = {item.image}
                  name = {item.name}
                  subject = {item.subject}
                  rating = {item.rating}
                  location = {item.location}
                  price = {item.price}
                  */
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