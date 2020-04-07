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
import Icon from 'react-native-vector-icons/Feather'
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';
import LinearGradient from 'react-native-linear-gradient'

export default class Login extends React.Component {  
  constructor(props) {
    super(props);    

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.state = {
        email:'',
        password:'',
        errorMessage: null,
        load: false,
        secureTextEntry: false      
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
      try{
        const response = await api.post('/sessions',{
          email: this.state.email,
          password: this.state.password
        }) ;
          await AsyncStorage.setItem('@Qrup:token',response.data.token )
          await AsyncStorage.setItem('@Qrup:user',response.data.user.name)
          await AsyncStorage.setItem('@Qrup:u_id', response.data.user.id)
          this.setState({load:false})
          this.props.navigation.navigate('User')
      } catch (response){
        //this.setState({errorMessage: response.data.error });     
        console.log(response)   
         this.setState({load:false})
        alert("Credenciais não conferem")
      }                        
    }   
  }
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'eye':
      'eye-off';

    return (
      <Icon size={24} name={name}  color='white' onPress={this.onAccessoryPress}/>
    );
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  Cadastra = () =>{
    this.props.navigation.navigate('Register')
  }
  render() {
  return (
    <>        
      <LoadingScreen enabled = {this.state.load}/>
            <View style={styles.main}>
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
                    autoCapitalize = 'none'
                    returnKeyType = 'next'
                  />
                <TextField 
                  style={styles.input}    
                    ref={(input) => { this.password = input; }}
                    label = 'Senha'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    secureTextEntry= {this.state.secureTextEntry}
                    lineWidth = {2}                    
                    fontSize = {17}
                    onSubmitEditing = {() => this.Loga()}
                    autoCapitalize = "none"
                    onChangeText = {password =>{(this.setState({password}))}}
                    renderRightAccessory = {this.renderPasswordAccessory}
                  />
              </View>
                <Button
                    type = 'outline'
                    title = 'Acessar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Loga()}
                /> 
                <View style={styles.footer}>
                  <View style ={{flexDirection: 'row'}}>
                    <Text style ={{color: 'white',fontSize: wp('4,85409%'),	textAlign: "center",marginBottom: 20}}>Novo por aqui? </Text>
                    <TouchableOpacity 
                        onPress = {()=>this.Cadastra()}>
                      <Text style={styles.txtStyle}>pressione aqui</Text>
                    </TouchableOpacity>
                  </View>
                  {/*<TouchableOpacity>
                    <Text style = {styles.txtStyle}>Recupere Sua Senha</Text>
                  </TouchableOpacity>*/}
                </View>
          </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
	main: {
    backgroundColor: '#01A83E',
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
    marginBottom: 20,
    textDecorationLine: 'underline',
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
    marginVertical: 20,
    marginTop: wp('10%')
	},
	input: {
		paddingHorizontal: 10
	},
	btnLogin:{
		width: wp('40%'),
		backgroundColor: 'white',
    alignSelf: 'center',
    marginTop:wp('10%'),
    marginBottom: hp('10%'),
    borderRadius: wp('2%')
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
