import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login'
import Reader from './Reader'
import Register from './Register'
import Profile from './Profile'
import Products from './Products'
import ChoseCupons from './ChoseCupons'
import PickCupons from './PickCupons'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';   
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'

const cupon = createStackNavigator({
        Chose: ChoseCupons,
        Pick: PickCupons
      },
      {
        initialRouteName: 'Chose',
        headerMode: 'none',
        navigationOptions: {
         headerVisible: false,
      }
      }
);

const Qrups = createStackNavigator (
        {
        Qrup : Products,
        Add : Reader
        },{
                initialRouteName: 'Qrup',
                headerMode: 'none',
                navigationOptions:{
                        headerVisible: false
                }
        }
);

const User = createMaterialTopTabNavigator(
        {
            Profile: { screen: Profile,
                    navigationOptions: {
                        tabBarLabel: 'Profile',
                        tabBarIcon:({tintColor}) => (<Icon name="md-person" color={tintColor} size ={wp('6%')}/>)
                    }
            },
            Cupons: { screen: cupon,
                        navigationOptions:{
                            tabBarLabel: 'Cupons',
                            tabBarIcon:({tintColor})=>(<Icon2 name='ticket-alt' size={ wp('5%')} color={tintColor} />)
                        } },
            Products: { screen: Qrups,
                        navigationOptions:{
                            tabBarLabel: 'Qrups',
                            tabBarIcon:({tintColor})=>(<Icon3 name="cup" size={wp('5%')} color={tintColor}/>)
                        }
                     },
          },
          {
            initialRouteName: 'Products',
            tabBarPosition: 'bottom',
            order: ['Cupons', 'Products', 'Profile'],
            tabBarOptions:{
                activeTintColor: 'white',
                inactiveTintColor: '#a9a9a9',
                style:{
                    backgroundColor: '#006300',
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
const Main = createStackNavigator(
  {
    Login: Login,
    Register: Register
  },{
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
     headerVisible: false,
    }
  }  
);
export default createAppContainer (
        createSwitchNavigator({
          Login: Main,
          User: User
        },
        {
          initialRouteName: 'Login',
          headerMode: 'none',
          navigationOptions: {
           headerVisible: false,
          }
        }
        )
);