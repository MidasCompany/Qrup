import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Input} from 'react-native-elements'
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextField } from 'react-native-material-textfield';

export default class Login extends React.Component {
  loginRef = React.createRef();
  passwordRef = React.createRef();
  constructor(props) {
    super(props);    
    this.state = {
        user:'',
        password:'',
    };
  }
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@User')
    if (user){
      this.props.navigation.navigate('User')
    }
  } 
  
  updateRef(name, ref) {
    this[name] = ref;
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
      <StatusBar backgroundColor = "#3a5108" barStyle="light-content" /> 
            <View style = {styles.main}>
              <Image source = {Logo} style={styles.Logo}/>
              <Text style={styles.text}> QRUP</Text>
              <View style = {styles.field}>
                <TextField
                    label = 'Login'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    lineWidth = {2}
                    fontSize = {20}
                    labelFontSize = {20}
                    onSubmitEditing={() => { this.password.focus(); }}
                    onChangeText = {user =>{(this.setState({user}))}}
                  />
                <TextField                    
                    ref={(input) => { this.password = input; }}
                    label = 'Senha'
                    tintColor = 'rgb(255,255,255)'
                    baseColor = 'rgba(255,255,255,1)'
                    textColor = 'rgba(255,255,255,1)'
                    secureTextEntry = {true}
                    lineWidth = {2}                    
                    fontSize = {20}
                    labelFontSize = {20}
                    onSubmitEditing = {() => {this.Loga()}}
                    onChangeText = {password =>{(this.setState({password}))}}/>
                </View>
                <View  style = {styles.buttonLogin}>             
                  <Button
                    type = 'outline'
                    title = 'Login'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {()=>this.Loga()}
                  />
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
    backgroundColor: '#006300',
    width : wp ('100%'),
    height: hp('100%'),
    alignContent: 'center',
    alignItems: 'center',
  },
text:{
    marginTop: wp('3%'),
   fontSize: wp('9,70818%'),
   fontFamily: 'Roboto',
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
   marginTop: wp('15%'),
   width: wp('35%'),
   height:hp('20%'),
   resizeMode: 'contain'
 },
 field:{
    width: wp('80%'),
    color:'white',
//    marginBottom: wp
 },
 buttonLogin:{
    //width: wp('10%'),
    //height: hp('15%'),
    marginTop: wp('5%'),
    marginLeft: hp('30%'),
    borderRadius: wp('11,32621%'),
    alignContent: 'center',
    alignContent: 'flex-end',
    textAlignVertical: 'center',
    resizeMode: 'contain',
 },
 btnLogin:{
  borderColor: 'white',
  borderWidth: 2,
  backgroundColor: 'white'
 },
 btnLabel:{
   color:'#006300',
   fontSize: wp('5%'),
 },
 btnImg:{
    //marginStart: hp('30%'),
    //marginTop: wp('%'),
    //marginStart: wp('45%'),
    width: wp('25%'),
    height: hp('25%'),
    resizeMode: 'contain'
 },
});
