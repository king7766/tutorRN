/**
 * Created by peixuan.xie on 2017/2/28.
 */
import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View ,
    StyleSheet,
    BackAndroid,
    Animated,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import Assets from 'tutorRN/src/view/ui/Assets';
import animatedbasic from 'tutorRN/src/view/ui/animatedbasic'
const layout = require('tutorRN/src/Layout')

let Dimensions = require('Dimensions');
let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

import {
  AddBtnPopUpDialog,
  CreateLessonView,
} from 'tutorRN/src/view/ui/UIComponent';


class PopUpView extends Component<Props> {

    // 构造
    constructor(props) {
        super(props);
    }

  
    render() {
        
        return (
          <View style={styles.bg}>
          {
            <AddBtnPopUpDialog/>
          }

          </View>


        );
    }
}

const styles = StyleSheet.create({
    bg: {  
      //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.8)',  //rgba  a0-1  其余都是16进制数
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    dialog: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.28,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dialogTitleView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    dialogContentView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContent: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
    },
    dialogBtnView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        flexDirection: 'row',
    },
    dialogBtnViewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5F2FF',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    leftButton: {
        fontSize: 18,
        color: '#007AFF',
        borderBottomLeftRadius: 8,
    },
    rightButton: {
        fontSize: 18,
        color: '#007AFF',
        borderBottomRightRadius: 8,
    },
    box: {
      width: 100,
      height: 100,
      backgroundColor: '#333',
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      color: "#FFF"
    }
});

export default PopUpView;
/*

<Image style = {{
            height:30, 
            resizeMode:'contain', 
            width: 30,  
            alignItems:'center', 
            borderRadius: 15,
            borderColor: 'white',
            borderColor: '1',
            //backgroundColor: index == this.state.selectedItem ? 'red' : 'gray'
            }} 
            source = {Assets.actions.trytry} 
        />
        <Text
          style = {{alignItems:'center', color:'white', marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}
          
        >
          {this.props.title}
        </Text>

        */