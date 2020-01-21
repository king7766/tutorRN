
import {observable, computed} from 'mobx'
import {courseModel} from 'tutorRN/src/Model/courseModel'

export class userModel{

   //id : integer 
   user_id : string = ''
   //verify_status : string = ''
   user_login : string = ''
   user_password : string = ''
   user_nickname : string = ''
   user_sex : string = ''

   user_occupation : string = ''
   user_education : string = ''
   user_birth : Date 
   user_location : string = ''
   user_status : string = ''
   user_registered : string = ''
   user_thumb : string = ''
   user_introduction : string = ''
   user_age : integer 
   
   //cert_list : any 
   course_list : [courseModel] 
   user_favorite_list : []
   rating_list : []
   cert_list : [string]
   //user_email : string  = ''
   
   
   
   //user_token : string = ''
  

   create_user : string = ''
   create_date : string = ''
   update_user : string = ''
   version_no : string = ''
   
   
   


   serialize(){
        return 
        {
            //id: this.id
            user_id : this.user_id
            //verify_status : this.verify_status
            user_login : this.user_login
            user_password : this.user_password
            
            user_nickname: this.user_nickname
            user_sex : this.user_sex

            user_occupation : this.user_occupation
            user_education : this.user_education
            user_birth : this.user_birth
            user_status: this.user_status
            user_registered : this.user_registered
            user_thumb: this.user_thumb
            //user_email: this.user_email

            user_introduction : this.user_introduction
            user_age : this.user_age
            course_list : this.course_list
            cert_list : this.cert_list

            //model.user_email = jsonObject.result.email
    
            rating_list : this.rating_list
            user_favorite_list : this.user_favorite_list
            
            create_user : this.create_user
            create_date : this.create_date
            update_user : this.update_user
            update_date : this.update_date
            version_no : this.version_no
            
         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new userModel()
      
        //model.id = jsonObject.result.user_id
        //user_token : string = ''
        model.user_id = jsonObject.user_id
        //model.verify_status = jsonObject.verify_status
        model.user_login = jsonObject.user_login
        model.user_password = jsonObject.user_password

        model.user_nickname = jsonObject.user_nickname
        model.user_sex = jsonObject.user_sex

        model.user_occupation = jsonObject.user_occupation
        model.user_education = jsonObject.user_education
        model.user_birth = jsonObject.user_birth
        model.user_status = jsonObject.user_status
        model.user_registered = jsonObject.user_registered
        model.user_thumb = jsonObject.user_thumb
        model.user_introduction = jsonObject.user_introduction
        //model.user_age = jsonObject.user_age
        model.cert_list = jsonObject.cert_list
        model.rating_list = jsonObject.rating_list

        var temp_course_list = []
        if ( jsonObject.course_list ){
            for( var i = 0; i < jsonObject.course_list.length; i ++)
            {
                temp_course_list.push(courseModel.deserialize(jsonObject.course_list[i]) )
            }
        }
        var temp_user_favorite_list = []
        if (jsonObject.user_favorite_list )
        {
            for ( var i = 0; i < jsonObject.user_favorite_list.length; i ++)
            {
                temp_user_favorite_list.push(jsonObject.user_favorite_list[i].course)
            }
        }

        model.user_favorite_list = temp_user_favorite_list
        model.course_list = temp_course_list
        

        //temp.push(courseModel.deserialize(c) )
        
        //model.user_email = jsonObject.result.email

        

        model.create_user = jsonObject.create_user
        model.create_date = jsonObject.create_date
        model.update_user = jsonObject.update_user
        model.update_date = jsonObject.update_date
        model.version_no = jsonObject.version_no
   

      //model.user_status = jsonObject.result.user_status
      
      


      return model
   }
}