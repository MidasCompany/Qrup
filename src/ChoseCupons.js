import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, TouchableHighlightBase } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import AsyncStorage from '@react-native-community/async-storage'  
import api from './services/api';

export default class ChoseCupons extends Component {
    state= {
        pontos: '',
        cuponsList: [],
    }
    async componentDidMount(){
        this.setState({
            pontos: await AsyncStorage.getItem('@Point')
        }) 
            try{
                const response = await api.get('/user-coupons') ;
                this.setState({cuponsList: response.data})
            } catch (response){
            //this.setState({errorMessage: response.data.error });     
            //console.log(response)   
            this.setState({load:false})
            alert("Problemas para carregar cupons, feche o App para solucionar")
        } 
    }
    setCupon = ()=>{
        this.props.navigation.navigate('Pick');
    };
    render() {
        return (
        <> 
            <Icon2 name ='coins' color = '#006300' style = {styles.Coin}/>
            <Text style = {styles.Points}>{this.state.pontos} Points</Text>       
            <FlatList
                data={this.state.cuponsList}
                renderItem={({ item }) =>   <TouchableOpacity style = {styles.main} onPress = {() => {this.props.navigation.navigate('Pick', item.id)}}> 
                                                <View style = {styles.terte}>
                                                    {/* Logo da Empresa */ }
                                                    <View style = {styles.compLogo}/>
                                                    {/* Info do Cupom */}
                                                    <View style = {styles.stats}>
                                                        <Text style = {styles.title}>{item.name}</Text>
                                                        <Text style = {styles.description}> {item.description} </Text>
                                                        <Text style = {styles.cost}>{item.points} Points</Text> 
                                                    </View>
                                                </View>
                                            </TouchableOpacity> }
                keyExtractor={item => item.id}
            />  
        </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        marginTop: wp('1%'),
        backgroundColor: '#fff',
        height: hp('15%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: wp('3%'),
        marginBottom: wp('5%')
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
    },
    Coin:{
        alignSelf: 'center',
        marginTop: wp('10%'),
        fontSize: wp('15%')
    },
    Points:{
        alignSelf: 'center',
        fontSize: wp('8%'),
        marginTop: wp('2%'),
        marginBottom: wp('2%')
    }
})
