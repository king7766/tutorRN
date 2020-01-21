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
  ListView
} from 'react-native';

import SegmentControl from './ui/SegmentControl'

import {
  TutorRowFlatList,
  RowMenuListingBar,
  SeparatorBar,
  BannerView,
} from 'tutorRN/src/view/ui/UIComponent';

import Assets from 'tutorRN/src/view/ui/Assets';

import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import courseVM from 'tutorRN/src/VM/courseVM'
import targetUserVM from 'tutorRN/src/VM/targetUserVM'
import strings from 'tutorRN/src/service/strings'


const layout = require('tutorRN/src/Layout')
const numberOfItem = 4




//const courseTagViewModel = courseTagVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const courseViewModel = courseVM.getInstance()
const targetUserViewModel = targetUserVM.getInstance()




class LogoTitle extends React.Component {
  render() {
    return (
      <View
        style = {{backgroundColor:'white', }}
      >
        <View style = {{height:44}}/>
        <Text
          style= {{
            marginLeft:10,
            height:layout.headerHeight, 
            backgroundColor:'white',
            fontFamily:"ProximaNova-Bold", 
            fontSize:layout.stringsSizeLogoName, 
            color:layout.themeTextColor
          }}

        >WoleiLearn</Text>

      </View>
      

    )
  }
}

