import {locationModel} from 'tutorRN/src/Model/locationModel'
import {districtModel} from 'tutorRN/src/Model/districtModel'

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


export default class locationVM{

	static myInstance = null;

	//userProfile: any
	//@observable refArray = []
	@observable refDistrictArray: districtModel [] = []
	@observable refLocationArray: locationModel [] = []

	static getInstance() {

        if (locationVM.myInstance == null) {	
            locationVM.myInstance = new locationVM()
        }
        return locationVM.myInstance
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

	getFullList ()
	{
		return this.refDistrictArray;
	}

	getDistrict()
	{
		var districtArray = []
		for ( var i = 0 ; i < this.refDistrictArray.length ; i++ )
		{
			districtArray.push( {id:this.refDistrictArray[i].id, district_name: this.refDistrictArray[i].district_name} )
		}
		return districtArray;
	}

	getLocationListFromDistrict( districtIndex )
	{
		//var selectedNewsItem = this.refDistrictArray[this.refDistrictArray.id.map(function (item) { return item.location_list; }).indexOf(districtIndex)];

		//var selectedNewsItem = this.refArray[this.refArray.map(function (item) { return item.id; }).indexOf(newsID)];
		var item = this.refDistrictArray[districtIndex].location_list;
		return item;

	
	}

	getLocation ()
	{
		var locationArray = []
		for ( var i = 0 ; i < this.refDistrictArray.length; i ++ )
		{	
			for ( var j = 0 ; j < this.refDistrictArray[i].location_list.length; j ++ )
			{
				locationArray.push(this.refDistrictArray[i].location_list[j])
			}
		}

		return locationArray
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
		C.getResponseFromApi(E.get_location, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					
					//console.log(json.data[0])
					this.refDistrictArray.push(districtModel.deserialize( json.data[i] ) )						
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