
import {observable, computed} from 'mobx'

export class subcategoryModel{

   id : integer 
   name : string = ''
   parent_category_id : integer

   sequence : integer 

   create_user : string = ''
   create_date : string = ''
   update_user : string = ''
   update_date : string = ''
   version_no : integer

   
   
   


   serialize(){
        return 
        {
            id: this.id
            name: this.name
            sequence: this.sequence
            parent_category_id: this.parent_category_id

            create_user: this.create_user
            create_date: this.create_date
            update_user: this.update_user
            update_date: this.update_date
            version_no: this.version_no

         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new subcategoryModel()

        model.id = jsonObject.id
        model.name = jsonObject.name
        model.sequence = jsonObject.sequence
        model.parent_category_id = jsonObject.parent_category_id

        model.create_user = jsonObject.create_user
        model.create_date = jsonObject.create_date
        model.update_user = jsonObject.update_user
        model.update_date = jsonObject.update_date
        model.version_no = jsonObject.version_no

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}