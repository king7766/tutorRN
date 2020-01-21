
import {courseModel} from 'tutorRN/src/Model/courseModel'
import {courseTagModel} from 'tutorRN/src/Model/courseTagModel'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import {observable, action, computed} from 'mobx'
import strings from 'tutorRN/src/service/strings'

import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'

const courseTagViewModel = courseTagVM.getInstance()
const categoryViewModel = categoryVM.getInstance()

export default class courseVM{

	static myInstance = null;

	@observable refAllCourse = []
	@observable refCourseTags = []

	@observable courseList = []
	@observable refCoursesFromCategory = {}
	@observable refCoursesFromTag = {}
	
	@observable courseTagNames = []

	@observable searchHomeViewTopBarSelectedTags = []
	

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

	setupCategoryListingArray()
	{
	
	}

	setupTagCourseLisingArray()
	{
		//console.log('refCourseTags length = ' + this.refCourseTags.length)
		console.log('refCoursesFromTag = ' + JSON.stringify(this.refCoursesFromTag) )
		var temp = []
		var temp_courseTagNames = []
		
		for ( var i = 0; i < this.refCourseTags.length; i ++)
		//for ( var i = 0; i < courseTagViewModel.getCourseTags().length; i++)
		{
			var tagList = []
			var tagName = this.refCourseTags[i].name
			var tagId = this.refCourseTags[i].id

			this.courseTagNames.push(tagName)
			//temp_courseTagNames.push(tagName)
			
			for ( var j = 0; j < this.refAllCourse.length; j ++)
			{
				
				if ( tagName == this.refAllCourse[j].tag_name)
				{
					
					tagList.push(this.refAllCourse[j])
					
					//this.refCoursesFromTag.tagId.push(this.refAllCourse[j])
				}
			}

			this.refCoursesFromTag[tagId] = tagList
			
			
		}

		//console.log('refCoursesFromTag = ' + JSON.stringify(this.refCoursesFromTag) )

		//this.courseTagNames = temp_courseTagNames
		
		//console.log('setupTagLisingArray : ' +JSON.stringify(this.refCoursesFromTag))
	}

	async load()
	{
		await this.callAllCourseAPI()
	}

	async updateCourseByCategoryId(cat_id)
	{
		console.log('updateCourseByCategoryId cat_id = ' + cat_id)
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
				console.log('refCoursesFromCategory = ' + JSON.stringify(this.refCoursesFromCategory))

				return true
			}
			else
			{
				return false
			}
		})
	}

	async courseTagSelectedAction (index)
	{
		var tag_id = this.getCourseTagsList()[index].id
		const res = await this.updateCourseByTagId(tag_id)
		if (res == true)
		{
			var submit_data = this.getCourseByTag(tag_id)
			console.log('getCourseByCategory : ' +JSON.stringify(submit_data) )

        	var t = this.searchHomeViewTopBarSelectedTags
        	if ( t.includes(tag_id)){
          		for ( var i = 0; i < t.length; i ++){
            		if (t[i] == tag_id){
              			t.splice(i, 1);
            		}
          		}
        	}
        	else
        	{
				t.push(tag_id)
			}
			this.searchHomeViewTopBarSelectedTags = t
        }
        console.log('t = ' +JSON.stringify(t))
	}

	async updateCourseByTagId(tag_id)
	{
		var temp = []
		return await C.getResponseFromApi(E.GET_COURSE_BY_TAG, 'POST', {token:E.token, tag_id:tag_id} ).then( (json ) =>{
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

	filterCourseByCategory(c_id)
	{
		
	}

	getCourseByCategory(cat_id)
	{
		//console.log('getCourseByCategory = ' +JSON.stringify(this.refCoursesFromCategory[cat_id]))
		return this.refCoursesFromCategory[cat_id]
	}

	getCourseByCategoryAndFiltering(c_id, filter_id_array)
	{
		//console.log('c = ' + c_id)
		console.log('filter_id_array = ' + filter_id_array)
		var array = []
		//console.log(JSON.stringify(this.refCoursesFromCategory[c_id]))

		this.refCoursesFromCategory[c_id].map((item, i )=>{
			console.log('item.id = ' + item.id)
			if (filter_id_array.includes(item.id) ){
				array.push[item]
			}
		})
		
		return array
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

	getSearchHomeViewTopBarSelectedTag()
	{
		return this.searchHomeViewTopBarSelectedTags
	}

	async createCourse (post_body)
	{
		return C.getResponseFromApi(E.CREATE_COURSE, 'POST', post_body).then((json)=>{
			if ( json.statusCode == 200)
			{
				console.log('createCourse : ' +  json )
				
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
	}
	
	@action
	async callAllCourseAPI()
	{
		//var temp = []
		this.refAllCourse = []
		this.courseList = []
		
		return C.getResponseFromApi(E.GET_COURSE, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200 && json.data.length !== undefined)	
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
				//setupCategoryListingArray()
				//this.setupTagLisingArray()
				this.callcourseTagAPI()

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


	/* COURSE TAG METHOD HERE */


	async callcourseTagAPI()
	{	
		
		var temp_refCourseTags = []
		var temp_searchHomeViewTopBarSelectedTags = []
		return C.getResponseFromApi(E.GET_COURSE_TAG_LIST, 'POST', {token:E.token} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.length; i ++)
				{		
					var tagItem = courseTagModel.deserialize( json.data[i] )
					var tagItem_id = tagItem.id
					temp_refCourseTags.push(tagItem)
					temp_searchHomeViewTopBarSelectedTags.push(tagItem_id)
					//this.refCourseTags.push(tagItem)
					//this.refCoursesFromTag.push({
					//	[tagItem.id]: []
					//})
					//this.refCoursesFromTag[tagItem_id] = []
				}
				
				this.refCourseTags = temp_refCourseTags
				this.setupTagCourseLisingArray()
				this.searchHomeViewTopBarSelectedTags = temp_searchHomeViewTopBarSelectedTags

				return true
         	}
         	else
         	{
				return false
         	}
		})
	}

	getCourseTagsList()
	{
		return this.refCourseTags
	}

	getCourseTagNameById(_id)
	{
		for ( var i = 0; i < this.refCourseTags.length; i ++)
		{
			if ( this.refCourseTags[i].id == _id)
			{
				return this.refCourseTags[i].name
			}
		}
	}

	getCourseTagNames()
	{
		return this.courseTagNames
	}

	getCourseTagIdList()
	{
		var ids = []
		for ( var i = 0; i < this.refCourseTags.length; i ++)
		{
			var _id = this.refCourseTags[i].id
			ids.push(_id)
		}
		return ids 
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

	getCourseTagIdByName( name )
	{
		for ( var i = 0; i < this.refCourseTags.length; i++)
		{
			if ( this.refCourseTags[i].name == name )
			{
				return this.refCourseTags[i].id
			}
		}
	}



}