import { StyleSheet } from 'react-native';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
let touchHighlightColor = 'rgba(237,182,202,0)'
let themeTextColor = 'rgba(225,19,101,1)'
let shadowColor = 'rgba(233,233,233,1)'
let systemBlueColor = 'rgba(21,126,250,1)'

let backgroundColor = 'rgba(233,233,233,1)'

let stringsSizeBig = 18
let stringsSizeMid = 16
let stringsSizeSmall = 12

const styles = StyleSheet.create({
	icon: {
	  marginTop: 10,
	  width: 20,
	  height: 20,
	},
});


module.exports = {
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
	styles,
	
	backgroundColor, 
	stringsSizeBig,
	stringsSizeMid,
	stringsSizeSmall
};

