import { ImageURISource } from 'react-native'

const profile = {
  default_avatar_man: require('tutorRN/image/user_icon_man.png') ,
  default_avatar_girl: require('tutorRN/image/user_icon_girl.png') ,
};

const tabs = {

}

const background = {
  welcome: require('tutorRN/image/background-01.jpg'),

}

const actions = {
  
  like : require('tutorRN/image/icon_like.png'),
  like_filled : require('tutorRN/image/icon_like_filled.png'),
  unlike : require('tutorRN/image/icons8-heart-outline-100.png'),
  sound : require('tutorRN/image/sound.png'),
  comment : require('tutorRN/image/chat.png'),

  search : require('tutorRN/image/icons8-search-filled-100b.png'),
  edit : require('tutorRN/image/icon-edit1.png'),
  trytry: require('tutorRN/image/icons8-add-file-100.png'),
  doc : require('tutorRN/image/icons8-document-100.png'),
  //trytry: require('image/icons8-scan-stock-100a.png')
}

const icon = {
  advanceSearch : require('tutorRN/image/icons/advanceSearch.png'),
  location : require('tutorRN/image/icons/120.png'),
  price : require('tutorRN/image/icons/price.png'),
  addImage : require('tutorRN/image/addImageIcon.png'),
  addImage1 : require('tutorRN/image/addImageIcon1.png'),
}

const Assets = {
  icon,
  profile,
  tabs,
  actions,
  background,
};

export default Assets;