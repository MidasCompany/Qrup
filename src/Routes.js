import React, {Component} from 'react'
import {Text, View}from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login'
import Reader from './Reader'
import Register from './Register'
import Profile from './Profile'
import Products from './Products'
import ChoseCupons from './ChoseCupons'
import PickCupons from './PickCupons'
import About from './About'
import MainHistory from './History/MainHistory'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import EditProfile  from './EditProfile'
import EditPassword from './EditPassword'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';   
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage';

class Header extends Component {
  constructor (props){
    super(props);
    this.state={
        pontos: ''
    }
  }
   async componentDidMount(){
     this.setState({
       pontos: await AsyncStorage.getItem('@Qrup:u_points')
     })
   }
}
const EditNav = createStackNavigator({
    editProfile : {
      screen:EditProfile,
      headerMode:'none',
      title:'Editar Dados',
      navigationOptions:{
        headerVisible: false,
        headerShown: false
      }
    },
    EditPassword:{
      screen: EditPassword,
      headerMode:'none',
      title:'Editar Dados',
      navigationOptions:{
        headerVisible: false,
        headerShown: false
      }
    },
  },
  {initialRouteName : "editProfile"}
)

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

const ProfileNav = createStackNavigator({
        MainProf: {
          screen:Profile,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Perfil',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),
              marginTop: hp('4%'),
            },
          }
        },
        Qrups: {
          screen:Qrups,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Meus Qrups',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerBackImage:(<Icon2 name='angle-left' size={wp('10%')} color='white' />),
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),
              marginLeft: -wp('4%')
            },
          }
        },
        Edit:{
          screen: EditNav,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Editar Dados',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white' />),
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),
              marginLeft: -wp('4%')
            },
          }
        },
        About:{
          screen: About,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Me Ajuda',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white' />),
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),
              marginLeft: -wp('4%')
            },
          }
        }
    },{
      initialRouteName: 'MainProf',
    }

);

const cupon = createStackNavigator({
        Chose: {
          screen: ChoseCupons,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Cupons',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
            headerTitleStyle: {
              fontSize: wp('7%'),
            },
          }
        },
        Pick: {
          screen: PickCupons,
          navigationOptions:{
            headerTintColor: 'white',
            title: 'Cupons',
            headerStyle:{
              backgroundColor: '#01A83E',
              elevation: 0,
            },
            headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
            headerTitleContainerStyle:{
              justifyContent:'center'
            },
            headerTitleStyle: {
              fontSize: wp('7%'),            
              marginLeft: -wp('5%')
            },
          }
        }
      },
      {
        initialRouteName: 'Chose',
      }
);


const User = createMaterialTopTabNavigator(
        {
            Profile: { screen: ProfileNav,
                      navigationOptions: {
                          tabBarLabel: 'Perfil',
                          tabBarIcon:({tintColor}) => (<Icon name="md-person" color={tintColor} size ={wp('6%')} style={{alignSelf:'center'}}/>)
                      }
            },
            Cupons: { screen: cupon,
                        navigationOptions:{
                            tabBarLabel: 'Cupons',
                            title: 'Cupons',
                            tabBarIcon:({tintColor})=>(<Icon2 name='ticket-alt' size={wp('6%')} color={tintColor} style={{alignSelf:'center'}}/>)
                        } },
            MainHistory: { screen: MainHistory,
                        navigationOptions:{
                            tabBarLabel: 'Pontos',
                            title: "Meus Pontos",
                            tabBarIcon:({tintColor})=>(<Icon2 name="coins" size={wp('5%')} color={tintColor} style={{alignSelf:'center'}}/>)
                        }
                     },
          },
          {
            initialRouteName: 'Cupons',
            tabBarPosition: 'bottom',
            order: ['MainHistory','Cupons', 'Profile'],
            tabBarOptions:{
                activeTintColor: '#01A83E',
                inactiveTintColor: '#c4c4c4',
                style:{
                    backgroundColor: 'white',
                    //height: hp('7%')
                },
                labelStyle:{
                    fontSize: wp('2.5%'),
                    marginTop: -hp('0.6%')
                },
                indicatorStyle:{
                    height: 0,
                },
                iconStyle:{
                  alignSelf:'center',
                  width: wp('8%')
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
        headerBackImage:(<Icon2 name='angle-left' size={ wp('10%')} color='white'/>),
        headerTitleContainerStyle:{
          justifyContent:'center'
        },
        headerTitleStyle: {
          fontSize: wp('7%'),
          marginLeft: -wp('5%')
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