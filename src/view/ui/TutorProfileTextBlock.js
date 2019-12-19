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
      //marginLeft:15,
      //marginRight:15,
      margin:15,
    }
    
  }

  render (){

    return(
  
        
   
      <View style = {styles.background}>
        <Text style = {styles.descriptionTitle}>
          {this.props.title}
        </Text>
  
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
          <Text style = {this.descriptionContentStyle()}>
            {this.state.descriptionContent}
          </Text>
            
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
    flexDirection:'column',
    //width: layout.deviceWidth,
    //height: 150,
    justifyContent: 'space-between',
    //alignItems: 'center',
    backgroundColor: 'white',
  },

  descriptionTitle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    marginTop:10,
    //marginBottom:10,
    marginLeft:15,
    fontSize: layout.stringsSizeMid,
    fontWeight: 'bold',
  },
  
})


