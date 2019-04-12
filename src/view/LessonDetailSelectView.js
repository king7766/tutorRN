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
  ScrollView,
  ListView
} from 'react-native';

import SegmentControl from './ui/SegmentControl'
const layout = require('tutorRN/src/Layout')
const numberOfItem = 4


class LessonDetailSelectView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    

   
  }

  componentWillMount() {

  }


  tabOnClicked(index, key ){
    

  }

  getRows(){        
    var Arr = [];        
    for(var i = 1; i < 16; i++){           
      Arr.push(
        {                   
          image: require('tutorRN/src/image/icon-math.png'),
          price:'中文'                
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

  iconTextStyle (rowID)
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

  handleSettingsPress (rowData, sectionID, rowID, higlightRow)
  {
    console.log('handleSettingsPress ' + rowData +', ' + sectionID +', ' + rowID +', ' + higlightRow)

    this.props.navigation.navigate('SelectTutorView',{
      location : this.state.locationData[this.state.locationSelected],
      district : this.state.districtData[this.state.districtSelected],
      education : this.state.educationData[this.state.educationSelected],
      subject : this.state.subjectData[this.state.subjectSelected].name,
      }
    )
  }

  /*
  renderRow(rowData, sectionID, rowID, higlightRow){
    return (
      <View style={this.cellStyle(rowData)}>                    
        <Image 
          style={styles.imageStyle}
          source={rowData.image}
        />                    
        <Text style={{fontSize:20,marginBottom:0}}>{rowData.price}</Text>
      </View>
    )
  }
  */

  render() {

    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    var dataSource= ds.cloneWithRows(this.state.subjectData)

    var tutor = {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'job' : 'iOS 程式設計師',
          'workingExp' : ' 10年工作經驗',
          'title' : '工商管理學士',
          'gender' : 40,
          'location' : '黃大仙',
          
        }

    return (
      <ScrollView style = {{backgroundColor:'rgba(233,233,233,1)'}}>
        <TutorCVCell 
          tutor = {tutor}
        />



      </ScrollView>

     
      
    );
    


  }
}


export default LessonDetailSelectView;

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
