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
    state= {
        pontos: this.props.navigation.state.params
    }
    render() {        
        return (
        <>         
            <View style = {styles.main}>     
                <Text style = {styles.title}>Retiro da Sé</Text>
                <View style = {styles.imageSim}></View>
                <Text style = {styles.cost}>10 Points</Text>
                <Text style = {styles.cuponTitle}>10% de Desconto na Coca</Text>
                <Text style = {styles.description}>10% de Desconto na Coca, valido pra quando o Arnaldo perceber que ele é foda de mais</Text>
                <Text style = {{marginBottom: -wp('10%'), fontSize : wp('4%'), marginTop: wp('5%')}}>Cupom: </Text>
                <Text style = {styles.cupon}>RetiroCoca10Naldo</Text>
                <TouchableOpacity></TouchableOpacity>
            </View>
            <Text>{this.state.pontos}</Text>
        </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageSim:{
        width: wp('76,04741%'),
        height: hp('16,1803%'),
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        borderRadius: wp('5%')
    },
    title:{
        marginTop: wp('4,85409%'),
        fontSize: wp('9,70818%')
    },
    cost: {
        marginTop: wp('4,85409%'),
        fontSize: wp('6,47212%')
    },
    cuponTitle:{
        marginTop: wp('3,23606%'),
        fontSize: wp('4,85409%'),
    },
    description:{
        marginTop: wp('3,23606%'),
        fontSize: wp('3,23606%'),
        paddingHorizontal: wp('2%'),
        alignSelf:'center',
    },
    cupon:{
        marginTop: wp('11,32621%'),
        fontSize: wp('8%')
    }
})
