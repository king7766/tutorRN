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
import strings from '../../service/strings';
const layout = require('tutorRN/src/Layout')

class TutorProfilePreviewBlock extends Component{

  constructor (props){
    super(props);
    
    this.state = {
      
      name: this.props.name,
      description: this.props.description,

      //rating: this.props.rating,
      //appliedLesson: this.props.appliedLesson,
      //teachedLesson: this.props.teachedLesson,
      rating: '1',
      appliedLesson:'99',
      teachedLesson:'99',


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

  startEditBtnOnClicked()
  {
    console.log('startEditBtnOnClicked')
    this.props.onClicked()
  }

  upperPartUI()
  {
    return (
      <View
        style = {styles.upperPartUIStyles}
      >
        <Image 
          style = {styles.imageStyle}
          //source = {{uri: this.props.tutor.user_thumb}}
          source = {{uri:'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7'}}
          defaultSource = {require('tutorRN/src/image/icons8-customer-filled-100.png') }
          rezizeMode = 'contain'
        />
        <View
          style = {{flexDirection:'column',  flex:3}}
        >
          <View style = {{ flex:1, flexDirection:'row', justifyContent:'center'}}>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              <Text style = {{fontWeight:'bold'}} >
                評價 {this.state.rating}
              </Text>
              
            </View>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              
              <Text style = {{fontWeight:'bold'}}>{this.state.appliedLesson}</Text>
              <Text style = {{fontSize:layout.stringsSizeSmall, color:'gray'}} >{strings.appliedLesson}</Text>
            </View>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              <Text style = {{fontWeight:'bold'}}>{this.state.teachedLesson}</Text>
              <Text style = {{fontSize:layout.stringsSizeSmall , color:'gray'}} >{strings.teachedLesson}</Text>
            </View>
            
          </View>
          <View style = {{flex:1,  flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight
              onPress = {()=>this.startEditBtnOnClicked()}
              style = {{borderColor:'gray', borderRadius:5, borderWidth:2, padding:5, justifyContent:'center'}}
            >
              <Text
                style = {{ textAlign:'center'}}
              >
                {strings.startEditProfile}
              </Text>


            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }

  lowerPartUI()
  {
    //E.stringsSizeBig
    return (
      <View style = {{ flex:1}}>

        <Text style = {{margin: 5, fontSize:layout.stringsSizeMid, fontWeight:'bold'}} >KingTai Leung</Text>
        <Text numberOfLines= {3} style = {{margin: 5, fontSize:layout.stringsSizeSmall}} >詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡詳細內容在這裡</Text>
      </View>
    )
  }

  render (){


    return (
      <View style = {{ width:layout.deviceWidth, height:180,  backgroundColor:'white'}}>
        
        {
          this.upperPartUI()
        }
        <View style = {{backgroundColor:layout.backgroundColor, height: 2}}/>
        
        {
          this.lowerPartUI()
        }
        
      </View>
    )
  }
}

TutorProfilePreviewBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorProfilePreviewBlock;

const styles = StyleSheet.create ({

  upperPartUIStyles:{
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
  },


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
    margin: 10,
    //marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    backgroundColor: 'grey',
    //paddingTop: 10,
    height:80,
    width: 80,
    
    borderRadius:40,
    //flex:1,
    
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