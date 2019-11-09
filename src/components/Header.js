import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import qrup from '../../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
Exit =()=>{
    this.props.navigation.navigate('Login');
}
export default class Header extends Component {
    render() {
        return (
            <View>                
                <View style = {styles.Cabeca}>
                    <Image  source = {qrup} style = {styles.Qrup}/>
                    <Text style = {styles.Titulo}> {this.props.title} </Text>
                    <TouchableOpacity onPress = {()=>this.Exit()}>
                            <Icon name ='ios-exit' color = 'white' style = {styles.Exit}/>  
                    </TouchableOpacity>  
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
        marginStart: wp('2%')
    },
    Titulo:{
        fontSize: wp('5%'),
    },
    Exit:{
        fontSize: wp('10%'),
        marginEnd: wp('2%')
    },
})
