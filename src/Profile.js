import React, { Component } from 'react'
import { Text, 
        StyleSheet,
        View,
        TouchableOpacity,
    } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'  
import {Button, Avatar} from 'react-native-elements'
import api from './services/api'
import ImagePicker from 'react-native-image-crop-picker';

export default class Profile extends Component {
    state={
        user:'',
        pontos: '',
        id:'',
        token:'',
        avatar: '',   
        will_update: null,
    }
    async updateUserData(){
        try{
            const response = await api.get('/users/'+this.state.id,
                {
                    headers:{
                        Authorization : "Bearer " + this.state.token
                    }
                }) ;
              await AsyncStorage.setItem('@Qrup:user',response.data.name)       
              await AsyncStorage.setItem('@Qrup:u_contact', JSON.stringify(response.data.contact))
              await AsyncStorage.setItem('@Qrup:u_avatar_id', response.data.avatar_id)
              await AsyncStorage.setItem('@Qrup:u_points', JSON.stringify(response.data.points.total))
              await AsyncStorage.setItem('@Qrup:u_email', response.data.email)
              this.setState ({
                user:  await AsyncStorage.getItem('@Qrup:user'),       
                id: await AsyncStorage.getItem('@Qrup:u_id'),
                token: await AsyncStorage.getItem('@Qrup:token'),            
                pontos: await AsyncStorage.getItem('@Qrup:u_points'),
                avatar : await AsyncStorage.getItem('@Qrup:u_avatar_id')
             })
          } catch (response){
            //this.setState({errorMessage: response.data.error });     
            this.setState({load:false})
          }
    }
    async componentDidMount(){
        this.setState ({
            user:  await AsyncStorage.getItem('@Qrup:user'),       
            id: await AsyncStorage.getItem('@Qrup:u_id'),
            token: await AsyncStorage.getItem('@Qrup:token'),            
            pontos: await AsyncStorage.getItem('@Qrup:u_points'),
            avatar : await AsyncStorage.getItem('@Qrup:u_avatar_id')
        })
        this.state.will_focus = this.props.navigation.addListener('willFocus', async () =>(this.updateUserData()))
    }
    Exit =async()=>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
    selectPick(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            mediaType: 'photo'
          }).then(image => {
            this.pickSelected(image)
          })
    }

    async pickSelected(image){
        let form = new FormData();

            let name = image.path.split('/')
            form.append('file',{
                uri: image.path,
                type: image.mime,
                name: name[name.length-1]
            })     
             
         try{ 
            let res = await api.post('/files?role=user', form,
                {
                    headers:{
                        Authorization : "Bearer " + this.state.token
                    }
                })
        } catch(res){
            console.log('Falhou imagem update')
        }
    }
    async componentWillUnmount(){
        this.state.will_focus.remove(); 
    } 
    render() {    
        return (
            <View style ={{backgroundColor: '#f5f5f5', height:hp('100%')}}>             
                <View style= {styles.Perfil}>
                    <View style = {{backgroundColor: '#01A83E', marginBottom: wp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: wp('100%')}}>
                        <View style ={{height: wp('2%')}}/>
                        <Avatar
                            rounded
                            size= 'xlarge'
                            source ={{
                                uri : (api.defaults.baseURL + this.state.avatar)
                            }}
                            showEditButton
                            onPress={()=>this.selectPick()}
                        />
                        <Text  style = {styles.nameDesg}>{this.state.user}</Text>
                        {/*<Text style= {styles.pontDesgr}> {this.state.pontos} Pontos</Text>*/}
                    </View>
                    <View style = {styles.Butons}>
                        <TouchableOpacity 
                            onPress = {()=>this.props.navigation.navigate('Qrups')}>
                            <Text style = {styles.btnTxt}>QRups</Text>
                            <Text style = {styles.subTxt}>Gerencie seus Qrups</Text>
                        </TouchableOpacity>
                    </View>    
                    <View style = {styles.Sbutons}>
                        <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Edit')}>
                            <Text style = {styles.btnTxt}>Editar</Text>
                            <Text  style ={styles.subTxt}>Nome de Preferência, Telefone, Email</Text>                            
                        </TouchableOpacity>
                    </View>             
                    <View style = {styles.Sbutons}>
                        <TouchableOpacity>
                            <Text style = {styles.btnTxtnS}>Me Ajuda</Text>                         
                        </TouchableOpacity>
                    </View>           
                </View>
                <View style = {{marginTop: wp('25%')}}> 
                    <Button
                        type = 'outline'
                        title = 'Sair'
                        titleStyle = {styles.btnLabel}
                        buttonStyle = {styles.btnLogout}
                        onPress = {()=>this.Exit()}
                    /> 
                </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    Perfil:{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    Disgraca:{ 
        marginTop: wp('3%'),
        width: wp('35%'),
        height: wp('35%'),
        borderRadius: wp('17.5%')
        //backgroundColor: 'red'
    },
    nameDesg:{
        color:'white',
        marginTop:wp('5%'),
        fontSize: wp('6%'),
        marginBottom: wp('2%')
    },
    pontDesgr:{
        color:'white',
        marginTop: wp('2%'),
        fontSize:wp('5%'),
        marginBottom: wp('2%')
    },
    Butons:{
        width: wp('90%'),
        marginTop:wp('5%'),
        marginBottom: wp('5%'),
        borderRadius: wp('1%'),
        backgroundColor: 'white',
        elevation: 5
    },
    Sbutons:{        
        width: wp('90%'),
        marginBottom: wp('5%'),
        elevation: 5,        
        borderRadius: wp('1%'),
        backgroundColor:'white',
        height: wp('14%'),
        justifyContent: 'center'
    },
    btnTxtnS:{
        fontSize: wp('4%'),
        marginBottom: wp('3%'),
        marginLeft: wp('5%'),
        color: '#707070'
    },
    btnTxt:{
        fontSize: wp('4%'),
        marginTop: wp('2%'),
        marginBottom: -wp('0.5%'),
        marginLeft: wp('5%'),
        color: '#707070'
    },
    subTxt:{        
        fontSize: wp('3%'),
       // marginTop: wp('3%'),
        marginBottom: wp('2%'),
        marginLeft: wp('5%'),
        color: '#707070'
    },
	btnLogout:{
       // marginTop: wp('75%'),
        width: '40%',
        backgroundColor: 'white',
        borderColor: '#01A83E',
        borderWidth: 2,
		alignSelf: 'center'
    },
	btnLabel:{
		color:'#01A83E',
		fontSize: wp('5%'),
	},
})
