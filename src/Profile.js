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
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'  
import {Button} from 'react-native-elements'
import api from './services/api';

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
            token: await AsyncStorage.getItem('Qrup:token')
        })
        try{
            const response = await api.get('/users/'+this.state.id,{},{
                headers:{
                    Authorization : "Bearer " + this.state.token
                }
            }) ;
              await AsyncStorage.setItem('@Qrup:u_points', response.data.points)
              this.setState({load:false, pontos: await AsyncStorage.getItem('@Qrup:u_points')})
              this.props.navigation.navigate('User')
          } catch (response){
            //this.setState({errorMessage: response.data.error });     
            console.log(response)   
          }     
    }
    Exit =async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
    render() {    
        return (
            <View >             
                <View style= {styles.Perfil}>
                    <Icon name = 'md-person'color ='#006300' style = {styles.Disgraca}/>
                    <Text  style = {styles.nameDesg}>{this.state.user}</Text>
                    <Text style= {styles.pontDesgr}> {this.state.pontos} Pontos</Text>
                    <View style = {styles.Butons}>
                        <TouchableOpacity 
                            onPress = {()=>this.props.navigation.navigate('Extract')}>
                            <Text style = {styles.btnTxt}>Extrato</Text>
                            <Text style = {styles.subTxt}>Pontos Ganhos e Pontos Gastos</Text>
                        </TouchableOpacity>
                    </View>    
                    <View style = {styles.Sbutons}>
                        <TouchableOpacity>
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
                <View>
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
    },
    Disgraca:{ 
        marginTop: wp('10%'),
        fontSize: wp('35%'),
    },
    nameDesg:{
        marginTop:wp('5%'),
        fontSize: wp('6%'),
    },
    pontDesgr:{
        fontFamily:'Roboto',
        marginTop: wp('5%')
    },
    Butons:{
        width: wp('90%'),
        marginTop:wp('5%'),
        marginBottom: wp('2%'),
        borderTopColor: '#707070',
        borderBottomColor: '#707070',
        borderWidth: wp('0.4%'),
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    Sbutons:{        
        width: wp('90%'),
       // marginTop:wp('5%'),
        marginBottom: wp('5%'),
        //borderTopColor: '#707070',
        borderBottomColor: '#707070',
        borderWidth: wp('0.4%'),
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth:0
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
