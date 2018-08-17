import {newsModel} from '../Model/newsModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

import {
  	getResponseFromApi
} from '../URLConfig';

const API = 'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=focus&page=0'

export default class newsVM{

	static myInstance = null;

	//userProfile: any
	//@observable refArray = []
	@observable refArray: newsModel [] = []

	static getInstance() {

        if (newsVM.myInstance == null) {	
            newsVM.myInstance = new newsVM()
        }
        return newsVM.myInstance
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

	getNews()
	{
		return this.refArray
	}

	//@action
	callAPI()
	{
		getResponseFromApi(API).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.items.length; i ++)
				{
					this.refArray.push(newsModel.deserialize(json.data.items[i]))	
				}
         	}
         	else
         	{
         		//console.log('error ')
         	
         		
         	}

		})

	}

}