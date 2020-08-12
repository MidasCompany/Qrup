import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, ToastAndroid} from 'react-native'
import {Button} from 'react-native-elements'
import Icon2 from  'react-native-vector-icons/MaterialIcons'
import {FloatingAction} from 'react-native-floating-action'
import AsyncStorage from '@react-native-community/async-storage'  
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
import api from '../services/api';
import LoadingScreen from '../components/LoadingScreen';
import Icon from 'react-native-vector-icons/Octicons'
const DATA =[
  {
      points:'5',
      mode: 'add',
      company:{
        name:'Midas'
      }
  },
  {
    points:'5',
    mode: 'remove',
    company:{
      name:'Midas'
    }
},
]; 
export default class AllHistory extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      user_id:'',
      token:'',
      pointHistory: '',
      refreshing: false,      
      will_update: null,
    }
  };
  async loadHistory (){
    try{
      const response = await api.get('/historic?user_id='+this.state.user_id,
      {
          headers:{
              Authorization : "Bearer " + this.state.token
          }
      }) ;
      this.setState({pointHistory: response.data.data.filter(cupon=>cupon.mode==='rem'), refreshing:false})
  } catch (response){
      //this.setState({errorMessage: response.data.error });     
      this.setState({load:false, refreshing:false})
      ToastAndroid.showWithGravityAndOffset(
          'Problema para carregar o Histórico',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
      );
  }
  }
  async componentDidMount(){
    this.setState({
      user_id:  await AsyncStorage.getItem('@Qrup:u_id'),
      token: await AsyncStorage.getItem('@Qrup:token')
    })
    this.state.will_focus = this.props.navigation.addListener('willFocus', async () =>(this.loadHistory()))
  }
  handleRefresh = ()=>{
    this.setState({
        refreshing: true
    })
    this.loadHistory()
}
  async componentWillUnmount(){
    this.state.will_focus.remove(); 
  } 

  render() {
    return (
      <>
         <View style ={{backgroundColor: '#f5f5f5', height: hp('76%')}}>
         {this.state.pointHistory ? (
            <Text style = {{alignSelf:'center', marginTop:hp('2%')}}> Você ainda não gastou pontos</Text>
          ): <></>}
          <FlatList
              //data={this.state.pointHistory}
              data = {this.state.pointHistory}
              renderItem={({ item }) =>   <View style = {styles.main}> 
                                              <View style = {styles.terte}>
                                                  <View style = {styles.stats}>
                                                      <Text style = {{marginTop: -wp('1%'), fontSize: wp('5%')}}>{item.company.name}</Text>
                                                  </View>
                                                  <View style = {{flexDirection: 'row', marginHorizontal:wp('2%')}}>
                                                    <Text style = {{fontSize: wp('4%'), marginRight: wp('6%')}}>{item.points} Ponto</Text>
                                                    <Icon name= 'primitive-dot' size ={wp('7%')} style ={(item.mode === 'add' ? styles.add : styles.remove )}/>
                                                  </View>
                                              </View>
                                          </View> }
              keyExtractor={item => item.qr}                                      
              refreshing = {this.state.refreshing}
              onRefresh ={this.handleRefresh}   
          />
        </View>  
      </>
    );
  }
}

const styles = StyleSheet.create({
  terte:{
      backgroundColor: 'red',
      fontSize: 20
  },   
  main:{
      marginTop: wp('2%'),
      backgroundColor: '#fff',
      height: hp('8%'),
      width: wp('85%'),
      borderRadius: wp('1%'),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      elevation: wp('1%'),
      marginBottom: hp('2%')
  },
  title:{
      marginTop: wp('2%'),
      fontSize: wp('5%')
  },
  description:{
      //marginStart: wp('20%'),
      alignSelf: 'center',
      fontSize: wp('3,23606%'),
  },
  terte:{
      flexDirection: 'row',
      alignItems: 'center',
  },
  stats:{
      marginLeft: wp('4%'),
      flexGrow: 1,
      width:0,
  },
  add:{
    color: 'green',
    marginRight: wp('3%')
  },
  remove:{
    color: 'red',    
    marginRight: wp('3%')
  }
})