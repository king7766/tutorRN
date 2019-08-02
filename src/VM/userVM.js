import {userModel} from 'tutorRN/src/Model/userModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

import {
  	getResponseFromApi
} from 'tutorRN/src/URLConfig';

//import * as C from 'tutorRN/src/service/connection'

import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

const profileAPI = 'http://tvbcomweb-dev.azurewebsites.net/inews/profile.php'

export default class userVM{

	static myInstance = null;
	_userID = '';


	@observable userProfile: any
	facebookPhotos = []

	static getInstance() {

        if (userVM.myInstance == null) {	
            userVM.myInstance = new userVM()
        }
        return userVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		this.load()
		
		
	}

	setUserProfile(data)
	{
		this.userProfile = userModel.deserialize(data)
	}

	setFacebookPhotos( photos)
	{
		this.facebookPhotos = photos
	}

	//@action
	load()
	{

		//this.callAPI ()

	}
	
	getUser()
	{
		
		return this.userProfile
	}

	getFacebookPhotos()
	{
		return this.facebookPhotos
	}

	async register (data)
	{
		return this.callRegister (data)
	}

	async login( login , password )
	{
		return  this.callLoginAPI(login, password)
	}

	async checkFavourite(user_id, course_id)
	{
		var data = {
			token:'xRW8DwqoIxZBSlF83b2P',
			user_id: user_id,
			course_id : course_id
		}
		
		return C.getResponseFromApi(E.CHECK_FAVOURITE, 'POST', data)
		.then ( (json)=>{
			if ( json.statusCode == 200)
			{
				return json
			}
			else
         	{
				console.log('this is error code : ' + json.data);	
         	}
		})
	}

	async addFavourite(user_id, course_id)
	{
		var data = {
			token:'xRW8DwqoIxZBSlF83b2P',
			user_id: user_id,
			course_id : course_id
		}

		return C.getResponseFromApi(E.ADD_FAVOURITE, 'POST', data)
		.then ( (json)=>{
			if ( json.statusCode == 200)
			{
				return json
			}
			else
         	{
				console.log('this is error code : ' + json.data);	
         	}
		})
	}

	async addRating(user_id, course_id, rating)
	{
		var data = {
			token:'xRW8DwqoIxZBSlF83b2P',
			user_id: user_id,
			course_id : course_id,
			rating: rating
		}

		return C.getResponseFromApi(E.ADD_RATING, 'POST', data)
		.then ( (json)=>{
			if ( json.statusCode == 200)
			{
				return json
			}
			else
         	{
				console.log('this is error code : ' + json.data);	
         	}
		})
	}

	async callRegister(data)
	{
		//REGISTER_USER
      	//LOGIN_AUTH
      
    	return C.getResponseFromApi(E.REGISTER_USER, 'POST', data)
      	.then( (json ) =>{
			if( json.statusCode == 200)
			{
				if ( isNaN(json.data) ){
					
					console.log(' Login success with id = ' +  json.data.user_id);
					this.userProfile = userModel.deserialize(json.data)
					return json
            
            		
            		//N.loginAction(json.data.user_id);
          		}
				else
			  	{
            		// something wrong, should be json
            		console.log('this is error code : ' + json.data);
            		//console.log(' Login success with id = ' +  json.data.user_id);
          		}
			}
		})

	}
	
	async callLoginAPI( login, password)
	{

		
		var data = {
			token:'xRW8DwqoIxZBSlF83b2P',
			login: login,
			password : password
		}

		/*
		Object.keys(data).reduce((result, key)=>{
			console.log('result = ' + key)		
		})
		*/
		/*

		const userStr = JSON.stringify(data)
		JSON.parse(userStr, (key, value)=> {
			if( key.length > 0 ){
				console.log('key = ' + key + ' : '+ value)
			}
		})
		*/

		//console.log(JSON.parse(data))
		
		//var data = 'token=xRW8DwqoIxZBSlF83b2P&login=kevin&password=qwer1234%T'

		return C.getResponseFromApi(E.LOGIN_AUTH, 'POST', data ).then( (json ) =>{

			
			if( json.statusCode == 200)	
         	{
				
				console.log('login data = ' + JSON.stringify(json.data, null, 2) )
				
			
				this.userProfile = userModel.deserialize(json.data)

				return json
			
         		
         		
         	}
         	else
         	{
				 //console.log('error ')
				 console.log('this is error code : ' + json.data);
         	
         		
         	}

		})

	}

}