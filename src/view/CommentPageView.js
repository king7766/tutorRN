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
  FlatList,
  ListView,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';

import * as M from 'tutorRN/src/service/membership'
import Assets from 'tutorRN/src/view/ui/Assets';
import strings from '../service/strings'

import {

  TutorSelectCell,

} from 'tutorRN/src/view/ui/UIComponent';


const layout = require('tutorRN/src/Layout')
const numberOfItem = 4

class CommentBoxView extends Component <Props>{

}


class CommentPageView extends Component<Props> {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    data = [ 
      {'user':'阿貴(Daniel)', 'date':'2019-01-22','lesson':'深造英語對話', 'comment':'非常棒的軟體，對我的幫助很大。在此致上最高的敬意。', 'rate': '5'},
      {'user':'光頭小和尚摳摳摳', 'date':'2019-01-22','lesson':'深造英語對話', 'comment':'以前單純看影片常常抓不到重點在哪而開始恍神，學習效果其實不太好。這次改版所有影片都有三個階段得重點複習，比較拿的到方向。希望一些小Bug可以再稍做優化，讓體驗更好。期待英文進步到能流利與外國朋友交談的一天！', 'rate': '4'},
      {'user':'阿蘺', 'date':'2019-01-22','lesson':'深造英語對話', 'comment':'謝謝貴單位開發這麼棒的軟體，老實說在單字量不夠的情形下就算一直聽英文也不會聽得懂，但下方的字幕可以幫助自己聽不懂的關鍵字是哪一個，謝謝', 'rate': '3'},
      {'user':'Cupid Pin', 'date':'2019-01-22','lesson':'深造英語對話', 'comment':'對話內容簡單實用，而且系統不斷更新，幫助學習更精準，最新的課程精解還提供講解的逐字稿，真的超級用心！', 'rate': '2'},
    ]
    this.state = {
      data : data,
      dataSource: ds.cloneWithRows(data),
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      //headerLeft:<Button title="Info" onPress = {params.leftBtnOnClick}/>,
      headerRight: (

        //<Button onPress={params.increaseCount} title="Info" />
        <TouchableHighlight 
          onPress={params.leftBtnOnClick}
          //onPress={params.increaseCount}
          underlayColor = {layout.touchHighlightColor}
        >
          <View style = {{height: 30, width: 100, justifyContent: 'center', flexDirection: 'row'}}>
            <Image source={require('tutorRN/src/image/exit-100.png')} style={{height: 30, width: 30, marginLeft:10}} /> 
          </View>

        </TouchableHighlight>
      ),
    };
  };
  
  async componentDidMount() {


  }
  

  selectTutor(index)
  {
    console.log('selectTutor : ' + index)
  }

  startEdit()
  {
    //this.props.navigation.navigate('ProfileHomeEditView',{})
  }

  cellContent(item, index)
  //cellContent(rowData, sectionID, rowID, higlightRow)
  {
    return (
      <View style = {styles.cellContainer}>
        <View style ={styles.cellImageBoxStyle}>
          <Text>{item.user}</Text>
        </View>
        
        <View style ={styles.cellTextBoxStyle}>
          <Text>{item.user}</Text>
          <Text style={{fontWeight: 'bold'}}>{item.lesson}</Text>
          <Text style= {{margin:5}}>{item.comment}</Text>
          <Text style = {{color:'gray'}} >{item.date}</Text>
        </View>  
      </View>
    )
  }

  displayContent()
  {
    return (
      
      <FlatList
        style = {{flex: 1}}
        data={this.state.data}
        //data={this.state.data}
        renderItem={({item, index}) => this.cellContent(item, index)}
        removeClippedSubviews={false}
        //renderRow = {(rowData, sectionID, rowID, higlightRow) => this.cellContent(rowData, sectionID, rowID, higlightRow)} 
      >
      </FlatList>
    )
  }

 

  render() {
    console.log('count  = ' + this.state.data.length )
    return (
      <View 
        style = {{flex:1}}
      >
      {
        this.displayContent()
      }
      </View>
    );
  }
}

export default CommentPageView;

const styles = StyleSheet.create({   
  

  cellContainer:{
    margin:10,
    flexDirection:'row',
    
  },
  cellImageBoxStyle:{
    flex:1,
  },
  cellTextBoxStyle:{
    flex:3,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor : 'red'
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

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
