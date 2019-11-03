import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from './Profile';
import Point from './Point';
import Products from './Products'
import Reader from './Reader'
const TabNavigator = createBottomTabNavigator({
  Profile: Profile,
  Point: Point,
  Products: Products,
});

export default createAppContainer(TabNavigator);