
import {courseModel} from 'tutorRN/src/Model/courseModel'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import {observable, action, computed} from 'mobx'
import strings from 'tutorRN/src/service/strings'

export default class courseVM{

	static myInstance = null;

	@observable refAllCourse = []
	@observable courseList = []
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

		this.load()		
	}

	async load()
	{
		await this.callAllCourseAPI()
	}

	async updateCourseByCategoryId(cat_id)
	{
		var temp = []
		return await C.getResponseFromApi(E.GET_COURSE_BY_CATEGORY, 'POST', {token:E.token, category_id:cat_id} ).then( (json ) =>{
			if ( json.statusCode == 200 && json.data.length !== undefined)
			{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					var c =  json.data[i]
					temp.push(courseModel.deserialize(c) )
				}
				this.refCoursesFromCategory[cat_id] = temp
				
				return true
			}
			else
			{
				return false
			}
		})
	}

	async updateCourseByTagId(tag_id)
	{
		var temp = []
		await C.getResponseFromApi(E.GET_COURSE_BY_TAG, 'POST', {token:E.token, category_id:tag_id} ).then( (json ) =>{
			if ( json.statusCode == 200 && json.data.length !== undefined)
			{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					var c =  json.data[i]
					temp.push(courseModel.deserialize(c) )
				}
				this.refCoursesFromTag[tag_id] = temp

				return true
			}
			else
			{
				return false
			}
		})
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
		
		//console.log('getCourseByCategory = ' + JSON.stringify(this.refCoursesFromCategory))
		var res = []
		res  = this.refCoursesFromCategory[c_id]
		return res
	}

	getCourseByTag (t_id)
	{
		return this.refCoursesFromTag[t_id]
	}

	getCourseFeeStringById(p_id)
	{
		if ( p_id == 0 )
		{
			return strings.price_low
		}
		else if ( p_id == 1)
		{
			return strings.price_mid
		}
		else{
			return strings.price_high
		}
	}

	async createCourse (post_body)
	{
		return C.getResponseFromApi(E.CREATE_COURSE, 'POST', post_body).then((json)=>{
			if ( json.statusCode == 200)
			{
				console.log('::: ' +  json )
				
				return true
			}
			else
			{
				return false
			}
		})
	}

	getCourseList()
	{
		return this.courseList
	}

	getNextCourseList()
	{
		if ( this.courseList.length == this.refAllCourse.length){
			return 
		}
		
		var nextArrayCount = Math.min(this.courseList.length + 5, this.refAllCourse.length)
		
		for ( var i = this.courseList.length ; i < nextArrayCount; i++)
		{
			this.courseList.push(this.refAllCourse[i])
		}
		return this.courseList
	}

	getAllCourse()
	{
		return this.refAllCourse

		var temp = []
		for ( var i = 0; i < 10; i ++)
		{
			temp.push(this.refAllCourse[i])
		}
		return temp
		//return this.refAllCourse
	}
	
	@action
	callAllCourseAPI()
	{
		//var temp = []
		this.refAllCourse = []
		this.courseList = []
		
		return C.getResponseFromApi(E.GET_COURSE, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					if ( i < 5 )
					{
						this.courseList.push(courseModel.deserialize( json.data[i] ) )
						//temp.push(courseModel.deserialize( json.data[i] ) )
					}
					this.refAllCourse.push(courseModel.deserialize( json.data[i] ) )
				}
				//this.refAllCourse = temp
				return true
         	}
         	else
         	{
             	return false
         	}
		})
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