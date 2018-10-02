import { StyleSheet } from 'react-native';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
let touchHighlightColor = 'rgba(237,182,202,1)'
let themeTextColor = 'rgba(225,19,101,1)'

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
	styles,

};

