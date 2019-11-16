import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  

export default class Cupon extends Component {
    render() {
        return (
            <>
                <View style = {styles.main}>     
                    <Text style = {styles.title}>{this.props.local}</Text>
                    <View style = {styles.imageSim}></View>
                    <Text style = {styles.cost}>{this.props.cuponCost} Points</Text>
                    <Text style = {styles.cuponTitle}>{this.props.cuponTitle}</Text>
                    <Text style = {styles.description}>{this.props.cuponDescription}</Text>
                    <Text style = {{marginBottom: -wp('10%'), fontSize : wp('4%'), marginTop: wp('5%')}}>Cupom: </Text>
                    <Text style = {styles.cupon}>{this.props.cupon}</Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: wp('3,23606%')
    },
    cupon:{
        marginTop: wp('11,32621%'),
        fontSize: wp('12,94424%')
    }
})
