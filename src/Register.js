import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ToastAndroid,
  TextComponent,
  Alert
} from 'react-native';
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
import * as yup from 'yup'
import {Formik} from 'formik'

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
        secureTextEntry: true ,
        load: false,
        trueCpf: '',
    };
  }  
  Cadastra = async (values) => {   
      console.log(values)
      try{
        this.setState({load:true})
        const response = await api.post('/users',{
          email: values.email,
          password: values.password,
          name: values.user,
          cpf: values.cpf,
          birth: (moment(this.state.birhtDate, 'DD/MM/YYYY').format('YYYY-MM-DD')),
          contact: values.contact
        });
          this.setState({load:false})                
          Alert.alert('Parabéns, seu cadastro foi efetuado com sucesso', 
          'Para efetuar login, utilize seu E-mail com a sua Senha'
          )
          console.log(response)
          this.props.navigation.navigate('Login')
      } catch (response){
        console.log(response)
        this.setState({load:false})
        let erro = response.response.data;
        if (erro === 'CPF is invalid'){
          ToastAndroid.showWithGravityAndOffset(
            'CPF INVALIDO',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200,
          );
        } else if(error = 'User already exists'){
          this.setState({load:false})
          ToastAndroid.showWithGravityAndOffset(
            'Email já cadastrado',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            200,
          );
        }else {
          this.setState({load:false})
          ToastAndroid.showWithGravityAndOffset(
            'Cadastro não efetuado, verifique seus dados',
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
  cpfMask (value) {
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
      <View style = {{flexGrow:1, backgroundColor: '#01A83E', marginBottom: hp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: wp('4%'), color:'white', marginHorizontal: wp('15%')}}> Faça seu cadastro para aproveitar os descontos dos parceiros participantes</Text>
      </View>
      <ScrollView style = {{ backgroundColor: "white"}}>     
            <Formik 
              initialValues = {{user: '', email:'', password: '', contact: '', cpf:''}}
              validationSchema ={
                yup.object().shape({
                  user: yup.string()
                  .required('Insira um usuário'),
                  email: yup.string()
                  .required('Inisra um email')
                  .email('Insira um email válido'),
                  password: yup.string()
                  .required('Inisra uma senha')
                  .min(5, 'Senha muito curta'),
                  contact: yup.string()
                  .required('Inisra um telefone')
                  .min(11),
                  cpf: yup.string()
                  .required('Insira um CPF')
                })
              }
              onSubmit={(values)=>{
                console.log(values)
                this.Cadastra(values)
              }}
            >
              {({values, handleChange,errors, handleSubmit})=>(    
                  <View style = {styles.field}> 
                    <TextField
                    style={styles.input}
                    label = 'Nome'
                    tintColor = 'rgba(1, 168, 62, 1)'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    lineWidth = {2}
                    fontSize = {17}
                    value = {values.user}
                    onChangeText = {handleChange('user')}
                    onSubmitEditing={() => this.password.focus()}    
                    error = {errors.user}
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
                    onSubmitEditing={() => this.onSubmitEmail()}              
                    onChangeText = {handleChange('email')}
                    error= {errors.email}
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
                    error = {errors.password}
                    onSubmitEditing={() => { this.phone.focus(); }}              
                    onChangeText = {handleChange('password')}
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
                    error = {errors.contact}
                    onSubmitEditing={() => { this.cpf.focus(); }}                  
                    onChangeText = {handleChange('contact')}         
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
                    maxLength= {11}
                    fontSize = {17}
                    error = {errors.cpf}
                    onChangeText = {handleChange('cpf')}
                    onSubmitEditing={() => {this.showPicker()}}
                  />             
                  <TextField
                    style={styles.input}
                    label = 'Aniversário'
                    keyboardType = 'phone-pad'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    lineWidth = {2}
                    fontSize = {17}
                    placeholder = {this.state.birhtDate}
                    onChangeText = {handleChange('birth')}
                    onFocus = {()=>this.showPicker()}
                    error = {this.state.errorBirth}
                  />  
                  <DateTimePicker
                      isVisible={this.state.isVisible}
                      onConfirm={this.handlePicker}
                      onCancel={this.hidePicker}
                      mode = {'date'}
                  />               
                  <View style= {styles.divider}/>
                  <Button
                    type = 'outline'
                    title = 'Cadastrar'
                    titleStyle = {styles.btnLabel}
                    buttonStyle = {styles.btnLogin}
                    onPress = {handleSubmit}
                  />  
                </View>
              )}
            </Formik>
             {/*<TextField
                style={styles.input}
                label = 'Nome'
                tintColor = 'rgba(1, 168, 62, 1)'
                baseColor = 'rgba(1, 168, 62, 1)'
                textColor = 'rgba(1, 168, 62, 1)'
                lineWidth = {2}
                fontSize = {17}
                onSubmitEditing={() => this.onSubmitName()}
                onChangeText = {user =>{(this.setState({user}))}}
                error = {this.state.errorUser}
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
                onSubmitEditing={() => this.onSubmitEmail()}              
                onChangeText = {email =>{(this.setState({email}))}}
                error= {this.state.errorEmail}
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
                onSubmitEditing={() => { this.phone.focus(); }}              
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
                onChangeText = {contact =>{(this.setState({contact}))}}         
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
                maxLength= {11}
                fontSize = {17}
                onChangeText = {trueCpf =>{this.setState({trueCpf})}}
                onSubmitEditing={() => {this.showPicker()}}
                //formatText = {value =>this.cpfMask(value)}
              />             
              <TextField
                style={styles.input}
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
              />   */}
            
      </ScrollView>  
    </>
  );
  }
};


const styles = StyleSheet.create({
  divider:{
    height: hp('5%')
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

btnLogin:{
  marginTop: hp('4%'),
  borderRadius: wp('2%'),
  alignSelf: 'center',
  width: '40%',
  backgroundColor: '#01A83E',
},
btnLabel:{
  color:'white',
  fontSize: wp('5%'),
},
});
