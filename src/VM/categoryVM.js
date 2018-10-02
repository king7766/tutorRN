//import {locationModel} from '../Model/locationModel'
import {categoryModel} from '../Model/categoryModel'

import React from 'react';
import {observable, action, computed} from 'mobx'

/*
import {
  	getResponseFromApi
} from '../URLConfig';
*/
import * as Urlconfig from '/URLConfig'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

const API = 'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=focus&page=0'


export default class categoryVM{

	static myInstance = null;

	@observable refCategoryArray : categoryModel [] = []

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
		return this.refCategoryArray
	}

	getCategory()
	{
		var categoryArray = []
		for ( var i = 0 ; i < this.refCategoryArray.length ; i++ )
		{
			categoryArray.push( {id:this.refCategoryArray[i].id, name: this.refCategoryArray[i].name} )
		}
		return categoryArray;
	}


	getSubCatFromCat( key )
	{
		var item = this.refCategoryArray[key].sub_category;
		return item;
	}

	getSubCategory ()
	{
		var sub_category = []
		for ( var i = 0 ; i < this.refCategoryArray.length; i ++ )
		{	
			for ( var j = 0 ; j < this.refCategoryArray[i].sub_category.length; j ++ )
			{
				sub_category.push(this.refCategoryArray[i].sub_category[j])
			}
		}

		return sub_category
	}

	//@action
	callAPI()
	{	
		
		C.getResponseFromApi(E.get_category, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					
					//console.log(json.data[0])
					this.refCategoryArray.push(categoryModel.deserialize( json.data[i] ) )						
				}
         	}
         	else
         	{
             		
         	}
		})
	}
}