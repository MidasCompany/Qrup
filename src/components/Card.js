import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Card extends Component {
    render() {
        return (
        <>
            <TouchableOpacity style = {styles.main}>
                <Text style = {styles.title}>{this.props.title} </Text>
                <View style = {styles.descCont}>
                    <Text style = {styles.description}> {this.props.description} </Text>
                </View>
                <Text style = {styles.cost}>{this.props.points} Points</Text> 
            </TouchableOpacity>                
        </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        marginTop: wp('5%'),
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        height: hp('15%'),
        width: wp('85%'),
        borderRadius: wp('3%')
    },
    title:{
        marginTop: wp('2%'),
        alignSelf: 'center',
        fontSize: wp('5%')
    },
    description:{
        marginStart: wp('20%'),
        alignSelf: 'center',
        fontSize: wp('3.7%')
    },
    descCont:{
        height: hp('5%'),
        width: wp('80%')
    },
    cost:{
        marginTop: wp('3%'),
        fontSize: wp('3%'),
        alignSelf: 'center'
    }
})
