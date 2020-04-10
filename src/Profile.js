import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        TouchableOpacity
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'  
import {Button} from 'react-native-elements'

export default class Profile extends Component {
    state={
        user:'',
        pontos: '',
        id:'',
        token:''
    }
    async componentDidMount(){
        this.setState ({
            user:  await AsyncStorage.getItem('@Qrup:user'),       
            id: await AsyncStorage.getItem('@Qrup:u_id'),
            token: await AsyncStorage.getItem('@Qrup:token'),            
            pontos: await AsyncStorage.getItem('@Qrup:u_points')
        })
        console.log(this.state.pontos)
    }
    Exit =async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
    render() {    
        return (
            <View style ={{backgroundColor: '#f5f5f5', height:hp('100%')}}>             
                <View style= {styles.Perfil}>
                    <View style = {{backgroundColor: '#01A83E', marginBottom: wp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: wp('100%')}}>
                        <Icon name = 'user-circle'color ='white' style = {styles.Disgraca}/>
                        <Text  style = {styles.nameDesg}>{this.state.user}</Text>
                        <Text style= {styles.pontDesgr}> {this.state.pontos} Pontos</Text>
                    </View>
                    <View style = {styles.Butons}>
                        <TouchableOpacity 
                            onPress = {()=>this.props.navigation.navigate('History')}>
                            <Text style = {styles.btnTxt}>Histórico</Text>
                            <Text style = {styles.subTxt}>Pontos Ganhos e Pontos Gastos</Text>
                        </TouchableOpacity>
                    </View>    
                    <View style = {styles.Sbutons}>
                        <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Edit')}>
                            <Text style = {styles.btnTxt}>Editar</Text>
                            <Text  style ={styles.subTxt}>Nome de Preferência, Telefone, Email</Text>                            
                        </TouchableOpacity>
                    </View>             
                    <View style = {styles.Sbutons}>
                        <TouchableOpacity>
                            <Text style = {styles.btnTxtnS}>Me Ajuda</Text>                         
                        </TouchableOpacity>
                    </View>           
                </View>
                <View style = {{marginTop: wp('10%')}}> 
                    <Button
                        type = 'outline'
                        title = 'Sair'
                        titleStyle = {styles.btnLabel}
                        buttonStyle = {styles.btnLogout}
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
        backgroundColor: '#f5f5f5'
    },
    Disgraca:{ 
        marginTop: wp('3%'),
        fontSize: wp('35%'),
    },
    nameDesg:{
        color:'white',
        marginTop:wp('5%'),
        fontSize: wp('6%'),
    },
    pontDesgr:{
        color:'white',
        marginTop: wp('2%'),
        fontSize:wp('5%'),
        marginBottom: wp('2%')
    },
    Butons:{
        width: wp('90%'),
        marginTop:wp('5%'),
        marginBottom: wp('5%'),
        borderRadius: wp('1%'),
        backgroundColor: 'white',
        elevation: 5
    },
    Sbutons:{        
        width: wp('90%'),
        marginBottom: wp('5%'),
        elevation: 5,        
        borderRadius: wp('1%'),
        backgroundColor:'white',
        height: wp('14%'),
        justifyContent: 'center'
    },
    btnTxtnS:{
        fontSize: wp('4%'),
        marginBottom: wp('3%'),
        marginLeft: wp('5%'),
        color: '#006300'
    },
    btnTxt:{
        fontSize: wp('4%'),
        marginTop: wp('2%'),
        marginBottom: -wp('0.5%'),
        marginLeft: wp('5%'),
        color: '#006300'
    },
    subTxt:{        
        fontSize: wp('3%'),
       // marginTop: wp('3%'),
        marginBottom: wp('2%'),
        marginLeft: wp('5%'),
        color: '#006300'
    },
	btnLogout:{
       // marginTop: wp('75%'),
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
