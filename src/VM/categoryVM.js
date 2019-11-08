//import {locationModel} from 'tutorRN/src/Model/locationModel'
import {categoryModel} from 'tutorRN/src/Model/categoryModel'
import {subcategoryModel} from 'tutorRN/src/Model/subcategoryModel'

import React from 'react';
import {observable, action, computed} from 'mobx'

/*
import {
  	getResponseFromApi
} from 'tutorRN/src/URLConfig';
*/
import * as Urlconfig from 'tutorRN/src/URLConfig'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

const API = 'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=focus&page=0'


export default class categoryVM{

	static myInstance = null;

	//@observable refCategories : categoryModel [] = []
	refCategories = []
	refSubCategories = []

	static getInstance() {

        if (categoryVM.myInstance == null) {	
            categoryVM.myInstance = new categoryVM()
        }
        return categoryVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		this.load()
		
		
	}

	//@action
	load()
	{
		this.callAPI ()
	}

	getFullList()
	{
		return this.refCategories
	}

	getCategories()
	{
		return this.refCategories
	}

	getSubCategories()
	{
		return this.refSubCategories
	}


	getSubCategoriesByCategoryKey( key )
	{
		//var item = this.refCategories[key].sub_category;

		console.log('key = ' + key)
		var array = []

		for (var i = 0; i < this.refSubCategories.length; i ++)
		{
			//console.log('name = ' + this.refSubCategories[i].parent_category_id)
			if (this.refSubCategories[i].parent_category_id == key)
			{
				//console.log('name = ' + this.refSubCategories[i].name)
				array.push(this.refSubCategories[i])
			}
		}
		return array;
		
	}

	setupSubCategory ()
	{
		var sub_categories = []
		for ( var i = 0 ; i < this.refCategories.length; i ++ )
		{	
			for ( var j = 0 ; j < this.refCategories[i].sub_category.length; j ++ )
			{
				sub_categories.push( subcategoryModel.deserialize (this.refCategories[i].sub_category[j]) )
				//this.refCategories.push(categoryModel.deserialize( json.data[i] ) )						

			}
		}
		this.refSubCategories = sub_categories
	
		return this.refSubCategories
	}

	getSubCategoryIDByName ( name )
	{
		for ( var i = 0; i < this.refSubCategories.length; i ++)
		{
			if ( this.refSubCategories[i].category_name == name){
				return this.refSubCategories[i].id
			}
		}
	}

	getCategoryIDByName( name )
	{
		for ( var i = 0; i < this.refCategories.length; i ++)
		{
			if ( this.refCategories[i].category_name == name){
				return this.refCategories[i].id
			}
		}
	}

	getCategoryNameByID( value )
	{
		for ( var i = 0 ; i < this.refCategories.length; i ++)
		{
			if ( this.refCategories[i].id == value){
				return this.refCategories[i].category_name
			}
		}
	}

	getSubCategoriesNameByCategoryKey(key)
	{
		
		var names = []
		if ( key == null)
		{
			return names
		}
		
		for (var i = 0; i < this.refSubCategories.length; i ++)
		{
			if (this.refSubCategories[i].parent_category_id == key)
			{
				names.push(this.refSubCategories[i].category_name)
			}
		}
		return names;

	}

	getSubCategoriesNames()
	{
		var names = []
		for ( var i = 0; i < this.refSubCategories.length; i ++)
		{
			name.push(this.refSubCategories[i].category_name)
		}
		return names
	}

	getCategoriesNames()
	{
		var names = []
		for ( var i = 0; i < this.refCategories.length; i ++)
		{
			names.push(this.refCategories[i].category_name)
		}
		return names
	}

	//@action
	callAPI()
	{	
		
		C.getResponseFromApi(E.GET_CATEGORY, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					
					//console.log('name = ' + json.data[i].name)
					this.refCategories.push(categoryModel.deserialize( json.data[i] ) )

				}

				this.setupSubCategory()
         	}
         	else
         	{
             		
         	}
		})
	}
}