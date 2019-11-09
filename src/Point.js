import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Card from './components/Card'
import Header from './components/Header'
export default class Point extends Component {
    Exit =()=>{
        this.props.navigation.navigate('Login');
    }
    state ={
        pontos: 20
    }
    render() {
        return (
        <>
            <Header
                title = 'Pontos'
            />
            <ScrollView>
                <Icon2 name ='coins' color = '#677D35' style = {styles.Coin}/>
                <Text style = {styles.Points}>{this.state.pontos} Points</Text>
                <Card
                    title = 'Retiro da Sé'
                    description = '10% de desconto aos sábados de neve em Belém'
                    points = '10'
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
