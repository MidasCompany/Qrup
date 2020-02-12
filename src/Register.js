import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Logo from '../Images/qrup_semroda_semsombra.png'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInputMask} from 'react-native-masked-text';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Button} from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
export default class Register extends React.Component {
   Login = () => {
    this.props.navigation.navigate('Login')
  }
  Cadastra = () => {
    this.props.navigation.navigate('User', {user: this.state.user})
  } 
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        user:'',
        aux:'',
        cpf:'',
        birhtDate: 'Nascimento',
        phoneBr: ''
    };
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
        
        <View style = {styles.main}>
          <Image source = {Logo} style={styles.Logo}/>
          <Text style={styles.text}> QRUP</Text>
          <View style = {styles.field}>
            <TextField
              style={styles.input}
              label = 'Nome'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.email.focus(); }}
              onChangeText = {user =>{(this.setState({user}))}}
            />
            <TextField
              style={styles.input}
              ref={(input) => { this.email= input; }}
              label = 'E-mail'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.password.focus(); }}
            />            
            <TextField
              style={styles.input}
              ref={(input) => { this.password= input; }}
              label = 'Senha'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.confirm.focus(); }}
            />
            <TextField
              style={styles.input}
              ref={(input) => { this.confirm= input; }}
              label = 'Confirme sua Senha'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.phone.focus(); }}
            /> 
            <TextField
              style={styles.input}
              ref={(input) => { this.phone = input; }}
              label = 'Telefone'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.cpf.focus(); }}
            />             
            <TextField
              style={styles.input}
              ref={(input) => { this.cpf = input; }}
              label = 'CPF'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => {this.showPicker()}}
            />             
           { /*<TextField
              style={styles.input}
              ref={(input) => { this.birth = input; }}
              onFocus = {() => {this.showPicker}}
              label = 'Nascimento'
              keyboardType = 'phone-pad'
              tintColor = 'rgb(255,255,255)'
              baseColor = 'rgba(255,255,255,1)'
              textColor = 'rgba(255,255,255,1)'
              lineWidth = {2}
              fontSize = {17}
              onSubmitEditing={() => { this.cpf.focus(); }}
           /> */}
            {/*<TouchableOpacity 
                style ={styles.birthDate2}
                onPress ={()=>this.showPicker()} >
                <Text
                    style ={ styles.birthDate1}>
                        {this.state.birhtDate}
                </Text>
            </TouchableOpacity>*/}
            <Button
              type = 'outline'
              title = {this.state.birhtDate}
              titleStyle = {styles.birthDate1}
              buttonStyle = {styles.birthDate2}
              onPress = {()=>this.showPicker()}
            />
            <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode = {'date'}
            />   
          </View>
          <Button
            type = 'outline'
            title = 'Cadastrar'
            titleStyle = {styles.btnLabel}
            buttonStyle = {styles.btnLogin}
            onPress = {()=>this.Cadastra()}
          /> 
        </View>
    </>
  );
  }
};


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#006300',
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
  width: '80%',
  backgroundColor: 'white',
},
btnLabel:{
  color:'#006300',
  fontSize: wp('5%'),

},
});
