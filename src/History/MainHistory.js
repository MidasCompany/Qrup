import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import AllHistory from './AllHistory'
import UsedHistory from './UsedHistory'
import WonHistory from './WonHistory'
import { createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'  

const History = createAppContainer(
createMaterialTopTabNavigator({
        Todos: AllHistory,
        Ganhos: WonHistory,
        Usados: UsedHistory
    },{
    tabBarOptions:{
        activeTintColor: 'white',
        style:{
            backgroundColor: '#01A83E',
            height: hp('7%')
        },
        labelStyle:{
            fontSize: wp('3.5%'),
            marginTop: -10,
            fontWeight:'bold'
        },
        indicatorStyle:{
            backgroundColor: '#ffffff',
            height: wp('1%'),
        },
        showIcon: true,
    }
    })
)

export default class MainHistory extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            points: ''
        }
      };
    async componentDidMount(){
        this.setState({
            points: await AsyncStorage.getItem('@Qrup:u_points')
        })
    }
  render() {
    return (
        <>
            <View style = {{backgroundColor: '#01A83E', alignItems: 'center'}}>
                <Text style={{marginTop:wp('4%'), fontSize:wp('5%'), color:'white'}}>Meus Pontos</Text>
                 <Text style={{color:'white', marginTop:wp('1%'), fontSize:wp('4%'), marginBottom:-wp('1%')}}>{this.state.points} Pontos</Text>
            </View>
            <History/>
        </>
    )
  }
}
