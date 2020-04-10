import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
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

export default class EditProfile extends Component {
    state={
        contact:'',
        avatar_id: '',
        birth:'',
    }
    async componentDidMount(){
        this.setState ({
            contact:  await AsyncStorage.getItem('@Qrup:u_contact'),       
            avatar_id: await AsyncStorage.getItem('@Qrup:u_avatar_id'),
            birth: await (await AsyncStorage.getItem('@Qrup:u_bday')).slice(0, 11),     
        })
        console.log(this.state.pontos)
    }
  render() {
    return (
        <>
            <Text>{this.state.contact}</Text>
            <Text>{this.state.avatar_id}</Text>
            <Text>{this.state.birth}</Text>
        </>
    );
  }
}
