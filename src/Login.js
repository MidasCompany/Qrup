import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Logo from '../Images/qrup_logo_sem_roda.png'
import imgLogin  from '../Images/btnLogin.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user:'',
    };
  }
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@User')
    if (user){
      this.props.navigation.navigate('User')
    }
  } 
  Loga = async() => {
    if (this.state.user === ''){
      alert('Campo Vazio')
    } else{        
      await AsyncStorage.setItem('@Point', '30' )
      await AsyncStorage.setItem('@User',this.state.user )
      this.props.navigation.navigate('User')
    }
} 
  Cadastra = () =>{
    this.props.navigation.navigate('Register')
  }
  render() {
  return (
    <>
      <StatusBar backgroundColor = "#677D35" barStyle="light-content" /> 
            <View style = {styles.main}>
              <Image source = {Logo} style={styles.Logo}/>
              <Text style={styles.text}> QRUP</Text>
              <TextInput 
                  style ={ styles.input}
                  placeholder= {'Login'}
                  placeholderTextColor = 'white'
                  underlineColorAndroid = 'white'
                  onChangeText = {user =>{(this.setState({user}))}}
                  />
              <TextInput 
                  style ={ styles.input}
                  placeholder= {'Senha'}
                  autoCapitalize = 'none'
                  secureTextEntry = {true}
                  placeholderTextColor = 'white'
                  underlineColorAndroid = 'white'/>
              <View  style = {styles.buttonLogin}>                
                  <TouchableOpacity onPress={() => this.Loga()} >
                      <Image source = {imgLogin} style ={styles.btnImg}/>
                  </TouchableOpacity>    
              </View>    
              <TouchableOpacity 
                onPress = {()=>this.Cadastra()}>
                  <Text style={styles.txtStyle}>Cadastre-se</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style = {styles.textMin2}>Recupere Sua Senha</Text>
              </TouchableOpacity>

            </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#677D35',
    width : wp ('100%'),
    height: hp('100%'),
    alignContent: 'center',
    alignItems: 'center',
  },
text:{
    marginTop: wp('3%'),
   fontSize: wp('9,70818%'),
   fontFamily: 'roboto',
   color: 'white',
 },
txtStyle:{
    color: 'white',
    fontSize: wp('4,85409%'),
},  
 textMin2:{
  marginTop: wp('5%'),
  color: 'white',
  fontSize: wp('4,85409%'),
},
 Logo:{
   width: wp('40%'),
   height:hp('30%'),
   resizeMode: 'contain'
 },
 input:{
    fontSize: wp ('6,47212%'),
    width: wp('85%'),
    color:'white',
//    marginBottom: wp
 },
 buttonLogin:{
    //width: wp('10%'),
    height: hp('15%'),
    marginLeft: hp('30%'),
    borderRadius: wp('11,32621%'),
    //backgroundColor: 'white',
    alignContent: 'center',
    alignContent: 'flex-end',
    textAlignVertical: 'center',
    resizeMode: 'contain',
    marginBottom: wp('15%')
 },
 btnImg:{
    //marginStart: hp('30%'),
    //marginTop: wp('%'),
    //marginStart: wp('45%'),
    width: wp('25%'),
    height: hp('25%'),
    resizeMode: 'contain'
 }
});
