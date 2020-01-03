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
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage,
  CameraRoll,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Picker from 'react-native-picker';
import Assets from 'tutorRN/src/view/ui/Assets';

//import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
import strings from 'tutorRN/src/service/strings'
import locationVM from 'tutorRN/src/VM/locationVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const categoryViewModel = categoryVM.getInstance()
const locationViewModel = locationVM.getInstance()
const courseViewModel = courseVM.getInstance()
const layout = require('tutorRN/src/Layout')

import {
  FilteringToolsBar,
  SelectableInputField,
  SeparatorBar,
} from 'tutorRN/src/view/ui/UIComponent';

class SearchFilteringView extends Component<Props> {

  constructor(props) {
    super(props);

    this.showResultBtnOnClick = this.showResultBtnOnClick.bind(this)
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    //this.next = this.next.bind(this)
  
    var locationPickerData = []
    for ( var i = 0 ; i < locationViewModel.getDistrictNames().length; i ++)
    {
      var d = locationViewModel.getDistrictNames()[i]
      locationPickerData.push({[d]:locationViewModel.getLocationNamesFromDistrict(i)})
    }

    this.state = {
 
      rowTitle:[strings.area, strings.category, strings.subcategory],
      pickerResults:['','',strings.selectCategoryFirst ],
      pickerResultsIndex : [-1,-1,-1],
      optionData : [
        //locationViewModel.getLocationName(),
        locationPickerData,
        categoryViewModel.getCategoriesNames(),
        categoryViewModel.getSubCategoriesNamesByCategoryId()
        
        
      ],
      
    }
  }

  

  componentWillMount() {
    this.mounted = true
  }

  
  async showResultBtnOnClick(){

    // Each time you call push we add a new route to the navigation stack. When you call navigate it first tries to find an existing route with that name, and only pushes a new route if there isn't yet one on the stack.
    
    //this.props.navigation.push('SearchHomeView',{})
    //this.props.navigator.navigate('SearchHomeView',{});
    //this.props.navigation.popToTop()

    var district_array_index = this.state.pickerResultsIndex[0][0]
    var location_array_index = this.state.pickerResultsIndex[0][1]
    var district_id = locationViewModel.getDistrictIdByDistrictName(locationViewModel.getDistrictNames()[district_array_index])
    var location_id = locationViewModel.getLocationIdByName(locationViewModel.getLocationNamesFromDistrict(district_array_index)[location_array_index])

    
    var cat_id = -1
    var subcat_id = -1
    var tag_Array = []
    var sub_categoryArray 

    if (this.state.pickerResultsIndex[1] != -1 )
    {
      //cat_id = this.state.pickerResultsIndex[1]
      //cat_array.push(this.state.pickerResults[1])
      cat_id = categoryViewModel.getCategoryIDByName(this.state.pickerResults[1])

      var sub_categoryArray = categoryViewModel.getSubCategoriesByCategoryId(cat_id)
      for ( var i = 0 ; i < sub_categoryArray.length; i ++)
      {
        tag_Array.push(sub_categoryArray[i].category_name)
      }
    }

    if (this.state.pickerResultsIndex[2] != -1 )
    {
      subcat_id = categoryViewModel.getSubCategoryIDByName(this.state.pickerResults[2])
    }

    console.log('district_id = ' + district_id)
    console.log('location_id = ' + location_id)
    console.log('c_id = ' + cat_id )
    console.log('subcat_id = ' + subcat_id )
    
    if ( cat_id == -1 || undefined)
    {
      return 
    }
   
    const res = await courseViewModel.updateCourseByCategoryId(cat_id)
    if (res == true)
    {
      
      var submit_data = courseViewModel.getCourseByCategory(cat_id)
      console.log('getCourseByCategory : ' +JSON.stringify(submit_data) )

      this.props.navigation.navigate(
        'SearchTutorView',{
          sub_categoryArray: sub_categoryArray,
          tag: tag_Array,
          data : submit_data,
          c_id: cat_id,
          subcat_id : subcat_id,
        }
      )
      
    }
    else
    {

    }
    
  }

  textInputStyle(index)
  {
    //console.log('textInputStyle = '+ index)
    return {
      fontSize : layout.stringsSizeMid,
      paddingLeft: 5,
      color: 'gray',
      backgroundColor: 'white',
      //textAlign: 'center',
      //flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      //height : '100%'
    }
  } 

  handleTextChange(event, index)
  {
    console.log('handleTextChange = ' + event.text + ': '+ index)
    
  }

  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    var pickerData = this.state.optionData[index] 
    
    if ( index == 2)
    {
      if( this.state.pickerResults[1] == '' )
      {
        return
      }
    }

