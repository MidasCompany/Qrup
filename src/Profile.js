import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        Image,    
        TouchableOpacity
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'  
export default class Profile extends Component {
    state={
        user:''
    }
    async componentDidMount(){
    this.setState ({
        user: await AsyncStorage.getItem('@User')
    })
    }
    Exit =async()=>{
        await AsyncStorage.setItem('@User','' )
        this.props.navigation.navigate('Login');
    }
    render() {    
        return (
            <View >
                <View style = {styles.Cabeca}>
                    <Image  source = {qrup} style = {styles.Qrup}/>
                    <Text style = {styles.Titulo}> Points </Text>
                    <TouchableOpacity onPress = {()=>this.Exit()}>
                            <Icon name ='ios-exit' color = 'white' style = {styles.Exit}/>  
                    </TouchableOpacity>  
                </View>
                <View style= {styles.Perfil}>
                    <Icon2 name = 'user-circle-o'color ='#677D35' style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>{this.state.user}</Text>
                    <Text style= {styles.pontDesgr}> 21312 Pontos</Text>
                </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    Cabeca:{
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('100%'),
        backgroundColor: '#677D35',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Qrup:{
        //marginTop: -wp('2%'),
        height: hp('8%'),
        width: wp('5%'),
        marginStart: wp('3,23606%')
    },
    Titulo:{
        fontSize: wp('4,85409%'),
    },
    Exit:{
        fontSize: wp('10%'),
        marginEnd: wp('3,23606%')
    },
    Perfil:{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
    Disgraca:{ 
        marginTop: wp('20%'),
        marginTop: wp('10%'),
        fontSize: wp('35%'),
    },
    nameDesg:{
        marginTop:wp('10%'),
        fontSize: wp('6%'),
    },
    pontDesgr:{
        fontFamily:'Roboto',
        marginTop: wp('5%')
    }
})
