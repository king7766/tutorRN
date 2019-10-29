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
	//@observable refLocations: locationModel [] = []

	@observable refLocations = []

	//refLocationArray = []

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

	getDistrictIdByLocationId(location_Index)
	{
		for ( var i = 0 ; i < this.refDistrictArray.length ; i++ )
		{
			for ( var j = 0 ; j < this.refDistrictArray[i].location_list.length; j ++){		
				if ( location_Index == this.refDistrictArray[i].location_list[j].id)
				{
					return this.refDistrictArray[i].id
				}
			}
		}
	}

	setupLocationArray ()
	{
		var locationArray = []
		for ( var i = 0 ; i < this.refDistrictArray.length; i ++ )
		{	
			for ( var j = 0 ; j < this.refDistrictArray[i].location_list.length; j ++ )
			{
				locationArray.push(this.refDistrictArray[i].location_list[j])
			}
		}

		this.refLocations = locationArray
		return this.refLocations
	
	}

	getLocationName()
	{
		var names = []
		for (var i = 0; i < this.refLocations.length; i ++)
		{
			names.push(this.refLocations[i].location_name)
		}
		return names
	}

	getLocationIdByName (name)
	{
		for ( var i = 0; i < this.refLocations.length; i ++)
		{
			if ( this.refLocations[i].location_name == name)
			{
				return this.refLocations[i].id
			}
		}
	}

	getLocationNameById (location_index)
	{
		for ( var i = 0; i < this.refLocations.length; i ++)
		{
			if ( this.refLocations[i].id == location_index)
			{
				return this.refLocations[i].location_name
			}
		}
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
		C.getResponseFromApi(E.GET_LOCATION, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					
					this.refDistrictArray.push(districtModel.deserialize( json.data[i] ) )						
				}

				this.setupLocationArray()
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