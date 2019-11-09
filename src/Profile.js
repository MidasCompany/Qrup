import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        Image,    
        TouchableOpacity
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import qrup from '../Images/qrup_semroda_semsombra.png'
  import Icon from 'react-native-vector-icons/Ionicons'
  import Icon2 from 'react-native-vector-icons/FontAwesome'
  import Card from './components/Card'
import Header from './components/Header'
export default class Profile extends Component {
 
    render() {    
        return (
            <View >
                <Header
                    title = 'Perfil'
                />
                <View style= {styles.Perfil}>
                    <Icon2 name = 'user-circle-o'color ='#677D35' style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>{this.props.navigation.getParam('user')}</Text>
                    <Text style= {styles.pontDesgr}> 21312 Pontos</Text>
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
Perfil:{
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
},
Disgraca:{ 
    marginTop: wp('20%'),
    marginTop: wp('10%'),
    fontSize: wp('35%'),
},
nameDesg:{
    marginTop:wp('10%'),
    fontSize: wp('6%'),
},
pontDesgr:{
    fontFamily:'Roboto',
    marginTop: wp('5%')
}
})
