import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { thisExpression } from '@babel/types'
import Header from './components/Header'
export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Reader')
    }
    render() {        
        return (
            <View>
                <Header
                    title = 'Produtos'
                />
                 <Text>{this.props.navigation.getParam('leitura')}</Text>
                <View style= {styles.adView}>
                    <TouchableOpacity onPress = {()=> this.Scan()}>
                        <Icon2 name='add-circle' color='#677D35' style = {styles.ad}/>
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
    terte:{
        backgroundColor: 'red',
        fontSize: 20
    },
    ad:{
        fontSize: wp('20%'),
    },
    adView:{
        marginTop: hp('70%'),
        marginEnd: wp('5%'),
        width: wp('20%'),
        height: hp('9%'),
        //backgroundColor: 'red',
        alignContent: 'center',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        textAlignVertical: 'center',
        resizeMode: 'contain'
    }
})
