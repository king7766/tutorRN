
import {observable, computed} from 'mobx'

export class districtModel{

   id : integer 
   district_name : string = ''
   district_seq : string = ''
   location_list : []


   create_user : string = ''
   create_date : string = ''
   update_user : string = ''
   update_date : string = ''
   version_no : integer

   
   
   


   serialize(){
        return 
        {
            id: this.id
            district_name: this.district_name
            district_seq: this.district_seq
            location_list: this.location_list
            create_user: this.create_user
            create_date: this.create_date
            update_user: this.update_user
            update_date: this.update_date
            version_no: this.version_no

         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new districtModel()

        model.id = jsonObject.id
        model.district_name = jsonObject.district_name
        model.district_seq = jsonObject.district_seq
        model.location_list = jsonObject.location_list

        model.create_user = jsonObject.create_user
        model.create_date = jsonObject.create_date
        model.update_user = jsonObject.update_user
        model.update_date = jsonObject.update_date
        model.version_no = jsonObject.version_no

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}