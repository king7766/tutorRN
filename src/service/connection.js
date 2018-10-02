
const token = 'xRW8DwqoIxZBSlF83b2P'
 

function parseParams ( params ){

    var dataString = ''

    const Str = JSON.stringify(params)
    JSON.parse(Str, (key, value)=> {
        if( key.length > 0 ){
            var s = key + '=' + value + '&'
            dataString = dataString + s
        }
    })

    console.log('parseParams = ' + dataString)

    return dataString;

}
 
export function getResponseFromApi( url, method, params )
{
    console.log('getResponseFromApi = ' + url + ' : '+ method + ' ' + params)
    
    var dataString = parseParams(params)

    if ( method === 'POST')
    {
        return fetch(url,  {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : dataString,
            //body: "token=xRW8DwqoIxZBSlF83b2P",    
            //body: params,
        })
            .then(async (response) => {
                const statusCode = await response.status;
                const data = await response.json();
                return Promise.all([statusCode, data]);
            })
            .then(res => {  
                
                return {statusCode:res[0], data:res[1]} 
            }) 
            .then(json => { 
                console.log("POST reponse :", json);
                return json;
            })
            .catch(error => {
    
                console.log ('error = ' + error);
                return {error: error};
            })
           
        
    } 
    else{
        
        return fetch(url, {
            method:'GET'
        })
        .then(async (response) => {
            const statusCode = await response.status;
            const data = await response.json();
            return Promise.all([statusCode, data]);
        })
        .then(res => {  

            return {statusCode:res[0], data:res[1]} 
        }) 
        
        .then(json => { 
            console.log("GET reponse :", json);
            return json;
        })
        .catch(error => {
            console.log ('error = ' + error);
            return {error: error};
        });
    }
}

function getRequest( url, params )
{
   
    console.log('url = ' + url )

    return fetch(url)
    .then(async (response) => {
        const statusCode = await response.status;
        const data = await response.json();
        return Promise.all([statusCode, data]);
    })
    .then(res => {  
 
        return {statusCode:res[0], data:res[1]} 
        //return {statusCode:res[0], data:res[1]} 
    }) 
    
    .then(json => { 
        console.log("reponse :", json);
        return json;
    })
    
    .catch(error => {

        console.log ('error = ' + error);x``
    });

    /*
    console.log('getRequest : ' + url)
    return fetch(url)
    .then(async (response) => {
        const statusCode = await response.status;
        const data = await response.json();
        return Promise.all([statusCode, data]);
    })
    .then(res => {  
        
        return {statusCode:res[0], data:res[1]} 
    }) 
    .then(json => { 
           console.log("getRequest reponse :", json);
        return json;
    })
      .catch(error => {
        console.log ('getRequest error = ' + error);
        return { name: "網絡不穩定，請稍後再試", description: "" };
        }
    );
    */
}

async function postRequest (url, params )
{
    console.log('postRequest')
    fetch('http://laravel50.com/admin/add', {

        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                'token': 'xRW8DwqoIxZBSlF83b2P'
             })
         })
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
         })
         .done();

}