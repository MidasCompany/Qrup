import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {Header} from 'react-native-elements'
import ExtractCard from './components/ExtractCard'
export default class Extract extends Component {
  constructor(props) {
    super(props);
    this.state = {
        PickerValue : ''
    };
  }
  render() {
    return (
      <View style ={{alignItems: 'center'}}>
          <Header
             containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                marginTop: -wp('4%'),
                borderBottomColor: 'white'
              }}
            leftComponent={<Icon name ='arrow-left' color = '#006300' style = {styles.Exit} onPress = {()=> this.props.navigation.navigate('MainProf')}/>}
            centerComponent={{text :'Extract', style:{color:'#006300', fontSize:wp('6%')}}}
          />
          <Picker style={styles.stPicker}
            selectedValue = {this.state.PickerValue}
            onValueChange ={(itemValue)=>this.setState({PickerValue:itemValue})}
            mode = 'dropdown'
          >
              <Picker.Item label = 'Todos' value = 'all'/>
              <Picker.Item label = 'Ganhos' value = 'aded'/>
              <Picker.Item label = 'Gastos' value = 'used'/>              
          </Picker>
          <ExtractCard
            title= '+20 Pontos'
            description = 'Retiro da Sé'
            points = '12'
            caralho ={false}
          />          
          <ExtractCard
            title= '- 15 Pontos'
            description = 'Retiro da Sé'
            points = '12'
            caralho ={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    Cabeca:{
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('100%'),
        alignContent: 'center',
        alignItems: 'center',
    },
    Titulo:{
        fontSize: wp('5%'),
        color: 'black',
        marginTop: wp('5%'),
    },
    Exit:{
        fontSize: wp('10%'),
       // marginEnd: wp('25%')
    },
    tIcon:{
        marginLeft: wp('5%'),
        marginTop: wp('5%')
    },
    stPicker:{
        width: wp('40%'),
    }
})