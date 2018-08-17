
import {observable, computed} from 'mobx'

export class userModel{

   id : integer 
   user_login : string = ''
   user_password : string = ''
   user_nickname : string = ''
   user_thumb : string = ''
   user_email : string  = ''
   user_sex : string = ''
   user_occupation : string = ''
   user_education : string = ''
   user_birth = ''
   user_status : string = ''
   user_introduction : string = ''
   user_age : integer 
   user_token : string = ''

   create_user : string = ''
   create_date : string = ''
   update_user : string = ''
   
   
   


   serialize(){
        return 
        {
            id: this.id
            user_nickname: this.user_nickname
            user_thumb: this.user_thumb
            user_email: this.user_email
            user_status: this.user_status
         
        }
   }

   static deserialize( jsonObject: Object){
      const model = new userModel()
      
      model.id = jsonObject.result.user_id
      model.user_nickname = jsonObject.result.user_nickname
      model.user_thumb = jsonObject.result.user_thumbnail_image
      model.user_email = jsonObject.result.email
      model.user_status = jsonObject.result.user_status
      

      return model
   }
}