
import {observable, computed} from 'mobx'
export class ratingModel{


    id : integer 
    user_id : integer
    tutor_id : integer
    rating : integer
    create_date : string

   serialize(){
        return 
        {
            id: this.id
            user_id: this.user_id
            tutor_id: this.tutor_id
            rating: this.rating
            create_date: this.create_date
            
         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new ratingModel()

        model.id = jsonObject.id
        model.user_id = jsonObject.user_id
        model.tutor_id = jsonObject.tutor_id
        model.rating = jsonObject.rating
        model.create_date = jsonObject.create_date
        
        return model
   }
}