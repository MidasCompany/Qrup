import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';  
import AsyncStorage from '@react-native-community/async-storage'  
import {withNavigationFocus} from 'react-navigation'
import api from './services/api';
import {SearchBar} from 'react-native-elements'
const Data = [
    {
        id: 1,
        name: 'Empresa 1',
        description: 'Cupon de Desconto',
        points: '500'
    }
]
export default class ChoseCupons extends Component {
    state= {
        pontos: '',
        cuponsList: [],
        will_focus : null,
        refreshing: false
    }
    async loadCupon (){
        try{
            const response = await api.get('/coupons') ;
            this.setState({cuponsList: response.data, refreshing: false})
        } catch (response){
        this.setState({load:false, refreshing:false})
        ToastAndroid.showWithGravityAndOffset(
            'Problema para carregar os cupons',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200,
        );
        } 
    }
    async componentDidMount(){
        this.setState({
            pontos: await AsyncStorage.getItem('@Qrup:u_points')
        }) 
        this.state.will_focus = this.props.navigation.addListener('willFocus', async () =>(this.loadCupon()) )
    }
     async componentWillUnmount(){
         this.state.will_focus.remove();
     }

    handleRefresh = ()=>{
        this.setState({
            refreshing: true
        })
        this.loadCupon()
    }
    setCupon = ()=>{
        this.props.navigation.navigate('Pick');
    };
    render() {
        return (
        <> 
            <View style = {{backgroundColor: '#01A83E', marginBottom: wp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: wp('100%')}}>
                <Text style = {{fontSize: wp('4%'), color:'white', marginVertical: wp('5%')}}>Você Possui: {this.state.pontos} Pontos</Text>
            </View>
            <View style ={{height: hp('100%'), backgroundColor: '#f5f5f5'}}> 
                <FlatList
                    data={this.state.cuponsList}
                    renderItem={({ item }) =>   <TouchableOpacity style = {styles.main} 
                                                onPress = {() => {this.props.navigation.navigate('Pick', {cuponId: item.id,
                                                                                                          cuponName: item.name,
                                                                                                          cuponPoints: item.points
                                                                                                          })}}> 
                                                    <View style = {styles.terte}>
                                                        {/* Logo da Empresa */ }
                                                        <View style = {styles.compLogo}/>
                                                        {/* Info do Cupom */}
                                                        <View style = {styles.stats}>
                                                            <Text style = {styles.title}>{item.name}</Text>
                                                            <Text style = {styles.cost}>Custa {item.points} Pontos</Text> 
                                                        </View>
                                                    </View>
                                                </TouchableOpacity> }
                    keyExtractor={item => item.id}
                    refreshing = {this.state.refreshing}
                    onRefresh ={this.handleRefresh}
                />  
            </View>
        </>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        marginTop: wp('1%'),
        backgroundColor: '#fff',
        height: hp('9%'),
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
        borderTopLeftRadius: wp('3%'),
        borderBottomLeftRadius: wp('3%')
        //marginStart: wp('5%')
    },
    title:{
        marginTop: -wp('1%'),
        fontSize: wp('5%')
    },
    descCont:{
        width: 0,
        flexGrow: 1,        
    },
    cost:{
        marginTop: wp('2%'),
        fontSize: wp('3.5%'),
        alignSelf: 'center',
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
})
