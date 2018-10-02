
import {observable, computed} from 'mobx'

export class locationModel{

   id : integer 
   district_id : integer
   location_name : string = ''
   location_seq : integer
   

   
   
   


   serialize(){
        return 
        {
            id: this.id
            district_id: this.district_id
            location_name: this.location_name
            location_seq: this.location_seq
           

         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new locationModel()
        model.id = jsonObject.id
        model.district_id = jsonObject.district_id
        model.location_name = jsonObject.location_name
        model.location_seq = jsonObject.location_seq
       

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}