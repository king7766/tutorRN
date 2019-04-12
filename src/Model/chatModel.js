
import {observable, computed} from 'mobx'

export class chatModel{

  
    id : Int = ''
    master_id : Int = ''
    message : string = ''
    create_date : string = ''
    sender_id : Int = ''
    sender_name : string = ''

   serialize(){
        return 
        { 
            id : this.id
            master_id : this.master_id
            message : this.message
            create_date : this.create_date
            sender_id : this.sender_id
            sender_name : this.sender_name

            
         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new chatModel()
      
        
        model.id = jsonObject.id
        model.master_id = jsonObject.master_id
        model.message = jsonObject.message
        model.create_date = jsonObject.create_date
        model.sender_id = jsonObject.sender_id
        model.sender_name = jsonObject.sender_name
      
      


      return model
   }
}