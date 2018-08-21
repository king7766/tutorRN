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
import Assets from '/view/ui/Assets';
import animatedbasic from '/view/ui/animatedbasic'
const layout = require('/Layout')

let Dimensions = require('Dimensions');
let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

import {
  CreateLessonView,
} from '/view/ui/UIComponent';

class MovingView extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      offsetY : new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.offsetY,
      { 
        //toValue: -500,
        toValue: this.props.move,
        duration: 300,
      }
    ).start();

    
  }

  _dialogLeftBtnAction(){
    console.log('_dialogLeftBtnAction')
    DeviceEventEmitter.emit('add', {name:'John', age:23});
    
  }
  
  render() {
    return (
      
      
      <Animated.View                 // Special animatable View
        style={{
          transform: [{translateY: this.state.offsetY}],
          ...this.props.style,
          //opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        <TouchableHighlight  
          //style = {{...this.props.style}}
          underlayColor = {'transparent'}
          onPress={this._dialogLeftBtnAction} 
        >
          <View
            style = {{flexDirection:'row', alignItems:'center'}}
          >
            <Image 
              style = {{
                height:30, 
                resizeMode:'contain', 
                width: 30,  
                alignItems:'center', 
                borderRadius: 15,
                borderColor: 'white',
                
            
              }} 
              source = {Assets.actions.trytry} 
            />
            <Text
              style = {{alignItems:'center', color:'white', marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}
            >
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
      
    );
  }
}

class AddBtnPopUpDialog extends Component<Props> {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
          fadeAnim: new Animated.Value(0),
          
        }
    }

    componentDidMount() {
      console.log('12312313')
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 10000,              // Make it take a while
        }
      ).start();                        // Starts the animation

      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 15000
      }).start()
    }

    componentWillMount() {
      this.animatedValue = new Animated.Value(0);
    }

    /*
    static propTypes = {
        _dialogTitle: React.PropTypes.string, //标题
        _dialogContent: React.PropTypes.string, //内容
        _dialogLeftBtnTitle: React.PropTypes.string,    //左按键标题
        _dialogRightBtnTitle: React.PropTypes.string,   //右按键标题
        _dialogLeftBtnAction: React.PropTypes.func.isRequired,  //左点击方法
        _dialogRightBtnAction: React.PropTypes.func.isRequired, //右点击方法
        _dialogVisible: React.PropTypes.bool,       //显示还是隐藏
    }
    */
    static defaultProps = {
        _dialogTitle: '温馨提示',
        _dialogContent: '是否退出',
        _dialogLeftBtnTitle: '取消',
        _dialogRightBtnTitle: '确定',
        _dialogVisible: false,
    }

    //this.refs.scrollView.scrollTo(0)
   
    hihi()
    {
      console.log('jihihihi')
      //this.refs._scrollView.scrollTo(SCREEN_WIDTH)
      //this.defaultAnimationDialog.show();
      
    }
    

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        let { fadeAnim } = this.state;

        const interpolateRotation = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0rad', '13rad'],
        })
        const animatedStyle = {
          transform: [
            { rotate: interpolateRotation }
          ]
        }

        return (
          
            <Modal
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => {}} //如果是Android设备 必须有此方法
            >

              <TouchableHighlight underlayColor = {'transparent'} onPress={this.hihi}>
                <View style={styles.bg}>
                  <ScrollView
                    horizontal = {true}
                    ref='_scrollView'
                    
                    style = {{ width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT, flex:1, flexDirection:'row'}}
                  >
                

                  <View
                    style = {{height:SCREEN_HEIGHT, width: SCREEN_WIDTH}}
                  >
                      
                   <MovingView 
                    style={{position: 'absolute', bottom: 0, width: 250, height: 50,left:20}}
                    move={-250}
                    title = {'新增課堂'}
                  />
                  
                  <MovingView 
                    style={{position: 'absolute', bottom: 0, width: 250, height: 50,left:20}}
                    move={-175}
                    title = {'評分'}
                  />
                  <MovingView 
                    style={{position: 'absolute', bottom: 0, width: 250, height: 50,left:20, flexDirection:'row', alignItems:'center'}}
                    move={-100}
                    title = {'新增課堂'}
                  />

                  <View style = {{ position: 'absolute',left:(layout.deviceWidth - 30 )/2, height: 30, width: 30,bottom: 30, backgroundColor :'white', borderRadius:15,alignItems:'center', justifyContent:'center'  }} >
                
                      <Text
                        style = {{color:'gray', fontSize : 20, fontWeight:'bold' }}
                      >
                        x
                      </Text>
                    
                  </View>
                    </View>
                    <CreateLessonView style ={{height: SCREEN_HEIGHT, width:SCREEN_WIDTH, left: SCREEN_WIDTH, position:'absolute'}}/>
                 

                  
                  </ScrollView>
                </View>
              </TouchableHighlight>
            </Modal>
          
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

export default AddBtnPopUpDialog;
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