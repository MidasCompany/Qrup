import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Profile from './Profile';
import Point from './Point';
import Products from './Products'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Feather'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; 

const TabNavigator = createBottomTabNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon name='md-person' size={ wp('8,09015%')} color={tintColor} />
      )
    }),
  },
  Point: {
    screen:Point,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon2 name='coins' size={ wp('8,09015%')} color={tintColor} />
      )
    }),
  },
  Products: {
    screen:Products,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <Icon3 name='box' size={ wp('8,09015%')} color={tintColor} />
      )
    }),
  },
},{
  tabBarOptions:{
    inactiveTintColor: '#F2F2F2',
    activeTintColor: '#B9B5B5',
    activeBackgroundColor: '#677D35',
    inactiveBackgroundColor: '#677D35',
    showLabel: false,
    showIcon:true
  }
}
);

export default createAppContainer(TabNavigator);