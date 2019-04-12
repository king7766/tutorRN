
import {observable, computed} from 'mobx'

export class courseTagModel{

   id : integer 
   name : string = ''
   sequence : integer 

   serialize(){
        return 
        {
            id: this.id
            name: this.name
            sequence: this.sequence
           
         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new courseTagModel()

        model.id = jsonObject.id
        model.name = jsonObject.name
        model.sequence = jsonObject.sequence
    
      return model
   }
}