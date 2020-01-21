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


import {observer} from 'mobx-react'


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

@observer
class SearchTutorView extends Component<Props> {

  constructor(props) {
    super(props);
    console.log('pp = ' + JSON.stringify (this.props) )
    
    const { params } = this.props.navigation.state;
    const tag = params ? params.tag : null
    const data = params ? params.data : null
    const sub_categoryArray = params ? params.sub_categoryArray : null
    const cat_id = params ? params.cat_id : null
    const subcat_id = params ? params.subcat_id : null
    console.log('sub_categoryArray = ' + JSON.stringify (sub_categoryArray) )

    console.log('subcat_id = ' + subcat_id)
    console.log('cat_id = ' + cat_id)

    //console.log('c = ' + JSON.stringify(courseViewModel.getCourseByCategory(c_id)))

    
    /*
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
    */

    this.state = {
      cat_id : cat_id,
      subcat_id : subcat_id,
      data : courseViewModel.getCourseByCategory(cat_id),
      topbarDataSource: categoryViewModel.getSubCategoriesByCategoryId(cat_id)
    }
    this.topBarUI = this.topBarUI.bind(this)
    this.selectedLesson = this.selectedLesson.bind(this)
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

  async TopMenuBarOnClicked(index)
  {
   
    
    if ( index == -1 )
    {

    }
    else
    {
      await categoryViewModel.updateSelectedSubcategoriesFlagList(index)

      console.log(JSON.stringify(categoryViewModel.getSelectedSubcategoriesFlagList()))
      return 
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

  topBarUI()
  {
    //const cat_id = this.props.navigation.state.params.cat_id
    var names = []
    var tagSelectedArray = [] // init

    console.log('topBarUI')
    //console.log(JSON.stringify(data[0].category_name))

     
    for ( var i = 0; i < categoryViewModel.getSubCategoryNamesBySelectedCategories().length; i ++)
    {
      names.push(categoryViewModel.getSubCategoryNamesBySelectedCategories()[i].category_name)
      tagSelectedArray.push(true)
    }

    if ( this.state.topbarDataSource.length > 0)
    {
      return (
        <RowMenuListingBar 
          showConfigIcon = {false}
          data = {names}
          itemHeight = {40}
          itemWidth = {60}
          multiSelectArray = {categoryViewModel.getSelectedSubcategoriesFlagList()}
          onClicked={ this.TopMenuBarOnClicked }      
        />
      )
    }

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
    //userViewModel.getUserFavourite()
    return (
      <View style = {layout.styles.basicViewStyle}>
        {
          this.topBarUI()
        }
        {
          /* 
          <RowMenuListingBar 
            firstItemShowIcon = {true}
            firstImageSource = {Assets.icon.advanceSearch} 
            //data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
            //data = {this.state.sub_categoryNames}
            data = {categoryViewModel.getSubCategoriesNamesByCategoryId(this.state.cat_id)}
            //data = {rowListBarDataSource}
            
            itemHeight = {40}
            itemWidth = {60}
            selected = {0}
            multiSelect = {true}
            //multiSelectArray = {rowMenuInitArray}
            multiSelectArray = {this.state.tagSelectedArray}
            onClicked={this.TopMenuBarOnClicked }
          />
          */
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