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

import { Rating } from 'react-native-ratings';

import Assets from 'tutorRN/src/view/ui/Assets';

const layout = require('tutorRN/src/Layout')
let starSize = 15


class Bars extends Component{
  constructor (props){
    super(props);
    var rating = [0,0,0,0,0]
    for ( var i = 0; i < this.props.data.length; i ++)
    {
      var t = rating[Number(this.props.data[i].rating) -1]
      t = t +1 
      rating [Number(this.props.data[i].rating) -1] = t
    }

    this.state = {rating : rating.reverse()}
  }

  voteBarFull (index)
  {
    var red = 250
    var green = 182 + (index *20)
    var blue = 16 + (index * 40)

    var width = (100*(this.state.rating[index]/ Math.max.apply(Math, this.state.rating) ) )+ '%'
    return {
      flex:1,
      width:width,
      //backgroundColor:'yellow', 
      height: 20,
      backgroundColor: 'rgba('+red+','+green+','+blue+',1)',
      borderColor: 'rgba('+red+','+green+','+blue+',1)',
      borderWidth: 0.5,
      borderRadius: 10,
    }
  }

  render() {
    var bars = []
    for ( var index = 0; index < this.state.rating.length ; index ++)
    {
      bars.push(
        <View 
          style = {styles.voteBG} 
          key = {index}
        >
          <Text style = {styles.voteCount}>
            {5 - index}
          </Text>
          <View style = {styles.voteBar} >
            <View style = {this.voteBarFull(index)} />
          </View>
        </View>
      )
    }
    return <View>{bars}</View>
  }
}

class TutorRatingBlock extends Component{

  constructor (props){
    super(props);

    this.arrowOnClick = this.arrowOnClick.bind(this)
    

    this.state = {
      barWidth:0,
      rating:[2,3,10,6,7],
      data :[
        {
          "id": "3",
          "user_id": "1",
          "tutor_id": "2",
          "rating": "3",
          "create_date": "2019-05-30 11:32:30"
        },
        {
          "id": "5",
          "user_id": "1",
          "tutor_id": "4",
          "rating": "1",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "6",
          "user_id": "1",
          "tutor_id": "3",
          "rating": "2",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "7",
          "user_id": "1",
          "tutor_id": "4",
          "rating": "5",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "8",
          "user_id": "1",
          "tutor_id": "5",
          "rating": "5",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "9",
          "user_id": "1",
          "tutor_id": "6",
          "rating": "2",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "10",
          "user_id": "1",
          "tutor_id": "7",
          "rating": "2",
          "create_date": "2019-06-14 14:43:10"
        },
        {
          "id": "11",
          "user_id": "1",
          "tutor_id": "8",
          "rating": "1",
          "create_date": "2019-06-14 14:43:10"
        }

      ]  
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

    var total = 0 
    for (var i = 0 ;i< this.state.data.length; i++)
    {
      total = total + Number(this.state.data[i].rating)
      
    }
    var avg = total / this.state.data.length
    console.log('avg = ' + avg)

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
                {
                  <Rating
                    type="star"
                    fractions={1}
                    startingValue={avg}
                    readonly
                    showRating
                    imageSize={25}
                    ratingTextColor="black"
                    onFinishRating={this.ratingCompleted}
                    style={{ paddingVertical: 10 }}
                  />
                } 
              </View>
              <View style = {styles.overallBG}>
                <Bars 
                  data = {this.state.data}
                />
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

    //backgroundColor: 'red',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  overallBG:{
    flex:3,   //5
    
    //backgroundColor: 'green',
    flexDirection:'column',
    //justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },

  averageMark:{
    flex:1,

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


