import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        Image,    
        TouchableOpacity,
        StatusBar
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import qrup from '../Images/qrup_semroda_semsombra.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'  
import {Button} from 'react-native-elements'

export default class Profile extends Component {
    state={
        user:''
    }
    async componentDidMount(){
    this.setState ({
        user: await AsyncStorage.getItem('@User')
    })
    }
    Exit =async()=>{
        await AsyncStorage.setItem('@User','' )
        this.props.navigation.navigate('Login');
    }
    render() {    
        return (
            <View >                
                  
                <View style= {styles.Perfil}>
                    <Icon2 name = 'user-circle-o'color ='#006300' style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>{this.state.user}</Text>
                    <Text style= {styles.pontDesgr}> 21312 Pontos</Text>
                </View>
                <View>
                <Button
                    type = 'outline'
                    title = 'Logout'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Exit()}
                /> 
                </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    Perfil:{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
    Disgraca:{ 
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
    },
    
	btnLogin:{
        marginTop: wp('75%'),
        width: '40%',
        backgroundColor: 'white',
        borderColor: '#006300',
        borderWidth: 2,
		alignSelf: 'center'
    },
	btnLabel:{
		color:'#006300',
		fontSize: wp('5%'),
	},
})
