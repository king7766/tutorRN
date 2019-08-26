
import {observable, computed} from 'mobx'

export class newsModel{

   id : integer 
   tutor_id : string = ''
   tutor_name : string = ''
   tutor_thumb : string = ''
   news_title : string = ''
   news_short_desc : string = ''
   news_content : string = ''
   news_thumb : string = ''
   news_publish_start_date : string  = ''
   news_publish_end_date : string = ''
   news_seq : integer 
   news_priority : integer
   create_user : string = ''
   create_date : string = ''
   tags : string = ''
   
   
   
   


   serialize(){
        return 
        {
            id: this.id
            tutor_id : this.tutor_id
            tutor_name : this.tutor_name
            tutor_thumb : this.tutor_thumb
            news_title: this.news_title
            news_short_desc: this.news_short_desc
            news_content: this.news_content
            news_thumb: this.news_thumb
            news_publish_start_date: this.news_publish_start_date
            news_publish_end_date: this.news_publish_end_date
            tags: this.tags

         
        }
   }

   static deserialize( jsonObject: Object){
       const model = new newsModel()
        model.id = jsonObject.id
        
        model.tutor_id = jsonObject.tutor_id
        model.tutor_name = jsonObject.tutor_name
        model.tutor_thumb = jsonObject.tutor_thumb
        
        model.news_title = jsonObject.news_title
        model.news_short_desc = jsonObject.news_short_desc
        model.news_content = jsonObject.news_content
        //model.news_thumb = jsonObject.image[0].medium.url
        model.news_thumb = jsonObject.news_thumb
        model.news_publish_start_date = jsonObject.publish_datetime
        model.tags = jsonObject.tags

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}