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
  TopMenuBar,
} from 'tutorRN/src/view/ui/UIComponent';

import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import courseVM from 'tutorRN/src/VM/courseVM'
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')
const numberOfItem = 4




const courseTagViewModel = courseTagVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const courseViewModel = courseVM.getInstance()





@observer
class SearchHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    
    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})   
    var courseTagNames = courseTagViewModel.getCourseTagNames()
    courseTagNames.splice(0,0, '')
    var courseTagSelection = new Array(courseTagNames.length).fill(false)

    this.state = {
      courseTagNames : courseTagNames,
      courseTagSelection : courseTagSelection,
      categories : ds.cloneWithRows(categoryViewModel.getCategories()),
      
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
          image: require('tutorRN/src/image/icon-math.png'),
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

      
      borderColor: color,
      borderWidth: 0.5,
      borderRadius: width/2,
      backgroundColor : color,
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
    console.log('ListingCatBtnOnClick ' + rowData.id)
    const res = await courseViewModel.loadCourse('TAG',rowData.id)
    if (res == true)
    {
      
      this.props.navigation.navigate('SearchTutorView',{
        tag:rowData.id,
        data : res
      });
      console.log(courseViewModel.getCourseByTag(rowData.id))
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

  async TopMenuBarOnClicked(index)
  {
    if( index == 0 )
    {
      this.props.navigation.navigate('SearchFilteringView',{})
      
    }
    else
    {
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
  }

  iconOnClick(itemDataSelected)
  {
    console.log('SearchHomeView : ' + itemDataSelected.selectedIndex + ' ' + itemDataSelected.courseID)
  }

  tutorRowListUI()
  {
    return this.state.courseTagNames.map((tagName, i) =>
    {
      var courseID = courseTagViewModel.getCourseIDByName(tagName)
      if ( i > 0 && this.state.courseTagSelection[i] == true)
      {
        return (
        
          <View
            key = {i}
          >
            <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
            <TutorRowFlatList
              title = {tagName}
              height = {120}
              iconOnClick = {(itemDataSelected)=>this.iconOnClick(itemDataSelected)}
              //data = {this.state.tutorRowData}
              id = {courseID}
              data = {courseViewModel.getCourseByCategory(courseID)}
            />   
          </View>
        )
      }
    })
  }

  render() {
    
    return (
      <ScrollView style = {{backgroundColor:layout.backgroundColor}}>

        <TopMenuBar 
          //TopMenuBar
          
          data = {this.state.courseTagNames}
          size = {50}
          itemHeight = {30}
          itemWidth = {50}
          selected = {0}
          multiSelect = {true}
          onClicked={ this.TopMenuBarOnClicked }
        />

        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

        <ListView     //创建ListView     
          initialListSize={this.getRows().length} 
          backgroundColor = 'white'     
          dataSource={this.state.categories} //设置数据源               
          //renderRow={this.renderRow} //设置cell               
          renderRow={(rowData, rowID) =>
            <TouchableOpacity 
              key = {rowID}
              onPress={()=>this.ListingCatBtnOnClick (rowData) }
              //underlayColor = {layout.touchHighlightColor}
            >
              <View style={this.cellStyle(rowData)}>   
                <View style = {this.iconImageStyle(rowData)}>
                  <Image 
                    style = {{ width: 30, height: 30}}
                    //source={rowData.image}
                    source = {require('tutorRN/src/image/icons8-document-100.png')}
                    //resizeMode =  'center'
                    resizeMode =  'contain'
                  />
                </View>

               

                <Text style={this.iconTextStyle(rowData)}>{rowData.name}</Text>
              </View>
            </TouchableOpacity>
          }
            
                         
          contentContainerStyle={styles.listViewStyle}//设置cell的样式
        />
        {
          this.tutorRowListUI()
        }
        
      </ScrollView>

     
      
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
    flexDirection:'row', //设置横向布局       
    flexWrap:'wrap'    //设置换行显示
  },    
        bgStyle:{        
              backgroundColor:'gray',        
              width:(layout.deviceWidth-50)/2, //cell的宽度        
              height:250,        
              marginLeft:10,        
              marginTop:10    
        },    
        imageStyle:{        
              width:(layout.deviceWidth-30)/2,       
              height:230,        
              backgroundColor:'gray',        
              marginBottom:0,    
      }
});
