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

const layout = require('tutorRN/src/Layout')
//const layout = require('tutorRN/src/Layout')
import Dimensions from 'Dimensions';
import Avatar from 'tutorRN/src/view/ui/Avatar';
import Assets from 'tutorRN/src/view/ui/Assets';
import strings from 'tutorRN/src/service/strings'

class TutorRowFlatList extends React.Component{

  constructor (props){
    super(props);
    
  }

  componentWillMount(){

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

  iconOnClick(item)
  {
    console.log('iconOnClick = ' + JSON.stringify( item) )
    this.props.iconOnClick(item)
  }


  renderAvatar()
  {
    return this.props.data.map((item,i) =>{
      return(
        <View
          key = {i}
          style = {{margin:5, alignItems:'center',width:100,}}
        >
          <Avatar
            onPress={() => {this.iconOnClick(item)}}
            size = {70}
            url = {item.tutor_thumb}
            round = {true}
          />
          <Text numberOfLines= {1} style = {styles.courseNameStyle}>{item.course_name}</Text>
        </View>
      )
    })
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
            >{strings.more}</Text>
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
    fontSize:layout.stringsSizeMid,
  },
  seeAll:{
    alignItems :'flex-start',
    flex:1, 
    marginRight: 10,
    marginTop: 5,
    fontWeight:'bold',
    fontSize:layout.stringsSizeSmall,
  },
  courseNameStyle:{
    textAlign: 'center',
    margin:5,
    width:100, 
    fontSize:layout.stringsSizeSmall
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


