import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import QRCode from 'react-native-qrcode-svg'
import AsyncStorage from '@react-native-community/async-storage';
export default class PickCupons extends Component {
    constructor (props){
        super(props);
        this.state={
            cuponName: '',
            cuponPoints: '',
        }
    }
    async componentDidMount (){
        const cuponId = this.props.navigation.getParam('cuponId');
        const cuponName = this.props.navigation.getParam('cuponName');
        const cuponPoints = this.props.navigation.getParam('cuponPoints');
        
        this.setState({
            cuponName: cuponName,
            cuponPoints: cuponPoints,
            cuponId: cuponId + ',' + await AsyncStorage.getItem('@Qrup:u_id')

        })
    }
    render() {        
        return (         
            <ScrollView >     
                <View style = {styles.main}>
                    <Text style={styles.title}>{this.state.cuponName}</Text>
                    <Text style={styles.description}>Esse Cupom custa {this.state.cuponPoints}</Text>
                    <Text style = {{marginTop : wp('5%'), fontSize: wp('3.5%'), marginBottom: hp('15%'), alignSelf: 'center', color:'white'}}>Apresente esse QRCode no caixa para receber seu desconto</Text>
                    <QRCode
                        value = {this.state.cuponId}
                        size = {wp('50%')}
                        color = 'white'             
                        backgroundColor = '#01A83E'
                    /> 
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        alignItems: 'center',
        justifyContent: 'center',
        height:hp('90%'), 
        backgroundColor:'#01A83E',
    },
    title:{
        fontSize: wp('9,70818%'),
        color:'white',
    },    
    description:{
        marginTop: hp('3%'),
        fontSize: wp('3,23606%'),
        paddingHorizontal: wp('2%'),
        alignSelf:'center',
        color:'white',
        textAlign:'center'
    }
})
