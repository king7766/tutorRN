
import {observable, computed} from 'mobx'

export class categoryModel{

   id : integer 
   name : string = ''
   sub_category : []

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
            sub_category: this.sub_category

            create_user: this.create_user
            create_date: this.create_date
            update_user: this.update_user
            update_date: this.update_date
            version_no: this.version_no

         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new categoryModel()

        model.id = jsonObject.id
        model.name = jsonObject.name
        model.sequence = jsonObject.sequence
        model.sub_category = jsonObject.sub_category

        model.create_user = jsonObject.create_user
        model.create_date = jsonObject.create_date
        model.update_user = jsonObject.update_user
        model.update_date = jsonObject.update_date
        model.version_no = jsonObject.version_no

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}