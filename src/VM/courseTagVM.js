
import {courseTagModel} from 'tutorRN/src/Model/courseTagModel'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

export default class courseTagVM{

	static myInstance = null;

	refCourseTags = []
	

	static getInstance() {

        if (courseTagVM.myInstance == null) {	
            courseTagVM.myInstance = new courseTagVM()
        }
        return courseTagVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		this.load()		
	}

	load()
	{
		this.callAPI ()
	}

	getCourseIDByName( name )
	{
		for ( var i = 0; i < this.refCourseTags.length; i++)
		{
			if ( this.refCourseTags[i].name == name )
			{
				return this.refCourseTags[i].id
			}
		}
	}
	
	getCourseTagNameById(tag_id)
	{
		for ( var i = 0; i < this.refCourseTags.length; i++)
		{
			if ( this.refCourseTags[i].id == tag_id )
			{
				return this.refCourseTags[i].name
			}
		}
	}

	getCourseTags()
	{
		return this.refCourseTags
	}

	getCourseTagNames()
	{
		var names = []
		for ( var i = 0; i < this.refCourseTags.length; i ++)
		{
			var name = this.refCourseTags[i].name
			names.push(name)
		}
		return names 
	}

	getCourseTagId()
	{
		var ids = []
		for ( var i = 0; i < this.refCourseTags.length; i ++)
		{
			var _id = this.refCourseTags[i].id
			ids.push(_id)
		}
		return ids 
	}

	
	callAPI()
	{	
		
		C.getResponseFromApi(E.GET_COURSE_TAG_LIST, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					this.refCourseTags.push(courseTagModel.deserialize( json.data[i] ) )

				}
         	}
         	else
         	{
             		
         	}
		})
	}
}