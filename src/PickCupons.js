import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import AsyncStorage from '@react-native-community/async-storage'  
import Cupon from './components/Cupon'
export default class PickCupons extends Component {
    Exit =async()=>{
        await AsyncStorage.setItem('@User','' )
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
        <>
            <View style = {styles.Cabeca}>
                <Image  source = {qrup} style = {styles.Qrup}/>
                <Text style = {styles.Titulo}> Cupons </Text>
                <TouchableOpacity onPress = {()=>this.Exit()}>
                        <Icon name ='ios-exit' color = 'white' style = {styles.Exit}/>  
                </TouchableOpacity>  
            </View>
            <Cupon
                local = 'Retiro da Sé'
                cuponTitle = '10% de desconto'
                cuponDescription = 'Cupon só pode ser utilizado quando nevar em Belém'
                cuponCost = '10'
                cupon = 'Retiro10'
            />
        </>
        )
    }
}

const styles = StyleSheet.create({
    Cabeca:{
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('100%'),
        backgroundColor: '#3a5108',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Qrup:{
        height: hp('7%'),
        width: wp('7%'),
        marginStart: -wp('3,23606%'),
        resizeMode: 'contain',
        //backgroundColor: 'white'
    },
    Titulo:{
        fontSize: wp('4,85409%'),
        color: 'white'
    },
    Exit:{
        fontSize: wp('10%'),
        marginEnd: wp('3,23606%')
    },
})
