import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    trocaPorra =()=>{
        return this.props.navigation.navigate('Pick')
    }
    render() {
        return (
        <>
            <TouchableOpacity style = {styles.main} onPress = {()=>{this.trocaPorra}}>
                <View style = {styles.terte}>
                    <View style = {styles.compLogo}/>
                    <View style = {styles.stats}>
                        <Text style = {styles.title}>{this.props.title} </Text>
                        <View style = {styles.descCont}>
                            <Text style = {styles.description}> {this.props.description} </Text>
                        </View>
                        <Text style = {styles.cost}>{this.props.points} Points</Text> 
                    </View>
                </View>
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
        fontSize: wp('6,47212%')
    },
    description:{
        marginStart: wp('20%'),
        alignSelf: 'center',
        fontSize: wp('3,23606%')
    },
    descCont:{
        height: hp('5%'),
        width: wp('80%'),
        marginStart: -wp('7%')
    },
    cost:{
        marginTop: wp('3%'),
        fontSize: wp('3%'),
        alignSelf: 'center'
    },
    compLogo:{
        backgroundColor: 'gray',
        height: hp('8%'),
        width: wp('15%'),
        marginStart: wp('5%')
    },
    terte:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    stats:{
        marginStart: -wp('10%')
    }
})
