
import {observable, computed} from 'mobx'

export class courseModel{

   id : integer 
   course_name : string = ''
   course_introduction : string = ''
   course_fee : integer 
   course_ranking : integer 
   course_seq : integer 
   course_priority : integer 
   category_name : string = ''
   parent_category_name : string = ''
   tag_name : string = ''
   tutor_img : string = ''

   

   serialize(){
        return 
        {
            id: this.id
            course_name: this.course_name
            course_introduction: this.course_introduction
            course_fee: this.course_fee
            course_ranking: this.course_ranking
            course_seq: this.course_seq
            course_priority: this.course_priority
            category_name: this.category_name
            parent_category_name: this.parent_category_name
            tag_name: this.tag_name
            tutor_img: this.tutor_img
           
         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new courseModel()

        model.id = jsonObject.id
        model.course_name = jsonObject.course_name
        model.course_introduction = jsonObject.course_introduction
        model.course_fee = jsonObject.course_fee
        model.course_ranking = jsonObject.course_ranking
        model.course_seq = jsonObject.course_seq
        model.course_priority = jsonObject.course_priority
        model.category_name = jsonObject.category_name
        model.parent_category_name = jsonObject.parent_category_name
        model.tag_name = jsonObject.tag_name
        model.tutor_img = jsonObject.tutor_img
    
      return model
   }
}