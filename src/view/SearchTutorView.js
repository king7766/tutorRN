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
  SeparatorBar,
  LessonListCell,
  RowMenuListingBar
} from 'tutorRN/src/view/ui/UIComponent';





import courseVM from 'tutorRN/src/VM/courseVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import targetUserVM from 'tutorRN/src/VM/targetUserVM'
import userVM from 'tutorRN/src/VM/userVM'

const layout = require('tutorRN/src/Layout')
const courseViewModel = courseVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const targetUserViewModel = targetUserVM.getInstance()
const userViewModel = userVM.getInstance()

class SearchTutorView extends Component<Props> {

  constructor(props) {
    super(props);
    console.log('pp = ' + JSON.stringify (this.props) )
    
    const { params } = this.props.navigation.state;
    const tag = params ? params.tag : null
    const data = params ? params.data : null
    const sub_categoryArray = params ? params.sub_categoryArray : null
    const c_id = params ? params.c_id : null
    const subcat_id = params ? params.subcat_id : null
    console.log('sub_categoryArray = ' + JSON.stringify (sub_categoryArray) )

    console.log('subcat_id = ' + subcat_id)
    var sub_categoryNames = []
    var tagSelectedArray = [true] // init
    //tagSelectedArray.push(true)
    for ( var i = 0; i < sub_categoryArray.length; i ++)
    {
      sub_categoryNames.push(sub_categoryArray[i].category_name)
      if (subcat_id != null && subcat_id != -1)
      {
        if (subcat_id == sub_categoryArray[i].id)
        {
          tagSelectedArray.push(true)
        }
        else
        {
          tagSelectedArray.push(false)
        }
      }
      else
      {
        tagSelectedArray.push(true)
      }
      
    }
    

    this.selectedLesson = this.selectedLesson.bind(this)
    this.state = {
      tag: tag,
      sub_categoryArray : sub_categoryArray,
      sub_categoryNames : sub_categoryNames,
      tagSelectedArray: tagSelectedArray,
      //data : data,
      subcat_id: subcat_id,
      c_id : c_id,
      data : courseViewModel.getCourseByCategory(c_id)
    };

    this.TopMenuBarOnClicked = this.TopMenuBarOnClicked.bind(this)
  }

  componentWillMount() {

  }

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  async actionBtnOnClicked(index)
  {
    const flag = await userViewModel.addFavourite(index)
    if ( flag )
    {
      console.log('likeBtnOnClicked succes')
    }
    else
    {
      console.log('likeBtnOnClicked fail')
    }
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

  TopMenuBarOnClicked(index)
  {
   
    if ( index == 0 )
    {

    }
    else
    {
      const tagSelectedArray = this.state.tagSelectedArray.map((item, i) => {
        return (i != index ? item : !item)
      })
      
      const tag_id_selectedArray = this.state.sub_categoryArray.map((item, i )=>{
        if (tagSelectedArray[i+1] == true){
          return item.id
        }
      })
      
    }
    //console.log('TopMenuBarOnClicked :' + index)  
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
    

    //console.log('sub_categoryArray = ' + JSON.stringify(this.props.sub_categoryArray) )
    //console.log('tag = ' + JSON.stringify(this.props.tag) )
    //var rowMenuInitArray = [true, true]

    //console.log('getCategoryNameByID = ' + JSON.stringify(categoryViewModel.getCategoryNameByID( this.state.tag)))
    return (
      <View style = {layout.styles.basicViewStyle}>
        {
          <RowMenuListingBar 
            firstItemShowIcon = {true}
            firstImageSource = {Assets.icon.advanceSearch} 
            //data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
            data = {this.state.sub_categoryNames}
            //data = {rowListBarDataSource}
            
            itemHeight = {40}
            itemWidth = {60}
            selected = {0}
            multiSelect = {true}
            //multiSelectArray = {rowMenuInitArray}
            multiSelectArray = {this.state.tagSelectedArray}
            onClicked={this.TopMenuBarOnClicked }
          />
          
        }
        <SeparatorBar />
        <ScrollView>
        {
          
          //this.state.data.map((item, index) =>
          this.state.data.map((item, index) =>
            (
              
              <LessonListCell
                key = {index}
                action = {"LIKE"}
                onClicked = {()=>this.selectedLesson(index) }
                actionBtnOnClicked = {(index)=>this.actionBtnOnClicked(index)}
                id = {item.id}
                item = {item}
                like = {userViewModel.getUserFavouritedByCourseID(item.id)}
                
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