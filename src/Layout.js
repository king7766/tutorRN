import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
//import DeviceInfo from 'react-native-device-info';

//const deviceId = DeviceInfo.getDeviceId();
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
let touchHighlightColor = 'rgba(237,182,202,1)'
let themeTextColor = 'rgba(225,19,101,1)'
let shadowColor = 'rgba(233,233,233,1)'
let systemBlueColor = 'rgba(21,126,250,1)'

let headingTextColor = 'rgba(231,121,98,1)'

let backgroundColor = 'rgba(233,233,233,1)'
let grayColor = 'rgba(180,180,180,1)'



let stringsSizeBig = 18
let stringsSizeMid = 16
let stringsSizeSmall = 14

const deviceInfo=()=>{
	/*
	8+
	deviceHeight = 736
Layout.js:23 deviceWidth = 414
Layout.js:24 1.7777777777777777

X
deviceHeight = 812
Layout.js:28 deviceWidth = 375
Layout.js:29 2.1653333333333333

8
deviceHeight = 667
Layout.js:28 deviceWidth = 375
Layout.js:29 1.7786666666666666

SE
deviceHeight = 568
Layout.js:28 deviceWidth = 320
Layout.js:29 1.775
connection.js:120 
*/
	console.log('deviceHeight = '  + deviceHeight)
	console.log('deviceWidth = '  + deviceWidth)
	//console.log(deviceHeight/deviceWidth)
	if ( (deviceHeight/deviceWidth ) > 2 )
	{
		return deviceHeight - 170;
	}
	else
	{
		
		return deviceHeight - 110;
		//return (deviceHeight +1000);
	}
	
}

const styles = StyleSheet.create({

	basicViewStyle:{
		//backgroundColor:'blue',
		//height:deviceHeight - 170,
		//height: deviceId ? deviceHeight - 170 : deviceHeight,
		height: deviceInfo(),
		//height:50,
	},

	icon: {
	  marginTop: 10,
	  width: 20,
	  height: 20,
	},

	homeIconSize:{
		height: 40,
    	width: 40
	}
});




module.exports = {

	contentHeight:deviceInfo()+100,

	searchFieldHeight: 50,
	recommendationViewHeight : 200,
	deviceHeight: deviceHeight,
	deviceWidth: deviceWidth,
	imageSize: 90,

	catelogHeight: 20,
	titleHeight:30,
	touchHighlightColor,
	themeTextColor,
	shadowColor,
	systemBlueColor,
	headingTextColor,
	
	styles,
	
	grayColor,
	backgroundColor, 
	stringsSizeBig,
	stringsSizeMid,
	stringsSizeSmall
};

