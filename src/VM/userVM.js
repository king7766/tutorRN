import {userModel} from 'tutorRN/src/Model/userModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

import {
  	getResponseFromApi
} from 'tutorRN/src/URLConfig';

//import * as C from 'tutorRN/src/service/connection'

import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'
import strings from 'tutorRN/src/service/strings'

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

	getEducationById(e_id)
	{
		if ( e_id == 0)
		{
			return strings.education_low
		}
		else if ( e_id == 1)
		{
			return strings.education_mid
		}
		else if ( e_id == 2)
		{
			return strings.education_high
		}
		else if ( e_id == 3)
		{
			return strings.education_exHigh 
		}

		return strings.education_low 
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

	getUserFavourite()
	{
		//console.log('getUserFavourite : ' + JSON.stringify(this.userProfile.user_favorite_list))
		return [1,2,3,4,5,6,7,8,9,10]
	}

	getUserFavouritedByCourseID(course_id)
	{
		if (this.userProfile == undefined )
		{
			return false
		}
		
		console.log('getUserFavouritedByCourseID = ' + course_id)
		//console.log(JSON.stringify(this.userProfile.user_favorite_list))
		var _flag = this.userProfile.user_favorite_list.some(function (item){
			console.log('item id = ' + item.id)
			return parseInt(item.id ) == parseInt(course_id)
		})	
		return _flag
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
			if ( json.statusCode == 200 && json.data != -200)
			{
				return json
			}
			else
         	{
				console.log('this is error code : ' + json.data);	
         	}
		})
	}

	async addFavourite(course_id)
	{
		var data = {
			token:'xRW8DwqoIxZBSlF83b2P',
			user_id: this.getUser().user_id,
			course_id : course_id
		}

		return C.getResponseFromApi(E.ADD_FAVOURITE, 'POST', data)
		.then ( (json)=>{
			if ( json.statusCode == 200 && json.data != -200)
			{
				
				return true
			}
			else
         	{
				console.log('this is error code : ' + json.data);	
				return false
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
			if ( json.statusCode == 200 && json.data != -200)
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
			if( json.statusCode == 200 && json.data != -200)
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

			
			if( json.statusCode == 200 && json.data != -200)	
         	{

				console.log('userVM login data = ' + JSON.stringify(json.data, null, 2) )
				
			
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