import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Button} from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import api from './services/api'
import LoadingScreen from './components/LoadingScreen';
export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.state = {
        isVisible: false,
        user:'',
        email: '',
        cpf:'',
        birhtDate: '',
        password: '',
        contact: '',
        secureTextEntry: true  ,
        load: false
    };
  }  
  Login = () => {
    this.props.navigation.navigate('Login')
  }
  Cadastra = async () => {
    if (this.state.user.length === 0 || this.state.password.length === 0 || this.state.email.length === 0 || this.state.cpf.length === 0 || this.state.contact.length === 0 ){
      Alert.alert('Campo Vazio')
    } else{       
      this.setState({load:true})
      console.log('SICARALHO')   
      try{
        const response = await api.post('/users',{
          email: this.state.email,
          password: this.state.password,
          name: this.state.user,
          cpf: this.state.cpf,
          birth: this.state.birhtDate,
          contact: this.state.contact
        }) ;
          Alert.alert('Cadastro Efetuado com Sucesso')
          this.setState({load:false})
          this.props.navigation.navigate('Login')
      } catch (response){
        //this.setState({errorMessage: response.data.error });
        console.log(response)
        this.setState({load:false})
        ToastAndroid.showWithGravityAndOffset(
          'Cadastro não efetuado com sucesso, virifique seus dados',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          200,
        );
        
      }                        
    }   
  } 
  _addMaskContactBr(contact){  
    try {
      contact =  contact.replace(/[^\d]+/g,'');
      this.setState({ contact: contact });
      if(contact.length == 10){
        contact = (contact.length > 1 ? "(" : "")+contact.substring(0, 2) + (contact.length > 2 ? ")" : "")+(contact.length > 2 ? " " : "") + contact.substring(2,6) + (contact.length > 3 ? "-" : "") + contact.substring(6, 10);
      } else {
        contact = (contact.length > 1 ? "(" : "")+contact.substring(0, 2) + (contact.length > 2 ? ")" : "")+(contact.length > 2 ? " " : "") + contact.substring(3,2) + (contact.length > 3 ? " " : "") + contact.substring(3, 7) + (contact.length > 7 ? "-" : "") + contact.substring(7, 12);
      }
    } catch(e){
      this.setState({ contact: contact });
    }
    return contact;
  }
  cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'eye':
      'eye-off';

    return (
      <Icon2 size={24} name={name}  color='#01A83E' onPress={this.onAccessoryPress}/>
    );
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }
  handlePicker =(date)=>{
    this.setState({
        isVisible: false,
        birhtDate: moment(date).format('DD/MM/YYYY')
    })
  }
  hidePicker =()=>{
    this.setState({
        isVisible: false       
    })
  }
  showPicker =()=>{
    this.setState({
        isVisible: true
    })
  }
  render() {
  return (
    <>    
      <LoadingScreen enabled = {this.state.load}/>
      <View style = {{flexGrow:1, backgroundColor: '#01A83E', marginBottom: wp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: wp('4%'), color:'white', marginHorizontal: wp('15%')}}> Faça seu cadastro para aproveitar os descontos dos parceiros participantes</Text>
      </View>
      <ScrollView style = {{ backgroundColor: "white"}}>         
            <View style = {styles.field}>
              <TextField
                style={styles.input}
                label = 'Nome'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => { this.email.focus(); }}
                onChangeText = {user =>{(this.setState({user}))}}
              />
              <TextField
                style={styles.input}
                ref={(input) => { this.email= input; }}
                label = 'E-mail'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                autoCapitalize ='none'
                onSubmitEditing={() => { this.password.focus(); }}              
                onChangeText = {email =>{(this.setState({email}))}}
              />            
              <TextField
                style={styles.input}
                ref={(input) => { this.password= input; }}
                label = 'Senha'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                secureTextEntry = {this.state.secureTextEntry}
                lineWidth = {2}
                autoCapitalize = 'none'
                fontSize = {17}
                onSubmitEditing={() => { this.confirm.phone(); }}              
                onChangeText = {password =>{(this.setState({password}))}}
                renderRightAccessory = {this.renderPasswordAccessory}
              />
              <TextField
                style={styles.input}
                ref={(input) => { this.phone = input; }}
                label = 'Telefone'
                keyboardType = 'phone-pad'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => { this.cpf.focus(); }}           
                formatText={value => this._addMaskContactBr(value)}
              />            
              <TextField
                style={styles.input}
                ref={(input) => { this.cpf = input; }}
                label = 'CPF'
                keyboardType = 'phone-pad'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => {this.showPicker()}}
                onChangeText = {cpf =>{(this.setState({cpf}))}}
                formatText = {value =>this.cpfMask(value)}
              />             
              <TextField
                style={styles.input}
                ref={(input) => { this.cpf = input; }}
                label = 'Aniversário'
                keyboardType = 'phone-pad'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                placeholder = {this.state.birhtDate}
                onFocus = {()=>this.showPicker()}
              />  
              <DateTimePicker
                  isVisible={this.state.isVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode = {'date'}
              />   
            </View>
            <View style= {styles.divider}/>
            <Button
              type = 'outline'
              title = 'Cadastrar'
              titleStyle = {styles.btnLabel}
              buttonStyle = {styles.btnLogin}
              onPress = {()=>this.Cadastra()}
            /> 
      </ScrollView>  
    </>
  );
  }
};


const styles = StyleSheet.create({
  divider:{
    height: wp('5%')
  },
  main: {
    backgroundColor: '#01A83E',
    flex:1
  },
text:{
   alignSelf:'center',
   fontSize: wp('9%'),
   fontFamily: 'roboto',
   color: 'white',
 },
 field:{
  color:'white',
  width: '80%',
  alignSelf: 'center',
}, 
 Logo:{  
   alignSelf: 'center',
   width: wp('20%'),
   height:hp('15%'),
   resizeMode: 'contain'
 },
 input: {
  marginTop: 2
},
 btnImg:{
    //marginStart: hp('30%'),
    //marginTop: wp('%'),
    //marginStart: wp('45%'),
    width: wp('25%'),
    height: hp('25%'),
    resizeMode: 'contain'
 },
 birthDate2:{
     marginTop: wp('3%'),
     justifyContent : 'flex-start',
     borderBottomColor: 'white',
     borderBottomWidth: 2,
     borderWidth: 0,
 },
 birthDate1:{
   color: 'white',
   alignItems:'flex-start',
   justifyContent:'flex-start'
 },
 buttonLogin:{
  //width: wp('10%'),
  height: hp('15%'),
  marginLeft: hp('30%'),
  borderRadius: wp('10%'),
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
},
textMin1: {
//  marginEnd: wp('65%'),
  //marginTop: hp('15%')
},
textMin2:{
 /* , */
  color: 'white',
  fontSize: wp('8%'),
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
});
