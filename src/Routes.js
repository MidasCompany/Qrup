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
import AllHistory from './History/AllHistory'
import UsedHistory from './History/UsedHistory'
import WonHistory from './History/WonHistory'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';   
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'

const History = createMaterialTopTabNavigator({
        Todos: AllHistory,
        Ganhos: UsedHistory,
        Usados: WonHistory
    },{
      initialRouteName: 'Todos',
      tabBarOptions:{
        activeTintColor: 'white',
        style:{
            backgroundColor: '#01A83E',
            height: hp('7%')
        },
        labelStyle:{
            fontSize: wp('3.5%'),
            marginTop: -wp('2%'),
            fontWeight:'bold'
        },
        indicatorStyle:{
            backgroundColor: '#ffffff',
            height: wp('1%'),
        },
        showIcon: true,
    }
})

const ProfileNav = createStackNavigator({
        MainProf: {
          screen:Profile,
          navigationOptions:{
            headerVisible: false,
            headerShown: false
          }
        },
        History: {
          screen:History,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Histórico',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white' style = {{marginLeft: wp('2%'), marginTop:wp('5%')}} />),
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),
              marginTop: wp('5%'),
              marginLeft: -wp('4%')
            },
          }
        }
    },{
      initialRouteName: 'MainProf',
    }

);

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
            Profile: { screen: ProfileNav,
                      navigationOptions: {
                          tabBarLabel: 'Perfil',
                          title: 'Perfil',
                          tabBarIcon:({tintColor}) => (<Icon name="md-person" color={tintColor} size ={wp('6%')}/>)
                      }
            },
            Cupons: { screen: cupon,
                        navigationOptions:{
                            tabBarLabel: 'Cupons',
                            title: 'Cupons',
                            tabBarIcon:({tintColor})=>(<Icon2 name='ticket-alt' size={ wp('5%')} color={tintColor} />)
                        } },
            Products: { screen: Qrups,
                        navigationOptions:{
                            tabBarLabel: 'Qrups',
                            title: "Meus Qrup's",
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
                inactiveTintColor: '#004832',
                style:{
                    backgroundColor: '#01A83E',
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
            shifting: true,
          }
);
const Main = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions:{
        headerVisible: false,
        headerShown: false
      }
    },
    Register: {
      screen: Register,
      navigationOptions:{
        headerTintColor: 'white',
        title: 'Cadastro',
        headerStyle:{
          backgroundColor: '#01A83E',
          elevation: 0,
        },
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white' style = {{marginLeft: wp('2%'), marginTop:wp('5%')}} />),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('7%'),
          marginTop: wp('5%'),
          marginLeft: -wp('4%')
        },
      }
    },
  },{
    initialRouteName: 'Login',
    
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