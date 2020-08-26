import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import api from './services/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome'

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
        companies: ''
    };
  }

  async componentDidMount(){
    try{
        const response = await api.get('/companies');
        this.setState({companies: response.body.data})
        console.log(response.body.data)
    }catch(reponse){
        console.log(reponse.code)
    }
  }

  render() {
    return (
      <View style = {styles.main}>
        <ScrollView>
            <Text style = {styles.title}>Locais que ajudam o meio ambiente apartir do QRUP</Text>
            <View style ={{height:hp('3%')}}/>
            <FlatList
                data = {this.state.companies}
                renderItem = {({item})=>
                <View style={styles.card} >
                    <Image source={{
                        uri:(api.defaults.baseURL + item.avatar_id)
                    }} style = {styles.compLogo}/>
                    <View style = {{paddingHorizontal:wp('4%')}}>
                        <Text style={styles.companieName}>{item.name}</Text>
                        <View style = {styles.textIcon}>
                            <Icon name = 'location-pin' size = {wp('4.5%')}/>
                            <Text style ={styles.cardSecond}>{item.address}</Text>
                        </View>                        
                        <View style = {styles.textIcon}>
                            <Icon2 name = 'phone' size = {wp('4%')}/>
                            <Text> </Text>
                            <Text style ={styles.cardSecond}>{item.contact}</Text>
                        </View>
                    </View>
                </View>
            }
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:wp('5%'),
        marginTop:hp('2%'),
        textAlign:'center',
        paddingHorizontal:wp('2%')
    }, 
    card:{
        marginTop: hp('1%'),
        backgroundColor: '#fff',
        height: hp('9%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: wp('1%'),
        marginBottom: hp('5%'),
        paddingHorizontal:wp('2%')
    },
    compLogo:{
        backgroundColor: 'gray',
        height: hp('9%'),
        width: wp('10%'),
        borderTopLeftRadius: wp('3%'),
        borderBottomLeftRadius: wp('3%'),
        //marginStart: wp('5%')
    },
    companieName:{
        fontSize:wp('4%'),
    },    
    textIcon:{
        flexDirection:'row'
    },
    cardSecond:{
      fontSize: wp('3.5%'),
    },
})