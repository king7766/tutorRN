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
    Animated
} from 'react-native';

let Dimensions = require('Dimensions');
let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高


export default class ModalDialog extends Component {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
          fadeAnim: new Animated.Value(0),
        }
    }

    omponentDidMount() {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 10000,              // Make it take a while
        }
      ).start();                        // Starts the animation
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

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        let { fadeAnim } = this.state;
        return (
          <Animated.View
            style = {{opacity:fadeAnim}}
          >
            <Modal
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => {}} //如果是Android设备 必须有此方法
                >
                <View style={styles.bg}>
                    
                </View>
            </Modal>
          </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});