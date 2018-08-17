import {userModel} from '../Model/userModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

import {
  	getResponseFromApi
} from '../URLConfig';

const profileAPI = 'http://tvbcomweb-dev.azurewebsites.net/inews/profile.php'

export default class userVM{

	static myInstance = null;
	_userID = '';


	@observable userProfile: any

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

	//@action
	load()
	{

		this.callAPI ()

	}
	
	getUser()
	{
		return this.userProfile
	}
	
	callAPI()
	{

		getResponseFromApi(profileAPI).then( (json ) =>{

			
			if( json.statusCode == 200)	
         	{
				console.log('profile API = ' + json.data.status)
				console.log('profile API = ' + json.data.result.user_id)
				this._userID = json.data.result.user_id
				

				this.userProfile = userModel.deserialize(json.data)

				//this.refArray.push(RecommendationModel.deserialize(json.data.feed.entry[i]))
         		
         		
         	}
         	else
         	{
         		//console.log('error ')
         	
         		
         	}

		})

	}

}