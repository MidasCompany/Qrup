import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login'
import Profile from './Profile'
import Root from './Root'


const App = createStackNavigator({
          Login: Login,
          User: Root,
        },
        {
          initialRouteName: 'Login',
          headerMode: 'none',
         navigationOptions: {
             headerVisible: false,
    }
        }
);

export default createAppContainer(App);