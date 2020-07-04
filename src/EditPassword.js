import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid
} from 'react-native';
import {Button} from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Feather'
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
    
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
    
        this.state = {
            password: '',
            secureTextEntry: true  ,       
            confirmPassword: '',
            oldPass:'',
            load: false
        };
      }  
    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry?
            'eye':
            'eye-off';

        return (
            <Icon size={24} name={name}  color='#01A83E' onPress={this.onAccessoryPress}/>
        );
    }
    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
    async updatePassword(){
      if (this.state.password.length === 0 || this.state.oldPass.length === 0 || this.state.confirmPassword.length === 0 ){
        ToastAndroid.showWithGravityAndOffset(
          'Para atualizar dados, preencha todos os campos',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
      } else if (this.state.password !== this.state.confirmPassword){
        ToastAndroid.showWithGravityAndOffset(
          'A confirmação de senha não é igual a senha',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
      } 
      else{ 
      this.setState({load:true})
      try{
        const response = await api.put('/users/' + await AsyncStorage.getItem('@Qrup:u_id'),{    
            oldPassword: this.state.oldPass,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
          },
          {
            headers:{
              Authorization : "Bearer " + await AsyncStorage.getItem('@Qrup:token')
            }
          }
        )
        this.setState({load:false})
        this.props.navigation.navigate('MainProf')
      }catch(response){
        //console.log(response)      
        this.setState({load:false})
        ToastAndroid.showWithGravityAndOffset(
          'Problema para efetuar atualização de dados',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
      }
    }
  }
  render() {
    return (
        <>
             <LoadingScreen enabled = {this.state.load}/>
             <View style = {{height: hp('10%'), backgroundColor: '#01A83E', marginBottom: wp('1%'),width:wp('100%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={{fontSize: wp('4%'), color:'white', marginHorizontal: wp('15%')}}> Atualize sua Senha</Text>
            </View>
            <View style = {styles.field}>
                <TextField
                    style={styles.input}
                    label = 'Senha Antiga'
                    tintColor = 'rgba(1, 168, 62, 1)'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {17}
                    onSubmitEditing={() => { this.password.focus(); }}          
                    onChangeText = {oldPass =>{(this.setState({oldPass}))}}
                    renderRightAccessory = {this.renderPasswordAccessory}
                />  
                <TextField
                    style={styles.input}
                    ref={(input) => { this.password= input; }}
                    label = 'Nova Senha'
                    tintColor = 'rgba(1, 168, 62, 1)'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {17}
                    onSubmitEditing={() => { this.confirmPassword.focus(); }}         
                    onChangeText = {password =>{(this.setState({password}))}}
                    renderRightAccessory = {this.renderPasswordAccessory}
                />  
                <TextField
                    style={styles.input}
                    ref={(input) => { this.confirmPassword= input; }}
                    label = 'Confirme a Nova Senha'
                    tintColor = 'rgba(1, 168, 62, 1)'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    secureTextEntry = {this.state.secureTextEntry}
                    lineWidth = {2}
                    autoCapitalize = 'none'
                    fontSize = {17}
                    onSubmitEditing={() => { this.updatePassword(); }}              
                    onChangeText = {confirmPassword =>{(this.setState({confirmPassword}))}}
                />
            </View>
            <View style= {styles.divider}/>
            <Button
                type = 'outline'
                title = 'Atualizar'
                titleStyle = {styles.btnLabel}
                buttonStyle = {styles.btnLogin}
                onPress = {()=>this.updatePassword()}
            /> 
        </>
    );
  }
}
const styles = StyleSheet.create({
    divider:{
      height: wp('50%')
    },
   field:{
    color:'white',
    width: '80%',
    alignSelf: 'center',
  },
   input: {
    marginTop: 2
  },
  btnLogin:{
    marginTop: wp('5%'),
    alignSelf: 'center',
    width: '40%',
    backgroundColor: '#01A83E',
  },
  btnLabel:{
    color:'white',
    fontSize: wp('5%'),
  },
  txtStyle:{
    color: '#01A83E',
    fontSize: wp('4,85409%'),
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: 'underline',
  }, 
  });