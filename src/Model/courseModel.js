
import {observable, computed} from 'mobx'
import {locationModel} from 'tutorRN/src/Model/locationModel'
import {districtModel} from 'tutorRN/src/Model/districtModel'
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

   tutor_id : string = ''
   tutor_name : string = ''
   tutor_thumb : string = ''

   location : [locationModel]
   district : [districtModel]

   

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
            tutor_id: this.tutor_id
            tutor_name : this.tutor_name
            tutor_thumb : this.tutor_thumb
            location : this.location
            district : this.district
         
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

        model.tutor_id = jsonObject.tutor_id
        model.tutor_name = jsonObject.tutor_name
        model.tutor_thumb = jsonObject.tutor_thumb

        
        var tempLocation = []
        for ( var i = 0; i < jsonObject.location.length; i ++){
            tempLocation.push(locationModel.deserialize( jsonObject.location[i] ) ) 
        }
        model.location = tempLocation

        var tempDistrict = []
        for ( var i = 0; i < jsonObject.district.length; i ++){
            tempDistrict.push(districtModel.deserialize( jsonObject.district[i] ) ) 
        }
        model.district = tempDistrict
        
      return model
   }
}