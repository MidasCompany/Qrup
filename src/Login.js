import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements'
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';

export default class Login extends React.Component {  
  constructor(props) {
    super(props);    
    this.state = {
        email:'',
        password:'',
        errorMessage: null,
        load: false
    };
  }
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@User')
    if (user){
      this.props.navigation.navigate('User')
    }
  }    
  Loga = async() => {
  if (this.state.email.length === 0 || this.state.password.length === 0 ){
      alert('Campo Vazio')
    } else{ 
      this.setState({load:true})
    console.log('SICARALHO')   
      try{
        const response = await api.post('/sessions',{
          email: this.state.email,
          password: this.state.password
        }) ;
          await AsyncStorage.setItem('@Qrup:token',response.data.token )
          await AsyncStorage.setItem('@Qrup:user',response.data.user.name)
          this.props.navigation.navigate('User')
      } catch (response){
        //this.setState({errorMessage: response.data.error });        
         this.setState({load:false})
        alert("Credenciais não conferem")
      }                        
    }   
  }

  Cadastra = () =>{
    this.props.navigation.navigate('Register')
  }
  render() {
  return (
    <>        
      <LoadingScreen enabled = {this.state.load}/>
            <View style = {styles.main}>
              <Image source = {Logo} style={styles.Logo}/>
              <Text style={styles.text}>QRUP</Text>
              <View style = {styles.field}>
                <TextField
				          	style={styles.input}
                    label = 'Email'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    lineWidth = {2}
                    fontSize = {17}
                    onSubmitEditing={() => { this.password.focus(); }}
                    onChangeText = {email =>{(this.setState({email}))}}
                  />
                <TextField 
                  style={styles.input}    
                    ref={(input) => { this.password = input; }}
                    label = 'Senha'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    secureTextEntry = {true}
                    keyboardType = 'twitter'
                    lineWidth = {2}                    
                    fontSize = {17}
                    onSubmitEditing = {() => {this.Loga()}}
                    onChangeText = {password =>{(this.setState({password}))}}/>
              </View>
                <Button
                    type = 'outline'
                    title = 'Login'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Loga()}
                /> 
                <View style={styles.footer}>
                  <TouchableOpacity 
                      onPress = {()=>this.Cadastra()}>
                    <Text style={styles.txtStyle}>Cadastre-se</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style = {styles.txtStyle}>Recupere Sua Senha</Text>
                  </TouchableOpacity>
                </View>
          </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
	main: {
		backgroundColor: '#006300',
		flex: 1,
  	},
	text:{
		fontSize: 25,
		fontFamily: 'Roboto', 
		color: 'white',
		alignSelf: 'center'
 	},
	txtStyle:{
		color: 'white',
		fontSize: wp('4,85409%'),
		textAlign: "center",
		marginBottom: 20
	},  
	Logo:{
		marginTop: 20,
		width: wp('20%'),
		height:hp('20%'),
		resizeMode: 'contain',
		alignSelf: 'center'
	},
	field:{
		color:'white',
		width: '80%',
		alignSelf: 'center',
		marginVertical: 20
	},
	input: {
		paddingHorizontal: 10
	},
	btnLogin:{
		width: '80%',
		backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: hp('10%')
	},
	btnLabel:{
		color:'#006300',
		fontSize: wp('5%'),
	},
	btnImg:{
		width: wp('25%'),
		height: hp('25%'),
		resizeMode: 'contain'
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignSelf: 'center',
	}
});
