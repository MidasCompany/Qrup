import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import qrup from '../Images/qrup_semroda_semsombra.png'
import exit from '../Images/exitIco.png'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default class Point extends Component {
    render() {
        return (
            <View style = {styles.Cabeça}>
                <Image  source = {qrup} style = {styles.Qrup}/>
                <Text style = {styles.Titulo}>Points </Text>
                <Image source = {exit} style = {styles.Exit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Cabeça:{
        height: hp('6%'),
        width: wp('100%'),
        backgroundColor: '#677D35',
        alignContent: 'center',
        alignItems: 'center',
    },
    Qrup:{
        marginTop: -wp('2%'),
        height: hp('8%'),
        width: wp('5%'),
        marginRight: wp('90%')
    },
    Titulo:{
        marginTop: -wp('12%'),
        fontSize: wp('5%'),
    
    },
    Exit:{
        height: hp('3%'),
        width: wp('6%'),
        marginTop: -wp('7%'),
        marginStart: wp('90%'),
        resizeMode: 'stretch'
    }
})
