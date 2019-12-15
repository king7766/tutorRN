import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableOpacity
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
    
    //const { params } = this.props.navigation.state;
    //const height = params ? params.height : null

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
      height:this.props.height,

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

  courseNameStyle()
  {
    return{
      textAlign: 'center',
      margin:5,
      width:this.props.itemWidth,
      height:this.props.textHeight, 
      //backgroundColor:'blue',
      fontSize:layout.stringsSizeSmall
    }
  }

  courseImageStyle ()
  {
    return {
      margin:5,
      height:this.props.imageHeight, 
      width:this.props.itemWidth,
      borderRadius:5,
      borderWidth:1,
      //backgroundColor:'yellow',
      borderColor:'transparent'
    }
  }

  itemStyle()
  {
    return {
      height: this.props.imageHeight+ this.props.textHeight,
      width:this.props.itemWidth,
      alignItems:'center',
      margin:5,
      //backgroundColor:'red',
      
    }
  }

  renderItem()
  {
    return this.props.data.map((item,i) =>{
      console.log('item.tutor_thumb = ' +item.tutor_thumb)
      var imageURL
      if (item.course_media_list.length == 0 ){
        imageURL = item.tutor_thumb
      }
      else
      {
        imageURL = item.course_media_list[0].media_file
      }
      return(
        <View
          key = {i}
          style = {this.itemStyle()}
        >
          <TouchableOpacity
            onPress={() => {this.iconOnClick(item)}}
          >
          {
           
            
            <Image
              style = {this.courseImageStyle()}
              //source={{uri:item.tutor_thumb}}
              source = {{uri:imageURL}}
            />
            
            /*
            <Avatar
            onPress={() => {this.iconOnClick(item)}}
            size = {imageHeight}
            url = {item.tutor_thumb}
            round = {true}
          />
          */
          }
          
          {
            //<View
            //  style = {this.courseNameStyle()}
            ///>
            <Text numberOfLines= {2} style = {this.courseNameStyle()}>{item.course_name}</Text>
          }
          </TouchableOpacity>
        </View>
      )
    })
  }

  render (){
    
    
    console.log('height = ' + this.props.height)
    var imageHeight = this.props.height - 70

    return(
      
      <View style = {this.backgroundStyle()}>
        <View style = {this.titleViewStyle()}>
          <Text style = {styles.title}>{this.props.title}</Text>
          
          <TouchableOpacity 
              onPress={ ()=>this.seeAllAction()}
          >
            <Text style = {styles.seeAll}>
              {strings.more}
            </Text>
          </TouchableOpacity>


        </View>
        <ScrollView 
          
          //style = {{height: this.p, marginTop:5}}
          horizontal = {true}
        >
          {this.renderItem()}

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
  height: 190,
  imageHeight:100,
  textHeight:30, 
  itemWidth: layout.deviceWidth/2 - 20,

};

export default TutorRowFlatList;

const styles = StyleSheet.create ({
  title:{
    //backgroundColor : 'blue',
    alignItems :'flex-start',
    flex:1, 
    marginLeft: 10,
    marginTop: 10,
    fontWeight:'bold',
    fontSize:layout.stringsSizeBig,
  },
  seeAll:{
    alignItems :'flex-start',
    flex:1, 
    marginRight: 15,
    marginTop: 13,
    fontWeight:'bold',
    fontSize:layout.stringsSizeSmall,
  },
  

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


