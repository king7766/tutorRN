
import {courseModel} from 'tutorRN/src/Model/courseModel'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

export default class courseVM{

	static myInstance = null;

	refCoursesFromCategory = []
	refCoursesFromTag = []
	

	static getInstance() {

        if (courseVM.myInstance == null) {	
            courseVM.myInstance = new courseVM()
        }
        return courseVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		//this.load()		
	}

	load()
	{
		//this.callAPI ()
	}

	async loadCourse(type , item_id)
	{
		var url, post_content
		if ( type == 'CATEGORY' )
		{
			url = E.GET_COURSE_BY_CATEGORY
			post_content =  {token:'xRW8DwqoIxZBSlF83b2P', category_id:item_id}
		}
		else if (type == 'TAG')
		{
			url = E.GET_COURSE_BY_TAG
			post_content =  {token:'xRW8DwqoIxZBSlF83b2P', tag_id:item_id}
		}

		return await C.getResponseFromApi(url, 'POST', post_content ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					var temp = []
					var c =  json.data[i]
					temp.push(courseModel.deserialize(c) )
				}

				if ( type == 'CATEGORY')
				{
					this.refCoursesFromCategory[item_id] = temp
				}
				else if (type == 'TAG')
				{
					this.refCoursesFromTag[item_id] = temp
				}
				
				return true

         	}
         	else
         	{
             		
         	}
		})
	}

	getCourseByCategory(c_id)
	{
		return this.refCoursesFromCategory[c_id]
	}

	getCourseByTag (t_id)
	{
		return this.refCoursesFromTag[t_id]
	}
	
	callAPI()
	{	
		
		C.getResponseFromApi(E.GET_COURSE_BY_CATEGORY, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					var temp 
					temp.push(courseModel.deserialize( json.data[i] ) )

					//this.refCourses.push(courseModel.deserialize( json.data[i] ) )

				}
				this.refCoursesFromCategory[c_id] = temp
         	}
         	else
         	{
             		
         	}
		})
	}
}