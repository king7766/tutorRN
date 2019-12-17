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
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')
import strings from 'tutorRN/src/service/strings'
import Assets from 'tutorRN/src/view/ui/Assets'

class SelectableInputField extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
  } 

  render (){

    return(
      <View style = {styles.fieldStyle}>
        <Text
          style = {styles.fieldTitleStyle}
        >
          {this.props.title}
        </Text> 
        <Text style = {styles.inputTextStyle}>
          {this.props.data}
        </Text> 
      </View>
    )
  }
}

export default SelectableInputField;

const styles = StyleSheet.create ({
  fieldStyle:{
    flexDirection:'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', 
  },

  fieldTitleStyle: {
    fontSize:layout.stringsSizeSmall,
    paddingLeft: 5,
    color: layout.blackColor,

  },
  inputTextStyle:{
    color : layout.themeTextColor,
    paddingRight:10,
    fontSize:layout.stringsSizeMid
  },
})


