import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'  
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { thisExpression } from '@babel/types'
export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Reader')
    }
    Exit =async()=>{
        await AsyncStorage.setItem('@User','' )
        this.props.navigation.navigate('Login');
    }
    render() {        
        return (
            <>    
                <View><View style = {styles.Cabeca}>
                    <Image  source = {qrup} style = {styles.Qrup}/>
                    <Text style = {styles.Titulo}> Products </Text>
                    <TouchableOpacity onPress = {()=>this.Exit()}>
                            <Icon name ='ios-exit' color = 'white' style = {styles.Exit}/>  
                    </TouchableOpacity>  
                </View>
                    <Text>{this.props.navigation.getParam('leitura')}</Text>
                    <View style= {styles.adView}>
                        <TouchableOpacity onPress = {()=> this.Scan()}>
                            <Icon2 name='add-circle' color='#677D35' style = {styles.ad}/>
                        </TouchableOpacity>
                    </View> 
                </View>
            </>
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
