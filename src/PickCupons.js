import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import AsyncStorage from '@react-native-community/async-storage'  
import QRCode from 'react-native-qrcode-svg'
import QrupLogo from '../Images/qrup_semroda_semsombra.png'

export default class PickCupons extends Component {
    constructor (props){
        super(props);
        this.state={
            cuponName: '',
            cuponPoints: '',
            cuponId : '',
        }
    }
    async componentDidMount (){
        console.log(this.props.navigation)
        const cuponId = this.props.navigation.getParam('cuponId');
        const cuponName = this.props.navigation.getParam('cuponName');
        const cuponPoints = this.props.navigation.getParam('cuponPoints');
        
        this.setState({
            cuponName: cuponName,
            cuponPoints: cuponPoints,
            cuponId: cuponId
        })
    }
    render() {        
        return (         
            <View style = {styles.main}>     
                <Text style={styles.title}>{this.state.cuponName}</Text>
                <Text style={styles.description}>Esse Cupom custa {this.state.cuponPoints}</Text>
                <Text style = {{marginTop : wp('5%'), fontSize: wp('3.5%'), marginBottom: wp('5%'), alignSelf: 'center'}}>Apresente esse QRCode no caixa para receber seu desconto</Text>
                <QRCode
                    value = {this.state.cupxonId}
                    size = {wp('40%')}
                    color = '#006300'             
                /> 
            </View>
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
        marginTop: wp('20%'),
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
