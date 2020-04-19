import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
        isVisible: false,
        user:'',
        contact:'',        
        email: '',
        load: false
    };
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
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'eye':
      'eye-off';

    return (
      <Icon size={24} name={name}  color='#01A83E' onPress={this.onAccessoryPress}/>
    );
  }
  async atualizaCadastro(){
    this.setState({load:true})
    try{
      const response = await api.put('/users/' + await AsyncStorage.getItem('@Qrup:u_id'),{    
          name: this.state.user,
          email: this.state.email,
          contact: this.state.contact
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
      console.log(response)      
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
  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }
  async componentDidMount(){
      this.setState ({
          user:  await AsyncStorage.getItem('@Qrup:user'),       
          email: await AsyncStorage.getItem('@Qrup:u_email'),
          phone: await AsyncStorage.getItem('@Qrup:u_contact'),     
      })
  }
  render() {
    return (
        <>
          <LoadingScreen enabled = {this.state.load}/>
          <View style = {{height: hp('10%'), backgroundColor: '#01A83E', marginBottom: wp('1%'),width:wp('100%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontSize: wp('4%'), color:'white', marginHorizontal: wp('15%')}}> Atualize seus dados aqui</Text>
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
                    placeholder = {this.state.user}
                  />         
                  <TextField
                    style={styles.input}
                    ref={(input) => { this.email = input; }}
                    label = 'Email'
                    tintColor = 'rgba(1, 168, 62, 1)'
                    baseColor = 'rgba(1, 168, 62, 1)'
                    textColor = 'rgba(1, 168, 62, 1)'
                    lineWidth = {2}
                    fontSize = {17}
                    onSubmitEditing={() => { this.phone.focus(); }}
                    onChangeText = {email =>{(this.setState({email}))}}                    
                    placeholder = {this.state.email}
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
                    onSubmitEditing={() => { this.atualizaCadastro() }}           
                    formatText={value => this._addMaskContactBr(value)}
                    placeholder = {this.state.phone}
                  />  
                </View>
                <View style= {styles.divider}/>
                <Button
                  type = 'outline'
                  title = 'Atualizar'
                  titleStyle = {styles.btnLabel}
                  buttonStyle = {styles.btnLogin}
                  onPress = {()=>this.atualizaCadastro()}
                /> 
                <View style ={{alignSelf: 'center',flexDirection: 'row', marginTop: wp('5%')}}>
                    <Text style ={{color: 'rgba(1, 168, 62, 1)',fontSize: wp('4,85409%'),	textAlign: "center",marginBottom: 20}}>Quer trocar a senha? </Text>
                    <TouchableOpacity 
                        onPress = {()=>this.props.navigation.navigate('EditPassword')}>
                      <Text style={styles.txtStyle}>pressione aqui</Text>
                    </TouchableOpacity>
                  </View>
          </ScrollView>
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
