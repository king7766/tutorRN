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

const categoryViewModel = categoryVM.getInstance()
const locationViewModel = locationVM.getInstance()
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

  showResultBtnOnClick(){

    // Each time you call push we add a new route to the navigation stack. When you call navigate it first tries to find an existing route with that name, and only pushes a new route if there isn't yet one on the stack.
    
    //this.props.navigation.push('SearchHomeView',{})
    //this.props.navigator.navigate('SearchHomeView',{});
    //this.props.navigation.popToTop()

    //return ;
    
    console.log(locationViewModel.getLocationIdByName(this.state.pickerResults[0]))
    console.log(categoryViewModel.getCategoryIDByName(this.state.pickerResults[1]))
    console.log(categoryViewModel.getSubCategoryIDByName(this.state.pickerResults[2]))

    /*
    this.props.navigation.push('SearchTutorView',{
      location : '尖沙咀' ,
      district :  '九龍',
      education : '音樂',
      subject : '小提琴',
      }
    );
    */
    
  }

  textInputStyle(index)
  {
    //console.log('textInputStyle = '+ index)
    return {
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
        onPickerConfirm: pickedValue => {
            console.log(index + ', area confirm : ', pickedValue);
            
            var tempArray = this.state.pickerResults
            tempArray[index] = pickedValue
            
            if ( index == 1)
            {
              tempArray[2] = strings.selectCategoryFirst

              var a = this.state.optionData
              a[2] = categoryViewModel.getSubCategoriesNameByCategoryKey(categoryViewModel.getCategoryIDByName(pickedValue))
              this.setState({
                optionData: a,
              })
            }
            this.setState({pickerResults:tempArray})
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
      <View>
        <ScrollView
          scrollEnabled={false}
        >
          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>{strings.order}</Text>

          <FilteringToolsBar 
            onClicked = {(index)=>this.filteringToolsBtnOnClicked(index)}
            catName = {['評分', '最多收藏', '收費','距離']}
            //imageSource = {[Assets.actions.doc, Assets.actions.doc, Assets.actions.doc, Assets.actions.doc]}
          />

          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>{strings.filter}</Text>
          
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
                        style = {{ paddingRight:10, color:'rgb(231,121,98)' }}
                      >
                        {this.state.pickerResults[index]}
                      </Text> 
                      
                    </View>
                    
                  </TouchableOpacity>
                )
              )
            }
          </View>
          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TouchableOpacity onPress={this.showResultBtnOnClick}>
            <View style = {styles.submitButtonBackground}>
              <View style={styles.submitButton}>
                <Text style = {styles.submitButtonText}>
                  {strings.listAllResult}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  textInputView: {
    flexDirection:'row',
    width: '100%',
    height: 40,
    //flex: 1,
    //justifyContent: 'center',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    //backgroundColor : 'rgba(242,242,242,1)'
    backgroundColor: 'white',
  },

  submitButtonBackground:{
    backgroundColor : layout.shallowColor,
    height:80,
    justifyContent: 'center',
    alignItems:'center'  
    //flex:1,
    
  },

  submitButton:{
    backgroundColor : 'white',
    //backgroundColor : layout.themeTextColor,
    height: 40,
    width: 150,
    backgroundColor : layout.themeTextColor,
    borderColor: layout.themeTextColor,
    borderRadius:10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center'  

  },
  submitButtonText:{
    //backgroundColor:layout.themeTextColor,
    //color : layout.themeTextColor,
    color: 'white',
    //height: 40,
    // /width: 100,
    //paddingLeft: 10,
    //borderRadius:10,
    //borderWidth: 1,
    //borderColor: layout.themeTextColor,
    fontWeight: 'bold',
    fontSize:16,
    //textAlign:'center',
  }

  });



export default SearchFilteringView;