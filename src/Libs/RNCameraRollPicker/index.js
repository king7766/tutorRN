
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import futch from '../api';
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import strings from 'tutorRN/src/service/strings'

export default class RNCameraRollPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      progress: 0,
    };
    this.sendServer = this.sendServer.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.confirmBtnOnClick = this.confirmBtnOnClick.bind(this)
  }

  getSelectedImages(images, current) {
    console.log('Selected Images ', images, ' : ', current)
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });
  }

   parseParams ( params ){

    var dataString = ''

    const Str = JSON.stringify(params)
    JSON.parse(Str, (key, value)=> {
        if( key.length > 0 ){
            var s = key + '=' + value + '&'
            dataString = dataString + s
        }
    })

    console.log('parseParams = ' + dataString)

    return dataString;

  }

  confirmBtnOnClick()
  {
    console.log('confirmBtnOnClick')
    
    //DeviceEventEmitter.emit('popUp', {flag:false, age:23});
    

    this.uploadImage()

    return;

    const photos = this.state.selected;
    const data = new FormData();
    data.append('name', 'testName');
    data.append('file', {
      //uri: source.uri,
      uri: this.state.selected[0].uri,
      type: 'image/jpeg',
      name: 'testPhotoName'
    });

    
    /*
    photos.forEach((photo, index) => {
      data.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'image'+index
      });
    })
    */
    var dataString = this.parseParams({'token':'xRW8DwqoIxZBSlF83b2P','user_id':'1'})
    data.append(this.parseParams({'token':'xRW8DwqoIxZBSlF83b2P'}));
    data.append(this.parseParams({'user_id':'1'}));
    console.log(data)


    fetch(E.upload_file,{
    //fetch('http://tutor.ho2find.com/get_category.php',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      //headers: {
      //  'Content-Type': 'multipart/form-data',
      //},
      body: this.parseParams({
        'token':'xRW8DwqoIxZBSlF83b2P', 
        'user_id':'1',
        'file': {
          uri: this.state.selected[0].uri,
          type: 'image/jpeg',
          name: 'testPhotoName'
        } 
      })
    }).then(async (response) => {
      const statusCode = await response.status;
      const data = await response.json();
      return Promise.all([statusCode, data]);
    })
    .then(res => {  
      console.log("res :", res);
      return {statusCode:res[0], data:res[1]} 
    }) 
    .then(json => { 
      console.log("json :", json);
      return json;
    })
    .catch(error => {
      console.log ('error = ' + error);
      return {error: error};
    })
    
  }

  uploadImage ()
  {
    if ( this.state.selected.length == 0 || typeof this.state.selected == 'undefined' )
    {
      DeviceEventEmitter.emit('popUp', {flag:false});
      return;
    }

    C.getResponseFromApi(E.upload_file, 'POST', {
      token:'xRW8DwqoIxZBSlF83b2P',
      user_id:'1',
      file: {
        uri: this.state.selected[0].uri,
        type: 'image/jpeg',
        name: 'testPhotoName'
      } 
    }).then( (json ) =>{
      if( json.statusCode == 200)	
      {
        console.log('json.data = ' + json.data.link)
        DeviceEventEmitter.emit('popUp', {flag:false});
      }
    })
  }

  sendServer() {

    
    console.log(this.state.selected)
    const photos = this.state.selected;
    const data = new FormData();
    data.append('name', 'testName');
    photos.forEach((photo, index) => {
      data.append('photos', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'image'+index
      });
    })
    console.log(data)
    const url = Platform.OS === 'android' ? 'http://10.0.3.2:3000' : 'http://localhost:3000'; // genymotion's localhost is 10.0.3.2
    futch(url + '/array', {
      method: 'post',
      body: data
    }, (e) => {
      const progress = e.loaded / e.total;
      console.log(progress);
      this.setState({
        progress: progress
      });
    }).then((res) => console.log(res), (e) => console.log(e))
    
  }
//<TouchableOpacity onPress={this.sendServer}>
  render() {
    return (
      <View style={styles.container}>
        
          <View style={styles.content}>
            <Text style={styles.text}>
              <Text style={styles.bold}> {this.state.num}  {this.state.progress} </Text> {strings.choosed}
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.confirmBtnOnClick}>
              <Text style={styles.buttonText}> {strings.confirm} </Text>
            </TouchableOpacity>
            
          </View>
       
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={10}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 30,
    height: 60,
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  button: {
    //margin: 20,
    //padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    //backgroundColor: '#406E9F',
    backgroundColor: 'white',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F6AE2D',
    //color: '#fff',
    //backgroundColor: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
