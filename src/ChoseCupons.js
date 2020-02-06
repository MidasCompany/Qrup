import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import AsyncStorage from '@react-native-community/async-storage'  
import Card from './components/Card'

export default class ChoseCupons extends Component {
    Exit =async()=>{
        await AsyncStorage.setItem('@User','' )
        this.props.navigation.navigate('Login');
    }
    state= {
        pontos: '',
    }
    async componentDidMount(){
        this.setState({
            pontos: await AsyncStorage.getItem('@Point')
        }) 
    }
    setCupon = ()=>{
        this.props.navigation.navigate('Pick');
    }
    render() {
        return (
        <>
            <View style = {styles.Cabeca}>
                <Image  source = {qrup} style = {styles.Qrup}/>
                <Text style = {styles.Titulo}> Cupons </Text>
                <TouchableOpacity onPress = {()=>this.Exit()}>
                        <Icon name ='ios-exit' color = 'white' style = {styles.Exit}/>  
                </TouchableOpacity>  
            </View>
            <ScrollView>
                <Icon2 name ='coins' color = '#677D35' style = {styles.Coin}/>
                <Text style = {styles.Points}>{this.state.pontos} Points</Text>
                <Card
                        title = 'Retiro da Sé'
                        description = '10% de desconto aos sábados de neve em Belém'
                        points = '10'
                        onPress={()=>this.setCupon()}
                    />  
                <Card
                    title = 'Burguer King'
                    description = '20% de desconto quando o Amaury criar cabelo'
                    points = '20'
                />
                <Card
                    title = 'Mc Donalds'
                    description = '60% de desconto quando o De Masi parar de ser Nazista'
                    points = '40'
                />
                <Card
                    title = 'Vikings'
                    description = '20% de desconto quando o Murilo falar pq chamam ele de bibo'
                    points = '2'
                />
                <Card
                    title = 'Burguer Spot'
                    description = 'Qualquer item de graça quando o Caio cortar o Cabelo'
                    points = '20'
                />
            </ScrollView>
        </>
        )
    }
}

const styles = StyleSheet.create({
    tertePorra:{
        height: 40,
        width: 40,
        backgroundColor: 'black'
    },
    terte2:{
        marginBottom: wp('5%'),
        alignSelf: 'center',
        height: hp('15%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        backgroundColor: 'red'
    },
    Cabeca:{
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('100%'),
        backgroundColor: '#3a5108',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Qrup:{
        //marginTop: -wp('2%'),
        height: hp('7%'),
        width: wp('7%'),
        marginStart: wp('3,23606%'),
        resizeMode: 'contain'
    },
    Titulo:{
        fontSize: wp('4,85409%'),
        color: 'white'
    },
    Exit:{
        fontSize: wp('10%'),
        marginEnd: wp('3,23606%')
    },
    Coin:{
        alignSelf: 'center',
        marginTop: wp('10%'),
        fontSize: wp('20%')
    },
    Points:{
        alignSelf: 'center',
        fontSize: wp('10%'),
        marginTop: wp('2%')
    }
})
