import { 
   
   Alert
   
} from 'react-native';

//export const BASE_URL = 'https://itunes.apple1.com/hk/';  // prod server

//export const topfreeURL = '${BASE_URL}/rss/topfreeapplications/limit=100/json';

//export const topURL = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json';

//export const topGrossURL = 'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json'

//export const applicationDetailAPI = 'https://itunes.apple.com/hk/lookup?id='

export const HI = 'https://itunes.apple1.com/hk/rss/topfreeapplications/limit=100/json';


export async function getResponseFromApi (input_url){
    
    console.log('URL = ' + input_url)

    return fetch(input_url)
        .then(async (response) => {
    	    const statusCode = await response.status;
            const data = await response.json();
            return Promise.all([statusCode, data]);
        })
        .then(res => {  
            
            return {statusCode:res[0], data:res[1]} 
        }) 
        .then(json => { 
       	    console.log("reponse :", json);
            return json;
        })
      	.catch(error => {

            console.log ('error = ' + error);
   
            /*
            Alert.alert(
                '網絡不穩定，請稍後再試',
                '',
                [{
                    text: '重試', onPress: () => 

                    getResponseFromApi(input_url)
                }],

                { cancelable: false }
            );
         	*/
         	return { name: "網絡不穩定，請稍後再試", description: "" };
    	}
    );
}
