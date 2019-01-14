import {newsModel} from 'tutorRN/src/Model/newsModel'
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

	getNewsWithID(newsID)
	{
		var selectedNewsItem = this.refArray[this.refArray.map(function (item) { return item.id; }).indexOf(newsID)];
		
		return selectedNewsItem
		//console.log(selectedData)
	}

	//@action
	callAPI()
	{	//http://laravel50.com/admin/add
		//{tab:'type', name:345, seq:100} 
		//{token:'xRW8DwqoIxZBSlF83b2P'}

		/*
		C.getResponseFromApi('http://laravel50.com/admin/add', 'POST', {tab:'type', name:345, seq:100}  ).then( (json ) =>{
			
		})
		*/
		
		C.getResponseFromApi(E.get_news, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
		//C.getResponseFromApi(E.get_news, 'POST', 'token=xRW8DwqoIxZBSlF83b2P' ).then( (json ) =>{	
			if( json.statusCode == 200)	
         	{
				
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					this.refArray.push(newsModel.deserialize( json.data[i] ) )						
				}
         	}
         	else
         	{
             		
         	}
			
		})

		/*
		C.getResponseFromApi(API, 'GET', 'aaa').then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.items.length; i ++)
				//for ( var i = 0; i < 1; i ++)
				{
					this.refArray.push(newsModel.deserialize(json.data.items[i]))	
				}
         	}
         	else
         	{
         		//console.log('error ')
         	
         		
         	}
			
		})
		*/

		/*
		C.getResponseFromApi('http://laravel50.com/admin/add', 'POST', {tab:'type', name:345, seq:100} ).then ( (json) => {
			if ( json.statusCode == 200)
			{
				console.log('2000000')
			}
			
		})
		*/

	}

}