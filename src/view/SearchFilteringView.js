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
//const layout = require('../Layout')
const layout = require('tutorRN/src/Layout')
import Avatar from 'tutorRN/src/view/ui/Avatar';
import Assets from 'tutorRN/src/view/ui/Assets';
import TopMenuBar from 'tutorRN/src/view/ui/TopMenuBar';
import TutorRowFlatList from 'tutorRN/src/view/ui/TutorRowFlatList';
import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar';


class SearchFilteringView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    //this.next = this.next.bind(this)
  

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
      rowTitle:['區域', '類別', '項目'],

      genderSelectArray: ['男', '女'],
      locationSelectArray : ['中西區', '灣仔', '東區','南區','油尖旺', '深水埗', '九龍城','黃大仙','觀塘', '葵青', '荃灣', '屯門','元朗','北區','大埔','沙田','西貢','離島'],
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


      rowData :[' ',' ',' ',' ',' ',' ',' ',' '],

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

  }

  

  componentWillMount() {
    this.mounted = true
  }

  showResultBtnOnClick(){
    console.log('showResultBtnOnClick')
    
    this.props.navigation.navigate('SearchTutorView',{
      location : '尖沙咀' ,
      district :  '九龍',
      education : '音樂',
      subject : '小提琴',
      }
    );
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
    var rowData = this.state.rowData
    if( index >= 0 )
    {
      if ( index == 0)
      {
        tempArray = this.state.locationSelectArray
      }
      else if ( index == 1)
      {
        tempArray = this.state.catalogArray
      }
      else if ( index == 2)
      {
        tempArray = this.state.subcatalogArray
      }
     
      
      Picker.init({
        pickerData: tempArray,
        pickerTitleText:'請選擇',
        pickerConfirmBtnText:'確定',
        pickerCancelBtnText: '取消',
        selectedValue: tempArray,
        onPickerConfirm: pickedValue => {
            console.log('area', pickedValue);
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
      this.refs["index" + index].focus(); 
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
  

  render() {
    return (
      
      /*
      <SafeAreaView
        styles = {{flex:1}}
      >
      */
      <View>

        <ScrollView
          scrollEnabled={false}
        >
          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>排序</Text>

          <FilteringToolsBar />

          <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>篩選</Text>
          
          

        
  

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
                        ref= {"index" + index}
                        style = {{ paddingRight:10, color:'rgb(231,121,98)' }}
                        value={this.state.rowData[index]}
                      >
                        
                      </TextInput> 
                      
                    </View>
                    
                  </TouchableHighlight>
                )
              )
            }
          </View>
          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          <TouchableHighlight onPress={this.showResultBtnOnClick}>
            <View style = {styles.submitButtonBackground}>
              <View style={styles.submitButton}>
                <Text style = {styles.submitButtonText}>
                  顯示所有結果
                </Text>
              </View>
            </View>
          </TouchableHighlight>
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

  submitButtonBackground:{
    backgroundColor : 'white',
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