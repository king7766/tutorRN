import {chatModel} from 'tutorRN/src/Model/chatModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

import * as Urlconfig from 'tutorRN/src/URLConfig'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

export default class chatVM{

	static myInstance = null;

	//userProfile: any
	//@observable refArray = []
	refArray = []
	sender_id = null
	receiver_id = null
	master_id = ''
	chat_master = null

	static getInstance() {

        if (chatVM.myInstance == null) {	
            chatVM.myInstance = new chatVM()
        }
        return chatVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		//this.load()
	}

	async getUpdateToken()
	{
		return await this.callAPI()
	}

	addChat(message)
	{
		
		C.getResponseFromApi(E.ADD_CHAT, 'POST', {token:'xRW8DwqoIxZBSlF83b2P', sender_id:sender_id, master_id:this.master_id, message:message} ).then( (json ) =>{

		})
	}

	getChat()
	{
		return this.refArray
	}

	getChatRoomDetail()
	{
		return this.chat_master
	}

	async setUpInstance(s_id, r_id)
	{
		sender_id = s_id
		receiver_id = r_id
	
		return await this.callAPI()
	}

	
	async callAPI()
	{	
		
		if ( sender_id == null || receiver_id == null)
		{
			return
		}
			
		this.refArray = []
		
		return await C.getResponseFromApi(E.GET_CHAT, 'POST', {token:'xRW8DwqoIxZBSlF83b2P', sender_id:sender_id, receiver_id:receiver_id} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				this.chat_master = json.data.chat_master
				this.master_id = json.data.chat_master.id

				console.log('chat_master = ' + JSON.stringify(this.chat_master, null, 2) )
			
				for ( var i = 0; i < json.data.chat_history.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					this.refArray.push(chatModel.deserialize( json.data.chat_history[i] ) )						
				}
				
         	}
         	else
         	{
             		
			}

			return this.chat_master.update_token
			 
			
		})
		
	}
}