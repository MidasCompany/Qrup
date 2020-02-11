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
    render() {
        return (
            <TouchableOpacity style = {styles.main} onPress = {this.props.onPress}>
                <View style = {styles.terte}>
                    {/* Logo da Empresa */ }
                    <View style = {styles.compLogo}/>
                    {/* Info do Cupom */}
                    <View style = {styles.stats}>
                        <Text style = {styles.title}>{this.props.title}</Text>
                        <Text style = {styles.description}> {this.props.description} </Text>
                        <Text style = {styles.cost}>{this.props.points} Points</Text> 
                    </View>
                </View>
            </TouchableOpacity>                
        )
    }
}

const styles = StyleSheet.create({
    main:{
        marginTop: wp('5%'),
        backgroundColor: '#F2F2F2',
        height: hp('15%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: wp('5%')
    },
    compLogo:{
        backgroundColor: 'gray',
        height: hp('9%'),
        width: wp('15%'),
        marginStart: wp('5%')
    },
    title:{
        marginTop: wp('2%'),
        fontSize: wp('6,47212%')
    },
    description:{
        //marginStart: wp('20%'),
        alignSelf: 'center',
        fontSize: wp('3,23606%'),
    },
    descCont:{
        width: 0,
        flexGrow: 1,        
    },
    cost:{
        //marginTop: wp('2%'),
        fontSize: wp('4,12%'),
        alignSelf: 'flex-end',
        marginEnd: wp('4%'),
    },
    terte:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    stats:{
        marginStart: (wp('3%')),
        flexGrow: 1,
        width:0,
    }
})
