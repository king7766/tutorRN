import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight,
   TouchableOpacity,
   TextInput
} from 'react-native';
const layout = require('tutorRN/src/Layout')

class TutorProfileBlock extends Component{

  constructor (props){
    super(props);
    
    this.state = {
      editmode: false,
      job: this.props.tutor.job,
      title : this.props.tutor.title,
      exp: this.props.tutor.exp,
    }
    this.arrowOnClick = this.arrowOnClick.bind(this)

  }
  componentWillMount(){
    this.mounted = true
  } 

  arrowOnClick (index ){
    console.log('arrowOnClick = ' + index)
    this.props.onClicked(index)
  }

  editBtnOnClick()
  {
    this.setState({
      editmode:!this.state.editmode
    })
    if ( this.state.editmode == false)
    {

    }
  }

  content()
  {
    return (
      <View >
        <View style = {{height:40, flexDirection:'row', justifyContent:'space-between'}}
        >
          <Text
            style = {styles.nameStyle}
          >
            {this.props.tutor.user_nickname}
          </Text>
          
          <TouchableOpacity
              onPress={()=>this.editBtnOnClick()}
          >
            {
              this.props.allowEdit && 
              <Image
                style = {{width: 30, height:30, padding:5}}
                source= {this.state.editmode ? require('tutorRN/src/image/icons8-completed-90.png') : require('tutorRN/src/image/icons8-pencil-90.png')}
                resizeMode =  'contain'
              />
            }
            
          </TouchableOpacity>
        </View>
        <TextInput 
          style = {styles.subtextStyle}
          value = {this.state.job}
          editable = {this.state.editmode}
          onChangeText={(job) => this.setState({job})}
        />
        <TextInput 
          style = {styles.subtextStyle}
          value = {this.state.title}
          editable = {this.state.editmode}
          onChangeText={(title) => this.setState({title})}
        />
        <TextInput 
          style = {styles.subtextStyle}
          value = {this.state.exp}
          editable = {this.state.editmode}
          onChangeText={(exp) => this.setState({exp})}
        /> 
        </View>
    )
  } 

  render (){


    return (
      <View style = {{flexDirection:'row', width:layout.deviceWidth, height:120,  backgroundColor:'white'}}>
        <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.tutor.user_thumb}}
            defaultSource = {require('tutorRN/src/image/icons8-customer-filled-100.png') }
            rezizeMode = 'contain'
          />
        </View>
        <View style = {{flex:2, backgroundColor:'white' }}>
        {
          this.content()
        }
        </View>
        
      </View>
    )
  }
}

TutorProfileBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorProfileBlock;

const styles = StyleSheet.create ({


  background:{
    backgroundColor: 'white',
    flexDirection: 'row',
    width: layout.deviceWidth,
    borderTopWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  photoViewStyle:{
    //flex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    //flexDirection: 'column',
    backgroundColor: 'red',
    //alignItems: 'center',
    //justifyContent: 'center'
    
  },

  imageStyle :{

    //marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    backgroundColor: 'grey',
    //paddingTop: 10,
    height:80,
    width: 80,
    borderRadius:40,
    
    //width:layout.deviceWidth

  },

  tutorViewStyle:{
    backgroundColor: 'red',
    flex: 5,
    padding : 5,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'flex-start'
  },

  nameStyle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    padding : 5,
    height:30,
  },

  subtextStyle:{
    //backgroundColor: 'green',
    color: 'rgba(107,157,242,1)',
    fontSize: 12,
    padding : 2,
    paddingLeft : 10,
    height:20,
  }
})