@observer
class SearchHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    
    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})   
    
    //courseTagNames.splice(0,0, '')

    
    //var courseTagSelection = new Array(courseTagNames.length).fill(false)

    /* 
    var tagSelectedArray = [true] // init
    for ( var i =0; i < courseViewModel.getCourseTagNames().length; i ++)
    {
      tagSelectedArray.push(true)
    }
    */

    //console.log('courseTagNames = ' + JSON.stringify(courseTagNames))
    //console.log('courseTagNames = ' + JSON.stringify(courseTagNames))

    this.state = {
      //tagSelectedArray: tagSelectedArray,
      //courseTagNames : courseViewModel.getCourseTagNames(),
      //courseTagNames : [],
      //courseTagSelection : courseTagSelection,
      courseTagSelection : [],
      //courseTagSelection : courseViewModel.getCourseTagIdList(),

      categories: categoryViewModel.getCategories(), 
      //categories : ds.cloneWithRows(categoryViewModel.getCategories()),
     
      districtData : ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
      currentDistrictData:['中西區', '灣仔', '東區','南區'],
      educationData : ['小學', '中學', '大學以上'],
      
      locationSelected : 0,
      districtSelected : 0,
      educationSelected : 0,
      subjectSelected : 0,

      tutorRowData:[
        {
          name:'name111',
          id:'111',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
        {
          name:'name222',
          id:'222',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
        {
          name:'name333',
          id:'333',
          url:'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683',
        },
      ]
      
    }

    //console.log('categories = ' + this.state.categories)
    //console.log('courseTagNames = ' + this.state.courseTagNames)

    this.cellStyle = this.cellStyle.bind(this)
    this.tabOnClicked = this.tabOnClicked.bind(this)
    this.TopMenuBarOnClicked = this.TopMenuBarOnClicked.bind(this)
    this.ListingCatBtnOnClick = this.ListingCatBtnOnClick.bind(this)
    this.categorysViewUI =this.categorysViewUI.bind(this)
    this.bannerOnClicked = this.bannerOnClicked.bind(this)
    this.topBarUI = this.topBarUI.bind(this)
  }

  componentWillMount() {
    
  }

  componentDidMount()
  {
     
  }

  static navigationOptions = ({ navigation }) => ({
    title: strings.home,
  });


  tabOnClicked(index, key ){
    var arr = []
    if ( key === 1)
    {
      if ( index === 0 )
      {
        for ( var i = 0; i < 4; i ++){
          arr.push(this.state.districtData[i])
        }
      }
      else if ( index === 1)
      {
        for ( var i = 4; i < 9; i ++){
          arr.push(this.state.districtData[i])
        }

      }
      else if ( index === 2)
      {
        for ( var i = 9; i < 17; i ++){
          arr.push(this.state.districtData[i])
        }

      }
      this.setState({
        locationSelected: index,
        currentDistrictData:arr
      })
    }
    else if ( key === 2 )
    {
      this.setState({
        districtSelected: index
      })
    }
    else if ( key === 3 )
    {
      this.setState({
        educationSelected: index
      })
    }

    

  }

  getRows(){        
    var Arr = [];        
    for(var i = 1; i < 16; i++){           
      Arr.push(
        {                   
          image: require('tutorRN/image/icon-math.png'),
          price:'中文1'                
        }            
      )        
    }        
    return Arr;    
  }

  cellStyle (rowID)
  {

    
    var width = (layout.deviceWidth - 50 )/numberOfItem //cell的宽度        
    return {
      
      //flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor : 'red',
      width:width, //cell的宽度        
      height: 100,
      marginLeft:5, 
      marginRight:5,        
      marginTop:10 
    }
  }

  iconImageStyle (rowData)
  {
    var cellWidth = (layout.deviceWidth - 50 )/numberOfItem
    var width = cellWidth - 10
    width = 60
    var color 

    //var rand = Math.floor(Math.random() * 4) 
    var rand = rowData
    if( rand % 4 == 0 )
    {
      color = 'rgba(194,127,115,1)'
    }
    else if (rand % 4 == 1)
    {
      color = 'rgba(143,181,127,1)' 
    }
    else if (rand % 4 == 2)
    {
      color = 'rgba(117,164,175,1)' 
    }
    else if (rand % 4 == 3)
    {
      color = 'rgba(194,101,143,1)' 
    }

    return {
      //flex:2,
      justifyContent: 'center',
      alignItems: 'center',

      shadowColor: layout.grayColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,

      borderColor: layout.grayColor,
      borderWidth: 0.5,
      borderRadius: width/2,
      //backgroundColor : color,

      width: width,
      height: width,
      //paddingTop: 5

    }
  }

  iconTextStyle (rowData)
  {
    return {
      //flex:1,
      color: 'black',
      fontSize: layout.stringsSizeMid,
      justifyContent: 'center',
      alignItems: 'center',
      //fontWeight: 'bold',
      //backgroundColor : 'green',
      marginTop: 10,
      marginBottom:10,
      //width: '100%',

    }

  }

  async ListingCatBtnOnClick (rowData)
  {
    //console.log('ListingCatBtnOnClick ' + JSON.stringify (rowData.sub_category) )

    /*
    var sub_categoryArray = rowData.sub_category
    var tag_Array = []
    for ( var i = 0 ; i < sub_categoryArray.length; i ++)
    {
      tag_Array.push(sub_categoryArray[i].category_name)
    }

    console.log('tag_Array ' + JSON.stringify (tag_Array) )
    console.log(rowData.id)
    */
    
    const res = await courseViewModel.updateCourseByCategoryId(rowData.id)
    categoryViewModel.setSelectedCategories(rowData.id)

    if (res == true)
    {
      
      var submit_data = courseViewModel.getCourseByCategory(rowData.id)
      var cat_id = rowData.id
      console.log(cat_id + ' getCourseByCategory : ' +JSON.stringify(submit_data) )

      
      
      this.props.navigation.navigate(
        'SearchTutorView',{
          //sub_categoryArray: sub_categoryArray,
          //tag:tag_Array,
          data : submit_data,
          cat_id: cat_id,
        }
      )
      
    }
    else
    {

    }

      

    /*
    this.props.navigation.navigate('SearchTutorView',{
      location : this.state.locationData[this.state.locationSelected],
      district : this.state.districtData[this.state.districtSelected],
      education : this.state.educationData[this.state.educationSelected],
      subject : this.state.subjectData[this.state.subjectSelected].name,
      }
    );
    */
  }

  bannerOnClicked(index)
  {
    console.log('bannerOnClicked = ' + index)
  }

  async TopMenuBarOnClicked(input_index)
  {
    
    console.log('TopMenuBarOnClicked ' + input_index)
    if( input_index == -1 )
    {
      
      this.props.navigation.navigate('SearchFilteringView',{})
      
    }
    else
    {
      courseViewModel.courseTagSelectedAction(input_index)
      
      return

      var tagName = courseViewModel.getCourseTagNames()[index]
      var tag_id = courseViewModel.getCourseTagIdByName(tagName)
      
      //const res = await courseViewModel.loadCourse('TAG',rowData.id)
      const res = await courseViewModel.updateCourseByTagId(tag_id)
      if (res == true)
      {
        
        var submit_data = courseViewModel.getCourseByTag(tag_id)
        console.log('getCourseByCategory : ' +JSON.stringify(submit_data) )

        var t = this.state.courseTagSelection
        if ( t.includes(tag_id))
        {
          for ( var i = 0; i < t.length; i ++)
          {
            if (t[i] == tag_id){
              t.splice(i, 1);
            }
          }
        }
        else
        {
          t.push(tag_id)
        }

        console.log('t = ' +JSON.stringify(t))
        this.setState({
          courseTagSelection: t
        })
      }
      else
      {

      }
    }
    
      

      /*
      return 
      var t = this.state.courseTagSelection
      var flag = this.state.courseTagSelection[index]
      t.splice(index, 1, !flag)

      var tagName = this.state.courseTagNames[index]
      var courseID = courseTagViewModel.getCourseIDByName(tagName)

      const res = await courseViewModel.loadCourse('CATEGORY',courseID)
      if (res == true)
      {
        // refresh UI now 

        this.setState({
          courseTagSelection: t
        })
      }
      console.log('courseTagSelection :' + this.state.courseTagSelection)  
    }
    console.log('TopMenuBarOnClicked :' + index)  
    */
  }

  async iconOnClick(itemDataSelected)
  {
    var tutor_id = itemDataSelected.tutor_id
    var lesson_id = itemDataSelected.id

    console.log('SearchHomeView : ' + tutor_id + ', ' + lesson_id)

    const flag = await targetUserViewModel.setUserProfile(tutor_id)
    
    if ( flag ){
      this.props.navigation.navigate('NewsDetailView',{
        lessonDetailShow: true,
        tutor : targetUserViewModel.getUserProfile(),
        tutor_id : targetUserViewModel.getUserProfile().user_id,
        lesson_id : lesson_id,
      })
    }

  }

  tutorRowListUI()
  {
    //console.log('getSearchHomeViewTopBarSelectedTag = ' + JSON.stringify(courseViewModel.getSearchHomeViewTopBarSelectedTag()))
    //return this.state.courseTagSelection.map((tag_id, i) =>{
    console.log('getSearchHomeViewTopBarSelectedTag = ' + JSON.stringify(courseViewModel.getSearchHomeViewTopBarSelectedTag()))
    if ( courseViewModel.getSearchHomeViewTopBarSelectedTag().length > 0)
    {
      
      
      return courseViewModel.getSearchHomeViewTopBarSelectedTag().map((tag_id,i)=>{

        console.log('courseViewModel.getCourseByTag(tag_id) = ' + courseViewModel.getCourseByTag(tag_id))
        return (
          <View
            key = {i}
          >
            <TutorRowFlatList
              title = {courseViewModel.getCourseTagNameById(tag_id)}
              //height = {140}
              iconOnClick = {(itemDataSelected)=>this.iconOnClick(itemDataSelected)}
              //data = {this.state.tutorRowData}
              //id = {tag_id}
              data = {courseViewModel.getCourseByTag(tag_id)}
            />   
            <SeparatorBar />
          </View>
        )
      })
    }
    
  }

  categorysViewUI()
  {
    return (
      <View style = {styles.listViewStyle}>
        {
          this.state.categories.map((rowData, i )=>{
            return (
              <TouchableOpacity 
                key = {i}
                onPress={()=>this.ListingCatBtnOnClick (rowData) }
              >
                <View style={this.cellStyle(rowData)}>   
                  <View style = {this.iconImageStyle(rowData)}>
                    <Image 
                      style = {{ width: 40, height: 40}}
                      source={rowData.category_image != null ? {uri: rowData.category_image} : null}
                      resizeMode =  'contain'
                    />
                  </View>
                  <Text style={this.iconTextStyle(rowData)}>{rowData.category_name}</Text>
                </View> 
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  topBarUI()
  {
    console.log('topBarUI')
    
    //var a = this.state.courseTagNames
    //var a = [""]
    //var tagSelectedArray = [true] // init
    var data = []
    var tagSelectedArray = [] // init

    for ( var i = 0; i < courseViewModel.getCourseTagsList().length; i ++)
    {
      data.push(courseViewModel.getCourseTagsList()[i].name)
      tagSelectedArray.push(true)
    }

    console.log('tagSelectedArray = '+ JSON.stringify(tagSelectedArray))
    console.log('title = '+ JSON.stringify(data))

    if ( courseViewModel.getCourseTagsList().length > 0)
    {
      return (
        <RowMenuListingBar
          
          showConfigIcon = {true}
          data = {data}
          itemHeight = {40}
          itemWidth = {60}
          multiSelectArray = {tagSelectedArray}
          onClicked={ this.TopMenuBarOnClicked }      
        />
      )
    }

    
    
  }

  render() {
    

    
    /*
    for (var i = 0; i < courseViewModel.getCourseTagNamesList().length; i ++)
    {
      console.log('i = ' + courseViewModel.getCourseTagNamesList()[i])
    }
    */
    //console.log('rowMenuInitArray = ' + rowMenuInitArray)
    //console.log('courseTagNames = ' + JSON.stringify(this.state.courseTagNames))
    //const courseViewModel = courseViewModel

    return (
      <View 
        //style = {layout.styles.basicViewStyle}
        style = {{height:layout.deviceHeight-80}}
      >
        {
          <LogoTitle/>
        }
        {
          //this.state.courseTagNames.length > 0 && 
          this.topBarUI()
        }
        
        <ScrollView style = {{backgroundColor:layout.backgroundColor}}>
        
          
      
          {
            
            <BannerView
              source = {[
                'http://www.oneswimmingclub.com/getfile.php?id=252207',
                'https://www.cheerfulkids.edu.hk/uploads/2/6/0/6/26064940/summer-course-2019-banner04_orig.png',
                'https://www.cie.hkbu.edu.hk/main/images/main_banner/admission2020/ad_admission2020_b_mobile_tc.jpg',
                'https://s3-ap-northeast-1.amazonaws.com/cgblogassets/wp-content/uploads/sites/3/2018/04/24162822/untitled-4.jpg',
                'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/75625306_149840409733107_4461721995427446784_n.jpg?_nc_cat=104&_nc_ohc=ctZSpUYSRioAQlGxVqTqWPSw-8MgGf4_uG-0XgUHZd0esqioimWOn8ewA&_nc_ht=scontent-hkg3-1.xx&oh=2140eaf2810da4afb25038b3c96cc665&oe=5E796E86',
                'https://www.cheerfulkids.edu.hk/uploads/2/6/0/6/26064940/summer-course-2019-banner04_orig.png',
              ]}
              bannerOnClicked = {this.bannerOnClicked}

            />
            
          }
          
         
          {
            this.categorysViewUI()
          }
          <SeparatorBar />
          {
            this.tutorRowListUI()
          }
        </ScrollView>
      </View> 
    );
  }
}

export default SearchHomeView;

const styles = StyleSheet.create({    
  listViewStyle:{     
    backgroundColor:'white',
    flexDirection:'row', //设置横向布局       
    flexWrap:'wrap'    //设置换行显示
  },    
});
