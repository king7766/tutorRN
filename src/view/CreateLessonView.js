/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
//import SafeAreaView from 'react-native';
import SafeAreaView from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,   
  Button,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AsyncStorage,
  CameraRoll,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import Picker from 'react-native-picker';
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//const layout = require('tutorRN/src/Layout')

const layout = require('tutorRN/src/Layout')
/*
import Avatar from 'tutorRN/src/view/ui/Avatar';
import Assets from 'tutorRN/src/view/ui/Assets';
import TopMenuBar from 'tutorRN/src/view/ui/TopMenuBar';
import TutorRowFlatList from 'tutorRN/src/view/ui/TutorRowFlatList';
import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';
*/


import {
  Avatar,
  Assets,
  //TopMenuBar,
  TutorRowFlatList,
  FilteringToolsBar,
} from 'tutorRN/src/view/ui/UIComponent';


class CreateLessonView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    
    this.state = {

      photo: '',
      email:'',
      password: '',
      name: '',
      gender: '',
      job: '',
      education: '',
      brithday:'',
      location: '',
      photos : [],
      rowTitle:['課堂類別','項目','教學地點', '價格 (每小時) '],
      
      catalogArray :['學術',	'音樂',	'運動',	'烹飪',	'駕駛'	,'手工',	'電腦',	'其他'],
      subcatalogArray :['小學全科','中學全科','中文','英文','數學',
      '物理',
      '生物',
      '化學',
      '中國文學',
      '英國文學',
      '經濟',
      '歷史',
      '中史',
      '其他'],
      locationSelectArray : ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島','上門'],
      priceArray :['$100以下','$101-200', '$201-400','$401以上' ],

    

      rowData :['','','',''],

    }

  }

  

  componentWillMount() {
    this.mounted = true
  }

  textInputStyle(index)
  {
    //console.log('textInputStyle = '+ index)
    return {
      paddingLeft: 5,
      color: 'gray',
      
    }

  } 

  handleTextChange(event, index)
  {
    console.log('handleTextChange = ' + event.text + ': '+ index)
    
  }

  showResultBtnOnClick ()
  {
    console.log('showResultBtnOnClick ')
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  rowOnClick(index)
  {
    console.log('rowOnClick ' + index )
    var tempArray 
    var rowData = this.state.rowData
  
    if( 1 )
    {
      if ( index == 0)
      {
        tempArray = this.state.catalogArray
      }
      else if ( index == 1)
      {
        tempArray = this.state.subcatalogArray
      }
      else if ( index == 2)
      {
        tempArray = this.state.locationSelectArray
      }
      else if (index == 3)
      {
        tempArray = this.state.priceArray
      }
     
      Picker.init({
        pickerData: tempArray,
        pickerTitleText:'請選擇',
        pickerConfirmBtnText:'確定',
        pickerCancelBtnText: '取消',
        selectedValue: tempArray,
        onPickerConfirm: pickedValue => {
            console.log('area :: ', pickedValue);
            rowData.splice(index, 1, pickedValue)
            this.setState({
              rowData: rowData
            })
        },
        onPickerCancel: pickedValue => {
            console.log('area', pickedValue);
        },
        onPickerSelect: pickedValue => {
            //Picker.select(['山东', '青岛', '黄岛区'])
            console.log('area', pickedValue);
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


  /*

  <View
            style = {{width:layout.deviceWidth, justifyContent:'center', alignItems:'center', height: 50, flexDirection:'column', borderBottomWidth :2,
            borderBottomColor: layout.themeTextColor, backgroundColor:'white'}}
          >
            <Text style = {{ color:'rgb(231,121,98)', fontWeight:'bold', fontSize:16}}>新增課堂</Text>  
            
          </View>
  */
  

  render() {
    return (
      <View/>
    )
  }
}

/*

      <SafeAreaView
        styles = {{flex:1}}
      >
        <View
          scrollEnabled={false}
          backgroundColor= 'rgba(233,233,233,1)'
          flexDirection = 'column'
        >
          
          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold', color:'black'}}>課程簡介</Text>  
          <View 
            style ={{backgroundColor:'white', height:100}}
          >
            <TextInput
              style = {{ margin: 10,  color:'rgb(231,121,98)', backgroundColor:'white', textAlignVertical: 'top' }}
            />
          </View>
          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          <View>
            {
              this.state.rowTitle.map(
                (item, index) =>
                (
                  <TouchableHighlight 
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
                      <TextInput
                        //ref= {"index" + index}
                        style = {{ paddingRight:10, color:'rgb(231,121,98)' }}
                      >
                        {this.state.rowData[index]}
                      </TextInput> 
                      
                    </View>
                    
                  </TouchableHighlight>
                )
              )
            }
          </View>
          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          
            <View style = {styles.submitButtonBackground}>
            <TouchableHighlight style = {styles.submitHighlightStyle} onPress={this.showResultBtnOnClick}>
              <View style={styles.submitButton}>
                <Text style = {styles.submitButtonText}>
                  提交
                </Text>
              </View>
              </TouchableHighlight>
            </View>
          
        </View>
      </SafeAreaView> 
      */

const styles = StyleSheet.create({

  textInputView: {
    flexDirection:'row',
    width: layout.deviceWidth,
    height: 40,
    //flex: 1,
    //justifyContent: 'center',
    justifyContent: 'space-between',
    
    alignItems: 'center',
    //backgroundColor : 'rgba(242,242,242,1)'
    backgroundColor: 'white',
  },
  passwordField:{
    width: '100%',
    height: 40,
    backgroundColor : 'rgba(242,242,242,1)'
  },

  uploadButton: {

    backgroundColor : 'rgba(61,89,148,1)',
    height:40,
    flex:1,
    justifyContent: 'center'
    //alignItems:'center'     
  },
  uploadText:{
    paddingLeft: 10,
    color: 'white',
    fontSize:16
  },

  registerButton:{
    backgroundColor : 'white',
    height:40,
    flex:1,
    justifyContent: 'center',
    alignItems:'center'  

  },
  registerText:{
    color : layout.themeTextColor,
    //paddingLeft: 10,
    fontWeight: 'bold',
    fontSize:16
  },

  submitButtonBackground:{
    backgroundColor : 'white',
    height:80,
    justifyContent: 'center',
    alignItems:'center'  
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

  submitHighlightStyle:{
    backgroundColor : layout.themeTextColor,
    borderColor: layout.themeTextColor,
    borderRadius:10,
    borderWidth: 1,
  },

  submitButtonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize:16,
  }


  });



export default CreateLessonView;

/*
<TextInput             
                      style = {this.textInputStyle(index)}
                      key = {index}
                      //style = {{paddingLeft : 5, paddingRight : 5, backgroundColor: 'clear', height: '100%'}}
                      onFocus = { this.onFocus(index) }
                      onChangeText={(text) => this.handleTextChange({text}, index)}
                      placeholder = {item}
                      //value={this.state.text}
                    >
                      <View>

                      </View>
                    </TextInput>


                      <TopMenuBar 
            data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
            size = {50}
            itemHeight = {30}
            itemWidth = {50}
            selected = {0}
          />
          
                    */