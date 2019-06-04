import { ImageURISource } from 'react-native'

const profile = {
  default_avatar_man: require('tutorRN/src/image/user_icon_man.png') ,
  default_avatar_girl: require('tutorRN/src/image/user_icon_girl.png') ,
};

const tabs = {

}

const actions = {
  
  like : require('tutorRN/src/image/icons8-heart-outline-filled-100.png'),
  unlike : require('tutorRN/src/image/icons8-heart-outline-100.png'),
  sound : require('tutorRN/src/image/sound.png'),
  comment : require('tutorRN/src/image/chat.png'),

  search : require('tutorRN/src/image/icons8-search-filled-100b.png'),
  edit : require('tutorRN/src/image/icon-edit1.png'),
  trytry: require('tutorRN/src/image/icons8-add-file-100.png'),
  doc : require('tutorRN/src/image/icons8-document-100.png'),
  //trytry: require('image/icons8-scan-stock-100a.png')
}

const Assets = {
  profile,
  tabs,
  actions,
};

export default Assets;