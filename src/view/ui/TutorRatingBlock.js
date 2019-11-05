import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';

const layout = require('tutorRN/src/Layout')
let starSize = 15

class TutorRatingBlock extends Component{

  constructor (props){
    super(props);

    this.arrowOnClick = this.arrowOnClick.bind(this)
    
    this.state = {
      barWidth:0,
      rating:[2,3,10,6,7],
      
    }

  }
  componentWillMount(){
    this.mounted = true
  } 

  arrowOnClick (index)
  {
    console.log('arrowOnClick = ' + index)
    //this.props.onClicked(index)
  }

  voteBarFull (index)
  {
    var red = 250
    var green = 182 + (index *20)
    var blue = 16 + (index * 40)
    
    return {
      flex:1,
      width:this.state.barWidth * (this.state.rating[index]/ Math.max.apply(Math, this.state.rating)), 
      //backgroundColor:'yellow', 
      height: 20,
      backgroundColor: 'rgba('+red+','+green+','+blue+',1)',
      borderColor: 'rgba('+red+','+green+','+blue+',1)',
      borderWidth: 0.5,
      borderRadius: 10,
    }
    
    
  }


  measureView(event)
  {
    console.log('width: ', event.nativeEvent.layout.width)
    this.setState({
      barWidth: event.nativeEvent.layout.width
    })
  }

  starShowingBG()
  {
    var total = 0
    for ( var i = 0 ; i< this.state.rating.length; i ++)
    {
      total = total + this.state.rating[i]
    }
      
    return{
      //flex:1,
      flexDirection: 'row',
      height: starSize,
      //width: (starSize*5) * (0.7 ),
      backgroundColor: 'rgba(240,152,56,1)'
    }
  }

  viewOnClicked()
  {
    console.log('viewOnClicked')
    this.props.viewOnClicked()
  }

  render (){

    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    var dataSource= ds.cloneWithRows(this.state.rating)


    return(

      <TouchableHighlight
          onPress={ ()=>this.viewOnClicked()}
      >
        
      
      <View style = {styles.background}>
        
        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag-1)}
          >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/image/left_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
        }
        
          <View style = {styles.ratingBG}>
            <View style = {styles.averageBG}>
              <Text style = {styles.averageMark}>
                4.4
              </Text>
              
              <View
                style = {this.starShowingBG()}
              >
              {
                this.state.rating.map((item, index) =>
                  <Image 
                    key = {index}
                    source={require('tutorRN/image/star-503.png')} 
                    style={{width: starSize, height: starSize}} />
                )
              }
              
              </View>
            </View>
            <View style = {styles.overallBG}>
            {
              this.state.rating.map((item, index) =>
                <View 
                  style = {styles.voteBG} 
                  key = {index}
                >
                  <Text style = {styles.voteCount}>
                      {5 - index}
                  </Text>

                  <View 
                    ref = '_voteBar'
                    style = {styles.voteBar} 
                    onLayout={(event) => this.measureView(event)}
                  >
                    <View style = {this.voteBarFull(index)} />
                  </View>

                </View>
              )
            }
            </View>
          </View>
        
        

        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag+1)}
            >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/image/right_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
        }
        
      </View>
      </TouchableHighlight>
      
      )
  }
}

/*
<Text style = {styles.voteCount}>
                    {rowData}
                  </Text>
                  <View style = {styles.voteBar} >
                  </View>
                  */
TutorRatingBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorRatingBlock;

const styles = StyleSheet.create ({

  background :{
    flexDirection:'row',
    width: layout.deviceWidth,
    height: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5
  },

  ratingBG:{
    flex:8,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  averageBG:{
    flex:2,  //5
    height: 130,
    //backgroundColor: 'red',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  overallBG:{
    flex:3,   //5
    height: 130,
    //backgroundColor: 'green',
    flexDirection:'column',
    //justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },

  averageMark:{
  

    fontSize: 40,
  },

  ratingStarShowing:{
      height:starSize,
      width:starSize *5

   },

  voteBG:{
    //backgroundColor:'red',
    padding: 5,
    flexDirection: 'row',
    height: 20,
    width: '100%',
    //justifyContent: 'space-between',
    //alignItems: 'center',
  },

  voteCount:{
    flex :1,
    height: 15,


  },
  voteBar:{
    flex:7,
    height: 15,
    backgroundColor: 'rgba(242,242,242,1)',
    borderColor: 'rgba(242,242,242,1)',
    borderWidth: 0.5,
    borderRadius: 10,
    //width: '70%',
  }
})