    if( index >= 0 )
    {
      
      Picker.init({
        //pickerData: tempArray,
        pickerData: pickerData,
        pickerTitleText: strings.pleaseChoose,
        pickerConfirmBtnText: strings.confirm,
        pickerCancelBtnText: strings.cancel,
        //selectedValue: tempArray,
        onPickerConfirm: (pickedValue,pickedIndex) => {
          console.log(index + ', area confirm : ', pickedValue);
          var pickerData
          if ( index == 0 )
          {
            pickerData = pickedValue[0] + ' - ' + pickedValue[1]
          }
          else
          {
            pickerData = pickedValue[0]
          }

          var pickerResults = this.state.pickerResults
          pickerResults.splice(index, 1, pickerData)
            
          var pickerResultsIndex = this.state.pickerResultsIndex
          pickerResultsIndex.splice(index, 1, pickedIndex)

          if ( index == 1)
          {
            pickerResults[2] = strings.selectCategoryFirst

            var a = this.state.optionData
            a[2] = categoryViewModel.getSubCategoriesNamesByCategoryId(categoryViewModel.getCategoryIDByName(pickedValue))
            this.setState({
              optionData: a,
            })
          }
          this.setState({
            pickerResults:pickerResults,
            pickerResultsIndex: pickerResultsIndex
          })
            
        },
        onPickerCancel: pickedValue => {
            console.log('area cancel : ', pickedValue);
        },
        onPickerSelect: pickedValue => {
            //Picker.select(['山东', '青岛', '黄岛区'])
            console.log('area select : ', pickedValue);
        }
      });
      Picker.show();

    }
    else
    {
      //this.refs["index" + index].focus(); 
    }
  }
    
  _createDateData() {
    var today = new Date();
    let date = [];
    for(let i=1900 ; i < today.getFullYear() ;i++){
        let month = [];
        for(let j = 1;j<13;j++){
            let day = [];
            if(j === 2){
                for(let k=1;k<29;k++){
                    day.push(k+'日');
                }
                //Leap day for years that are divisible by 4, such as 2000, 2004
                if(i%4 === 0){
                    day.push(29+'日');
                }
            }
            else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                for(let k=1;k<32;k++){
                    day.push(k+'日');
                }
            }
            else{
                for(let k=1;k<31;k++){
                    day.push(k+'日');
                }
            }
            let _month = {};
            _month[j+'月'] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i+'年'] = month;
        date.push(_date);
    }
    return date;
  }
  //renderItem={({item, index})=>
  //renderItem({ item, index }) {
  
  filteringToolsBtnOnClicked(index)
  {
    console.log('filteringToolsBtnOnClicked = ' + index)
  }

  render() {
    return (
      
      
      //<SafeAreaView
      //  styles = {{flex:1}}
      //>
      <View style = {{flex:1}}>
        <View style = {styles.upperPartContainer}>
          
          <SeparatorBar text={strings.order}/>
          <FilteringToolsBar 
            onClicked = {(index)=>this.filteringToolsBtnOnClicked(index)}
            catName = {['評分', '最多收藏', '收費','距離']}
            imageSource = {[Assets.icon.ranking, Assets.icon.bookmark, Assets.icon.price, Assets.icon.distance]}
            //imageSource = {[Assets.actions.doc, Assets.actions.doc, Assets.actions.doc, Assets.actions.doc]}
          />
          <SeparatorBar text={strings.filter}/>
          
          <View>
            {
              this.state.rowTitle.map(
                (item, index) =>
                (
                  <TouchableOpacity 
                    onPress={() => this.rowOnClick(index)}
                    key = {index}
                  >
                    <View>
                      <SelectableInputField 
                        title = {item}
                        data = {this.state.pickerResults[index]}
                      />
                    </View>
                    
                    
                    <SeparatorBar height={1}/>
                    
                  </TouchableOpacity>
                )
              )
            }
          </View>
        </View>
        <View style = {styles.lowerPartContainer}>
          <TouchableOpacity onPress={this.showResultBtnOnClick}>
            <View style = {styles.submitBotton}>
              <Text style = {styles.submitText}>
                {strings.submit}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  textInputView: {
    flexDirection:'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  submitButtonBackground:{
    backgroundColor : layout.backgroundColor,
    height:80,
    justifyContent: 'center',
    alignItems:'center'  
  },

  
  submitBotton:{
    height:40, 
    justifyContent:'center',
    alignItems:'center', 
    backgroundColor:layout.grayColor
  },

  submitText:{
    color:'white',
    fontSize:layout.stringsSizeMid

  },
  resultTextStyle:{
    fontSize: layout.stringsSizeMid,
    paddingRight:10,
    color:layout.themeTextColor 
  },
  upperPartContainer:{
    flex:1,
  },
  lowerPartContainer:{
    flex:1,
    justifyContent:'center',
  }

});



export default SearchFilteringView;