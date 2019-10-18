import { Alert } from 'react-native';
import strings from 'tutorRN/src/service/strings'

export default class alert{

    static myInstance = null;
    
    isAlertVisible = false;

	static getInstance() {

        if (alert.myInstance == null) {	
            alert.myInstance = new alert()
        }
        
        return alert.myInstance
    }

    constructor() {
        
        // 初始状态
        this.showAlert = this.showAlert.bind(this)
        
    }

    showAlert( info )
    {
        console.log('showAlert ' +info)
        //console.log(this.isAlertVisible)

        if ( this.isAlertVisible == true )
        {
            return ;
        }

        // Warning message     
        
        if (info.message )
        {
            
            this.isAlertVisible = true
    
            Alert.alert(
                info.title ? info.title : strings.warning , 
                info.message, 
                [
                    {
                        text: strings.confirm, onPress: () => {

                            this.isAlertVisible = false 
                        }
                    },
                    
                ], { cancelable: false }
            );

            return
        }

        /*
        var newArr = Object.keys(info);
        var mappedArr = newArr.map(function(i) {
            return [i, info[i]];
        });
        console.log('Arry = '+mappedArr.count );
        */

        if ( info.error.message )
        {
            this.isAlertVisible = true

            var errorString = info.error.message
            Alert.alert( strings.errorTitle , errorString, [
                {
                    text: strings.confirm, onPress: () => {
                        this.isAlertVisible = false 
                        //strings.setLanguage('zh');
                        //console.log(strings.errorTitle)
                        //console.log(strings.home)
                    }
                }
            ], { cancelable: false });
        }
        else if ( info.error)
        {
            this.isAlertVisible = true

            var errorString = info.error
            Alert.alert( strings.errorTitle , errorString, [
                {
                    text: strings.confirm, onPress: () => {
                        this.isAlertVisible = false 
                        //strings.setLanguage('zh');
                        //console.log(strings.errorTitle)
                        //console.log(strings.home)
                    }
                }
            ], { cancelable: false });
        }
        else 
        {

        }

    }

}

