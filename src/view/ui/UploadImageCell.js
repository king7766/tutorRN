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

class UploadImageCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  render (){

    return(
      <View style={styles.uploadButton}>
        <Image 
          style = {{height: 30, width:30, marginLeft:10}}
          source=  {Assets.icon.addImage}
        />
        <Text style = {styles.uploadText}>
          {strings.uploadPhoto}
        </Text>
      </View>  
    )
  }
}

export default UploadImageCell;

const styles = StyleSheet.create ({
  uploadButton: {
    backgroundColor:'white',
    height:60,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems:'center'   
  },
  uploadText:{
    paddingLeft: 10,
    color: 'black',
    fontSize:layout.stringsSizeMid,
  },
})


