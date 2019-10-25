import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        Image,    
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import qrup from '../Images/qrup_semroda_semsombra.png'
  import exit from '../Images/exitIco.png'
  import Desgracado from '../Images/Profile.png'

export default class Profile extends Component {
    render() {
        return (
            <View >
                <View style = {styles.Cabeça}>
                    <Image  source = {qrup} style = {styles.Qrup}/>
                    <Text style = {styles.Titulo}>Profile </Text>
                    <Image source = {exit} style = {styles.Exit}/>
                </View>
                <View style= {styles.Perfil}>
                    <Image source = {Desgracado} style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>BOLO</Text>
                    <Text style= {styles.pontDesgr}> 21312 Pontos</Text>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
Cabeça:{
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
    height: hp('3%'),
    width: wp('6%'),
    resizeMode: 'contain',
    marginEnd: wp('2%')
},
Perfil:{
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
},
Disgraca:{ 
    marginTop: wp('10%'),
    height: hp('20%'),
    width: wp('30%'),
   resizeMode: 'contain',
},
nameDesg:{
    fontSize: wp('6%'),
},
pontDesgr:{
    fontFamily:'Roboto',
    marginTop: wp('5%')
}
})
