
import {observable, computed} from 'mobx'

export class newsModel{

   id : integer 
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
        model.news_title = jsonObject.title
        model.news_short_desc = jsonObject.template
        model.news_content = jsonObject.description
        model.news_thumb = jsonObject.image[0].medium.url
        model.news_publish_start_date = jsonObject.publish_datetime
        model.tags = jsonObject.tags

        
        
        //console.log('news_title = ' + model.news_title)
      
    
      return model
   }
}