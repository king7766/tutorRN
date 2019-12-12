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




@observer
class SearchHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    
    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})   
    var courseTagNames = courseViewModel.getCourseTagNamesList()
    //courseTagNames.splice(0,0, '')
    var courseTagSelection = new Array(courseTagNames.length).fill(false)

    this.state = {
      //courseTagNames : courseTagNames,
      courseTagNames : courseViewModel.getCourseTagNamesList(),
      //courseTagSelection : courseTagSelection,
      //courseTagSelection : [],
      courseTagSelection : courseViewModel.getCourseTagIdList(),

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

    this.cellStyle = this.cellStyle.bind(this)
    this.tabOnClicked = this.tabOnClicked.bind(this)
    this.TopMenuBarOnClicked = this.TopMenuBarOnClicked.bind(this)
    this.ListingCatBtnOnClick = this.ListingCatBtnOnClick.bind(this)
    this.categorysViewUI =this.categorysViewUI.bind(this)
  
  }

  componentWillMount() {

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
      height: 80,
      marginLeft:5, 
      marginRight:5,        
      marginTop:10 
    }
  }

  iconImageStyle (rowData)
  {
    var cellWidth = (layout.deviceWidth - 50 )/numberOfItem
    var width = cellWidth - 10
    width = 50
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

      //borderColor: color,
      //borderWidth: 0.5,
      //borderRadius: width/2,
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
      fontSize: 15,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor : 'green',
      marginTop: 5,
      //width: '100%',

    }

  }

  async ListingCatBtnOnClick (rowData)
  {
    console.log('ListingCatBtnOnClick ' + JSON.stringify (rowData.sub_category) )

    var sub_categoryArray = rowData.sub_category
    var tag_Array = []
    for ( var i = 0 ; i < sub_categoryArray.length; i ++)
    {
      tag_Array.push(sub_categoryArray[i].category_name)
    }

    const res = await courseViewModel.updateCourseByCategoryId(rowData.id)
    if (res == true)
    {
      
      var submit_data = courseViewModel.getCourseByCategory(rowData.id)
      console.log('getCourseByCategory : ' +JSON.stringify(submit_data) )

      this.props.navigation.navigate(
        'SearchTutorView',{
          tag:tag_Array,
          data : submit_data,
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

  async TopMenuBarOnClicked(input_index)
  {
    var index = input_index - 1
    if( input_index == 0 )
    {
      console.log('TopMenuBarOnClicked 0')
      this.props.navigation.navigate('SearchFilteringView',{})
      
    }
    else
    {

      var tagName = courseViewModel.getCourseTagNamesList()[index]
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


    console.log('tutorRowListUI :' + JSON.stringify(this.state.courseTagSelection))
    return this.state.courseTagSelection.map((tag_id, i) =>{
      return (
        <View
          key = {i}
        >
          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
          <TutorRowFlatList
            title = {courseViewModel.getCourseTagNameById(tag_id)}
            height = {130}
            iconOnClick = {(itemDataSelected)=>this.iconOnClick(itemDataSelected)}
            //data = {this.state.tutorRowData}
            //id = {tag_id}
            data = {courseViewModel.getCourseByTag(tag_id)}
          />   
        </View>
      )
    })
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

  render() {
    
    var rowMenuInitArray = [true]
    
    for (var i = 0; i < courseViewModel.getCourseTagNamesList().length; i ++)
    {
      rowMenuInitArray.push(true)
    }
    console.log('rowMenuInitArray = ' + rowMenuInitArray)

    return (
      <View style = {layout.styles.basicViewStyle}>
        <ScrollView style = {{backgroundColor:layout.backgroundColor}}>

          <RowMenuListingBar 
            
            firstItemShowIcon = {true}
            firstImageSource = {Assets.icon.advanceSearch} 
            data = {courseViewModel.getCourseTagNamesList()}
            //size = {50}
            itemHeight = {30}
            itemWidth = {50}
            selected = {1}
            multiSelectArray = {rowMenuInitArray}
            //multiSelected ={[0,1,2,3,4,5,6,7,8]}
            multiSelect = {true}
            onClicked={ this.TopMenuBarOnClicked }
          />

          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
          {
            this.categorysViewUI()
          }
          {
            this.tutorRowListUI()
          }
        </ScrollView>
      </View> 
    );
  }
}
/*
<Image 
                  style = {this.iconImageStyle(rowID)}
                  source={rowData.image}
                  //resizeMode =  'center'
                  resizeMode =  'contain'
                />

<TutorRowFlatList
          title = '熱門推介'
          height = {120}
          data = {this.state.tutorRowData}
        />
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <TutorRowFlatList
          title = '優惠'
          height = {120}
          data = {this.state.tutorRowData}
        />


                <SegmentControl
          //onClicked = {this.tabOnClicked}
          style = {{paddingTop:'5'}}
          onClicked = {this.tabOnClicked}
          tag = {1}
          data = {this.state.locationData}
          numberOfItem = {4}
        />
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <SegmentControl
          //onClicked = {this.tabOnClicked}
          onClicked = {this.tabOnClicked}
          tag = {2}
          data = {this.state.currentDistrictData}
          numberOfItem = {3}
        />
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <SegmentControl
          //onClicked = {this.tabOnClicked}
          onClicked = {this.tabOnClicked}
          tag = {3}
          data = {this.state.educationData}
          numberOfItem = {3}
        />


*/

export default SearchHomeView;

const styles = StyleSheet.create({    
  listViewStyle:{     
    backgroundColor:'white',
    flexDirection:'row', //设置横向布局       
    flexWrap:'wrap'    //设置换行显示
  },    
});
