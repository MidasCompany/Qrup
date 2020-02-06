import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Profile from './Profile'
import Products from './Products'
import Point from './Point'
import Icon from 'react-native-vector-icons/Ionicons'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'; 
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'

export default createMaterialTopTabNavigator(
    {
        Profile: { screen: Profile,
                navigationOptions: {
                    tabBarLabel: 'Profile',
                    tabBarIcon:({tintColor}) => (<Icon name="md-person" color={tintColor} size ={wp('6%')}/>)
                }
        },
        Library: { screen: Point,
                    navigationOptions:{
                        tabBarLabel: 'Cupons',
                        tabBarIcon:({tintColor})=>(<Icon2 name='ticket-alt' size={ wp('5%')} color={tintColor} />)
                    } },
        History: { screen: Products,
                    navigationOptions:{
                        tabBarLabel: 'Qrups',
                        tabBarIcon:({tintColor})=>(<Icon3 name="cup" size={wp('5%')} color={tintColor}/>)
                    }
                 },
      },
      {
        initialRouteName: 'Profile',
        tabBarPosition: 'bottom',
        tabBarOptions:{
            activeTintColor: 'white',
            inactiveTintColor: '#a9a9a9',
            style:{
                backgroundColor: '#3a5108',
                height: hp('7%')
            },
            labelStyle:{
                fontSize: wp('2.5%'),
                marginTop: -wp('1%')
            },
            indicatorStyle:{
                backgroundColor: '#ffffff',
                height: wp('1%'),
            },
            showIcon: true,
        },
        shifting: true
      }
    );