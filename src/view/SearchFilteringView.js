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

import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
import strings from 'tutorRN/src/service/strings'
import locationVM from 'tutorRN/src/VM/locationVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const categoryViewModel = categoryVM.getInstance()
const locationViewModel = locationVM.getInstance()
const courseViewModel = courseVM.getInstance()
const layout = require('tutorRN/src/Layout')

class SearchFilteringView extends Component<Props> {

  constructor(props) {
    super(props);

    this.showResultBtnOnClick = this.showResultBtnOnClick.bind(this)
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    //this.next = this.next.bind(this)
  

    this.state = {
 
      rowTitle:[strings.area, strings.category, strings.subcategory],
      pickerResults:['','',strings.selectCategoryFirst ],
      pickerResultsIndex : [-1,-1,-1],
      optionData : [
        locationViewModel.getLocationName(),
        categoryViewModel.getCategoriesNames(),
        categoryViewModel.getSubCategoriesNameByCategoryKey()
        
        
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

    //return ;
    
    console.log(locationViewModel.getLocationIdByName(this.state.pickerResults[0]))
    console.log(categoryViewModel.getCategoryIDByName(this.state.pickerResults[1]))
    console.log(categoryViewModel.getSubCategoryIDByName(this.state.pickerResults[2]))

    var cat_id = -1
    var cat_array = []
    if (this.state.pickerResultsIndex[1] != -1 )
    {
      cat_array.push(this.state.pickerResults[1])
      cat_id = categoryViewModel.getSubCategoryIDByName(this.state.pickerResults[1])
    }

    if (this.state.pickerResultsIndex[2] != -1 )
    {
      cat_array.push(this.state.pickerResults[2])
      cat_id = categoryViewModel.getSubCategoryIDByName(this.state.pickerResults[2])
    }
    console.log('cat_array = ' + JSON.stringify( cat_array) )

    //return 
    
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

          tag: cat_array,
          data : submit_data,
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
    var tempArray 
    
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
        pickerData: this.state.optionData[index],
        pickerTitleText: strings.pleaseChoose,
        pickerConfirmBtnText: strings.confirm,
        pickerCancelBtnText: strings.cancel,
        selectedValue: tempArray,
        onPickerConfirm: (pickedValue,pickedIndex) => {
            console.log(index + ', area confirm : ', pickedValue);
            
            var tempArray = this.state.pickerResults
            tempArray[index] = pickedValue[0]
            
            var pickerResultsIndex = this.state.pickerResultsIndex
            pickerResultsIndex.splice(index, 1, pickedIndex[0])

            if ( index == 1)
            {
              tempArray[2] = strings.selectCategoryFirst

              var a = this.state.optionData
              a[2] = categoryViewModel.getSubCategoriesNameByCategoryKey(categoryViewModel.getCategoryIDByName(pickedValue))
              this.setState({
                optionData: a,
              })
            }
            this.setState({
              pickerResults:tempArray,
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
          <Text style = {{margin:10, color:layout.headingTextColor, fontSize:layout.stringsSizeMid}}>{strings.order}</Text>
          <FilteringToolsBar 
            onClicked = {(index)=>this.filteringToolsBtnOnClicked(index)}
            catName = {['評分', '最多收藏', '收費','距離']}
            imageSource = {[Assets.icon.ranking, Assets.icon.bookmark, Assets.icon.price, Assets.icon.distance]}
            //imageSource = {[Assets.actions.doc, Assets.actions.doc, Assets.actions.doc, Assets.actions.doc]}
          />
          <Text style = {{margin:10, color:layout.headingTextColor, fontSize:layout.stringsSizeMid}}>{strings.filter}</Text>
          <View>
            {
              this.state.rowTitle.map(
                (item, index) =>
                (
                  <TouchableOpacity 
                    onPress={() => this.rowOnClick(index)}
                    key = {index}
                  >
                    <View
                      style = {styles.textInputView}
                      key = {index}
                    >
                      <Text
                        style = {this.textInputStyle(index)}
                      >
                        {item}
                      </Text> 
                      
                      <Text
                        style = {styles.resultTextStyle}
                      >
                        {this.state.pickerResults[index]}
                      </Text> 
                      
                    </View>
                    <View style={{height:1, backgroundColor:layout.backgroundColor}}></View>
                    
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