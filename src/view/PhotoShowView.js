/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

const layout = require('tutorRN/src/Layout')


class PhotoShowView extends Component<Props> {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
        'https://via.placeholder.com/150/C0C0C0/000000?text=image%20here',
      ])
    }
  }

  onPressImage(rowID)
  {
    console.log(rowID)

  }

  imageContent(data, sectionID, rowID, higlightRow)
  {
    console.log(sectionID, rowID, higlightRow)
    return (
      <TouchableHighlight

        onPress={ ()=>this.onPressImage(rowID)}
      >
      
      <Image
        style = {{ height:layout.deviceWidth/3, width:layout.deviceWidth/3, borderColor: 'black',  borderWidth: 0.5,}}
        source={{uri:data}}
        //style={[styles.icon, { tintColor: tintColor }]}
        //style={[layout.styles.icon, { tintColor: tintColor }]}
      >
      
      </Image>
      </TouchableHighlight>
    )
  }

  componentWillMount() {

  }




  render() {

    return (
      
        <ListView
          //backgroundColor = 'black'
          //horizontal={true}
          contentContainerStyle = {styles.list}
          dataSource={this.state.dataSource}
          //renderRow={(rowData) => <Image>{rowData}</Image>}
          renderRow = {(rowData, sectionID, rowID, higlightRow) => this.imageContent(rowData, sectionID, rowID, higlightRow)}
        />

    
        
      
      
    );
  }
}

//<View style={[styles.container, styles.horizontal]}>
const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})


export default PhotoShowView;


