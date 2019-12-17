import React, { Component } from 'react';
import { 
  TextInput,
  Text, 
  Image, 
  View, 
  StyleSheet, 
  ScrollView ,
  ListView,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')


const leftArrow = (props) => {
  return <Image 
                    style = {{ width: 30, height: 30}}
                    source= {require('tutorRN/image/left_arrow_icon_100.png')}
                    //resizeMode =  'center'
                    resizeMode =  'contain'
                  />
}

class TutorProfileTextBlock extends Component{

  constructor (props){
    super(props);
    this.state = {
      descriptionHeight: 50,
      editmode: true,
    }
    this.arrowOnClick = this.arrowOnClick.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    //console.log(this.props.description +' allowEdit = ' + this.props.allowEdit)
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillMount(){
    this.mounted = true
    this.setState({
      descriptionContent : this.props.description
    })
  } 

  _keyboardDidHide()
  {
   
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
  }

  arrowOnClick (index)
  {
    console.log('arrowOnClick = ' + index)
    this.props.onClicked(index)
  }

  onChange (event) {
    this.setState({
      descriptionContent: event.nativeEvent.text,
      descriptionHeight: event.nativeEvent.contentSize.height
    })
  }

  onContentSizeChange(event){
    this.setState({
      descriptionHeight: event.nativeEvent.contentSize.height
    })
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

  descriptionContentStyle ()
  {
    return {
      lineHeight:layout.defaultLineHeight,
      fontSize: layout.stringsSizeSmall,
      //paddingTop: 10,
      margin:5,
    }
    
  }

  render (){

    return(
  
        
   
      <View style = {styles.background}>
        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag-1)}
            >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/image/left_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
        }

        <View style = {styles.descriptionBG}>
          <View style = {{height:20, flexDirection:'row', justifyContent:'space-between'}}
          >
            <Text
              style = {styles.descriptionTitle}   
            >
              {this.props.title}
            </Text>
            <TouchableOpacity
              onPress={()=>this.editBtnOnClick()}
            >
            {
              //this.props.allowEdit && 
              false && 
              <Image
                style = {{width: 30, height:30}}
                source= {this.state.editmode ? require('tutorRN/image/icons8-completed-90.png') : require('tutorRN/image/icons8-pencil-90.png')}
                resizeMode =  'contain'
              />
            }
            </TouchableOpacity>
          </View>
          {
            this.props.allowEdit ? 
              <TextInput 
                style = {[this.descriptionContentStyle(), {height:this.state.descriptionHeight + 10}]}
                value = {this.state.descriptionContent}
                multiline={true}
                scrollEnabled = {false}
                editable = {this.props.allowEdit}
                //editable = {this.state.editmode}
                onChangeText={(descriptionContent) => this.setState({descriptionContent})}
                onChange={() => this.onChange.bind(this)}
                onContentSizeChange={(event) => this.onContentSizeChange(event)}
              />
            :
              <Text
                style = {this.descriptionContentStyle()}
              >
                {this.state.descriptionContent}
              </Text>
          }
          

          
        </View>

        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag+1)}
            >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/image/right_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
        }
      </View>
      
      )
  }
}

TutorProfileTextBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorProfileTextBlock;

const styles = StyleSheet.create ({

  background :{
    flexDirection:'row',
    //width: layout.deviceWidth,
    //height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  descriptionBG:{
    flex: 8,
    backgroundColor: 'white',
    padding:10,
  },

  descriptionTitle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    
    fontSize: layout.stringsSizeMid,
    fontWeight: 'bold',
  },
  description:{
    //backgroundColor: 'green',
    lineHeight:20,
    fontSize: layout.stringsSizeSmall,
    paddingTop: 10,
  },
})


