import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight
} from 'react-native';

const layout = require('../../Layout')
//const layout = require('/Layout')
import Dimensions from 'Dimensions';
import Avatar from '/view/ui/Avatar';
import Assets from '/view/ui/Assets';

class TutorRowFlatList extends React.Component{

  constructor (props){
    super(props);
    this.state = {
      selectedTab: 0
    }
    //this.handleSettingsPress = this.handleSettingsPress.bind(this)
  }

  componentWillMount(){
    //this.mounted = true
  } 


  seeAllAction()
  {
    console.log('seeAllAction')
  }

  backgroundStyle ()
  {
    return {
      flexDirection : 'column',
      backgroundColor: 'white',
      height: this.props.height,
    }
  }

  titleViewStyle()
  {
    return {
      //flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
  }


  renderAvatar()
  {
    var itemArray = []

    for ( var i = 0; i< this.props.data.length; i ++)
    {
      itemArray.push(
        <View
          key = {i}
          style = {{margin:5}}
        >
          <Avatar
            onPress={() => {
              this.AvatarOnClicked()
            }}
            size = {70}
            //type = 'edit'
            url = {this.props.data[i].url}
            //url = 'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683'
          />
          <Text>{this.props.data[i].name}</Text>
          

        </View>
      )
    }
    return itemArray
  }

  render (){
    

    return(
      <View style = {this.backgroundStyle()}>
        <View style = {this.titleViewStyle()}>
          <Text style = {styles.title}>{this.props.title}</Text>
          <View
            style ={{backgroundColor:'green'}}
          >
          </View>
          <TouchableHighlight 
              onPress={ ()=>this.seeAllAction()}
          >
            <Text
              style = {styles.seeAll}
            >更多</Text>
          </TouchableHighlight>


        </View>
        <ScrollView 
          style = {{height: 70, margin:5}}
          horizontal = {true}
        >
          {this.renderAvatar()}

        </ScrollView>
      
      

      </View>

    );
  }

}

TutorRowFlatList.defaultProps = {
  tag: 1,
  textColor : 'gray',
  colorTheme: 'rgba(216,72,118,1)',
  touchColor: 'rgba(237,182,202,1)',
  pressEnable: true,
  numberOfItem: 3,
  height: 100,
};

export default TutorRowFlatList;

const styles = StyleSheet.create ({
  title:{
    //backgroundColor : 'blue',
    alignItems :'flex-start',
    flex:1, 
    marginLeft: 10,
    marginTop: 5,
    fontWeight:'bold',
    fontSize:16,
  },
  seeAll:{
    alignItems :'flex-start',
    flex:1, 
    marginRight: 10,
    marginTop: 5,
    fontWeight:'bold',
    fontSize:14,
  }
  /*
  background:{
    backgroundColor: 'red',
    //flex: 1,
    flexWrap:'wrap',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: 'red',
    width: layout.deviceWidth,
    paddingTop:5,
    paddingBottom:5,
    //height: this.props.height,
    //padding: 5
  }
  */
    
})


