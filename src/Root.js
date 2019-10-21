import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from './Profile';

const TabNavigator = createBottomTabNavigator({
  Profile: Profile,

});

export default createAppContainer(TabNavigator);