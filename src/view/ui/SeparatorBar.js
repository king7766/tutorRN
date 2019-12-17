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

class SeparatorBar extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
  } 

  render (){

    return(
      
      <View>
        {
          this.props.text ?
          <View style={{height:40,justifyContent: 'center', backgroundColor:this.props.backgroundColor}}>
            <Text style = {{color:layout.headingTextColor ,fontSize:layout.stringsSizeMid, paddingLeft: 10} }>
              {this.props.text}
            </Text>
          </View>
          :
          <View>
            <View style = {{backgroundColor:this.props.backgroundColor, height: this.props.height}}/>
          </View>
        }
      </View>
      
    )
  }
}

SeparatorBar.defaultProps = {
  backgroundColor : layout.backgroundColor,
  height:5,
}


export default SeparatorBar;

const styles = StyleSheet.create ({
  
})


