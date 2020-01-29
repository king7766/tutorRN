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

import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()


const textHeight = 40

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
      //height:this.props.height,

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
      textAlign: 'left',    
      marginTop:5,
      width:this.props.itemWidth,
      //backgroundColor:'blue',
      fontSize:layout.stringsSizeMid
    }
  }

  courseImageStyle ()
  {
    return {
      
      //margin:5,
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
      //height: this.props.imageHeight+ this.props.textHeight,
      width:this.props.itemWidth,
      alignItems:'center',
      marginRight:10,
      //paddingRight:10,
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
          }
          { 
            <Text numberOfLines= {1} style = {this.courseNameStyle()}>{item.course_name}</Text>
          }
          {
            
            <View style ={{flexDirection:'row', justifyContent:'flex-start', height:40}}>
              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.location} style={layout.styles.icon} resizeMode='contain'/>
                <Text style={{ color:layout.darkGray}}>
                  {locationViewModel.getLocationNameById(item.location[0].id)}
                </Text>
              </View>
              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.price} style={layout.styles.icon} resizeMode='contain'/>
                <Text style={{ color:layout.darkGray}}>
                  {courseViewModel.getCourseFeeStringById(item.course_fee)}
                </Text>
              </View>
          
            </View>
            
          }
          
          
          </TouchableOpacity>
        </View>
      )
    })
  }

  render (){
    
    
    //console.log('height = ' + this.props.height)
    //var imageHeight = this.props.height - 70

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
        <View style = {{marginLeft:10, marginTop:10}}>
          {
            
            <ScrollView 
              contentContainerStyle = {{marginLeft:5}}
              horizontal = {true}
            >
              {this.renderItem()}
            </ScrollView>
            
          }
        </View>

        
      
      

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
  //height: (layout.deviceWidth/2 - 20)*9 /16 + textHeight + 50,

  itemWidth: layout.deviceWidth/2 - 30,
  imageHeight: (layout.deviceWidth/2 - 30)*9 /16,
  textHeight:textHeight, 
  

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
  infoBlockStyle:{
    height:30,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    
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


