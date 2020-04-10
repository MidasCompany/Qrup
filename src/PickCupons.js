import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import QRCode from 'react-native-qrcode-svg'
export default class PickCupons extends Component {
    constructor (props){
        super(props);
        this.state={
            cuponName: '',
            cuponPoints: '',
        }
    }
    async componentDidMount (){
        const cuponId1 = JSON.stringify(this.props.navigation.getParam('cuponId'));
        const cuponName = this.props.navigation.getParam('cuponName');
        const cuponPoints = this.props.navigation.getParam('cuponPoints');
        
        this.setState({
            cuponName: cuponName,
            cuponPoints: cuponPoints,
            cuponId: cuponId1,
        })
    }
    render() {        
        return (         
            <View style = {styles.main}>     
                <Text style={styles.title}>{this.state.cuponName}</Text>
                <Text style={styles.description}>Esse Cupom custa {this.state.cuponPoints}</Text>
                <Text style = {{marginTop : wp('5%'), fontSize: wp('3.5%'), marginBottom: wp('20%'), alignSelf: 'center', color:'white'}}>Apresente esse QRCode no caixa para receber seu desconto</Text>
                <QRCode
                    value = {this.state.cuponId}
                    size = {wp('70%')}
                    color = 'white'             
                    backgroundColor = '#01A83E'
                /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        alignItems: 'center',
        //justifyContent: 'center',
        alignItems: 'center',
        height:hp('100%'), 
        backgroundColor:'#01A83E',
    },
    title:{
        marginTop: wp('20%'),
        fontSize: wp('9,70818%'),
        color:'white',
    },    
    description:{
        marginTop: wp('3,23606%'),
        fontSize: wp('3,23606%'),
        paddingHorizontal: wp('2%'),
        alignSelf:'center',
        color:'white'
    }
})
