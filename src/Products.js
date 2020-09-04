import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, FlatList, TouchableOpacity, ToastAndroid, Alert} from 'react-native'
import QrupLogo from '../Images/qrup_semroda_semsombra.png'
import {Button} from 'react-native-elements'
import Icon2 from  'react-native-vector-icons/MaterialIcons'
import {FloatingAction} from 'react-native-floating-action'
import AsyncStorage from '@react-native-community/async-storage'  
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
import api from './services/api';
import LoadingScreen from './components/LoadingScreen';
import Icon from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome5'


const DATA =[
    {
        id: '1',
        description : 'QRUP 1',
        pontos: '30',
        qr:'alefrango29'
    },
];
export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Add')
    }
    Qrup =() =>{
        alert("Testando Botão")
    }

    constructor(props) {
        super(props);    
        this.state = {
            description: '',
            qr:'',
            user_id:'',
            insertCode: false,
            load: false,
            token: '',  
            will_update: null  ,
            refreshing: false,
            cupsList: '',
        };
    }
    async loadProducts (){
        try{
            const response = await api.get('/users/'+this.state.user_id+'/cups',
            {
                headers:{
                    Authorization : "Bearer " + this.state.token
                }
            }) ;
            this.setState({cupsList: response.data.body, refreshing:false})
        } catch (response){
            //this.setState({errorMessage: response.data.error });     
            this.setState({load:false, refreshing:false})
            /*ToastAndroid.showWithGravityAndOffset(
                'Problema para carregar os copos',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );*/
        }
    }
    async componentDidMount(){
        this.setState ({
            user_id:  await AsyncStorage.getItem('@Qrup:u_id'),
            token: await AsyncStorage.getItem('@Qrup:token')
        })
        this.loadProducts()
    }

    handleRefresh = ()=>{
        this.setState({
            refreshing: true
        })
        this.loadProducts()
    }
    async confirmExclude(qrcup){
        //console.log('/users/'+this.state.user_id+'/cups/'+qrcup)
        try{
            const response = await api.delete('/users/'+this.state.user_id+'/cups/'+qrcup,
            {
                headers:{
                    Authorization : "Bearer " + this.state.token
                }
            })
            ToastAndroid.showWithGravityAndOffset(
                'Copo excluido com sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );
            this.componentDidMount()
        }catch(response){
            ToastAndroid.showWithGravityAndOffset(
                'Problema para excluir o copo',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                200,
            );
        }
    }
    async onExcudeItem(qrcup, cupdescription){
        Alert.alert(
            'Tem certeza que deseja excluir o Copo ' + cupdescription +'?',
            'Após excluir o item, o mesmo não poderá mais ser utilizado',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Sim, excluir copo', onPress: ()=> this.confirmExclude(qrcup)}
                
            ],
            {cancelable: true}
        )
    }
    onTextInsert = async() =>{
        if (this.state.qr.length === 0 || this.state.description.length === 0){
            alert('Preencha todos os campos para adicionar Copo')
          } else{ 
            this.setState({load:true})
            try{
              const response = await api.post('/users/'+this.state.user_id+'/cups',{
                description : this.state.description,
                qr: this.state.qr,
              },
              {
                  headers:{
                      Authorization : "Bearer " + this.state.token
                  }
              }) ;
              this.setState({load:false, insertCode: false})
              this.loadProducts();
            } catch (response){ 
               this.setState({load:false})
               console.log(response.code);
               alert("Código não confere")
            }                        
          } 
    }
    
    alterMode = () =>{
        if (this.state.insertCode=== true){
           this.setState({insertCode: false});
         } else if (this.state.insertCode === false){
             this.setState({insertCode: true})
         }
     };
     Close =()=>{
         this.setState({insertCode : false})
     }
    func ={
        pen :this.alterMode,
        scan: this.Scan
    }
    
    actions = [
        {
          text: "Escrever Código",
          icon:  <Icon2 name="create" style={styles.actionButtonIcon}/>,
          name: "pen",
          position: 1,
          color: '#01A83E'
        },
        {
          text: "Escanear Código",
          icon: <Icon2 name="add-a-photo" style={styles.actionButtonIcon}/>,
          name: "scan",
          position: 2,
          color: '#01A83E'
        },
      ];
    render() {        
        return (
            <>     
                <View style = {{backgroundColor: '#01A83E', marginBottom: hp('1%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: wp('100%')}}>
                    {/*<Text  style = {{marginVertical: wp('5%'), fontSize: wp('7%'), color:'white'}}>Meus Qrup's</Text>*/}
                    <Text style = {{fontSize: wp('4%'), color:'white', marginBottom: hp('3.5%')}}> Seus qrups cadastrados ficam aqui</Text>
                </View>
                
                <View style ={{marginTop: -hp('1%'),height: hp('80%'), backgroundColor: '#f5f5f5'}}> 
                    {this.state.cupsList.length ? (
                         <></>
                    ):(<Text style = {{alignSelf:'center', marginTop:hp('3%')}}> Sem Copos Cadastrados</Text>)}
                    <FlatList
                        data={this.state.cupsList}
                        //data = {DATA}
                        renderItem={({ item }) =>   <View style = {styles.main}> 
                                                        <View style = {styles.Qrup}>
                                                            <Icon size={wp('8%')} name= 'cup'  color='#01A83E' style ={{marginLeft: wp('4%')}}/>
                                                            <View style = {styles.stats}>
                                                                <Text style = {{marginTop: -wp('1%'), fontSize: wp('5%')}}>{item.description}</Text>
                                                                <Text style = {{fontSize: wp('3%')}}>{item.qr}</Text>
                                                            </View>
                                                            <TouchableOpacity style={{marginRight: wp('4%')}} onPress ={()=>this.onExcudeItem(item.qr, item.description)}>
                                                                <Icon3 size={wp('5%')} name= 'trash-alt'  color='red' style ={{marginLeft: wp('4%')}}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View> }
                        keyExtractor={item => item.qr}                        
                        refreshing = {this.state.refreshing}
                        onRefresh ={this.handleRefresh}
                    />  
                        <Modal
                            transparent = {true}
                            visible = {this.state.insertCode}
                        >
                        <LoadingScreen enabled = {this.state.load}/>
                        <View style = {styles.insertCode}>                            
                            <TextInput
                                placeholder = {'Insira seu código Qrup Aqui'}
                                autoCapitalize = 'none'
                                placeholderTextColor = '#006300'
                                style = {styles.inputCode}
                                onChangeText = {(qr)=>this.setState({qr})}
                                onSubmitEditing = {()=>this.onTextInsert()}
                            />
                            <TextInput
                                placeholder = {'De um nome para o seu Qrup'}
                                autoCapitalize = 'none'
                                placeholderTextColor = '#006300'
                                style = {styles.inputCode2}
                                onChangeText = {(description)=>this.setState({description})}
                                onSubmitEditing = {()=>this.onTextInsert()}
                            />                        
                            <View style = {styles.buttons}>
                                <Button
                                    type = "solid"
                                    title = "Cancel"                                    
                                    buttonStyle = {styles.btn}
                                    onPress = {()=>this.alterMode()}
                                />
                                <Button
                                    type = "solid"
                                    title = "Ok"
                                    buttonStyle = {styles.btn}
                                    onPress = {()=> this.onTextInsert()}
                                />
                            </View>
                        </View>
                    </Modal>                      
                    <FloatingAction
                        actions={this.actions}
                        onPressItem={name => {
                            this.func[name]()
                        }}
                        color= '#01A83E'
                        dismissKeyboardOnPress = {true}
                        distanceToEdge = {hp('20%'), wp('10%')}
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    Qrup:{
        backgroundColor: 'red',
        fontSize: 20
    },
    ad:{
        fontSize: wp('15%'),
    },   
    actionButtonIcon: {
        fontSize: wp('6%'),
        height: 30,
        color: 'white',
    },
    insertCode:{
        backgroundColor: 'rgba(68, 68, 68, 0.6)',
        width: wp('100%'),
        height: hp('100%'),
        marginLeft: -wp('5%')
    },
    inputCode:{
        fontSize: wp('3%'),
        alignSelf: 'center',
        marginTop: hp('40%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#006300',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('1%'),
        color: '#006300'
    },
    inputCode2:{
        fontSize: wp('3%'),
        alignSelf: 'center',
        marginTop: hp('2%'),
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.3%'),
        borderColor: '#006300',
        width: wp('60%'),
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: wp('1%'),
        color: '#006300'
    },
    buttons:{
        //backgroundColor: 'rgba(68, 68, 68, 0.6)',
        width: wp('55%'),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    btn:{
        marginTop: hp('4%'),
        backgroundColor: '#006300',
        width: wp('20%'),
		alignSelf: 'center'
    }, 
    main:{
        marginTop: hp('3%'),
        backgroundColor: '#fff',
        height: hp('8%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: wp('1%'),
        marginBottom: hp('3%')
    },
    qrupIcon:{
        height: hp('9%'),
        width: wp('15%'),
        marginStart: wp('5%'),
        justifyContent: 'center',
        borderRadius: wp('1%')
    },
    title:{
        marginTop: hp('2%'),
        fontSize: wp('5%')
    },
    description:{
        //marginStart: wp('20%'),
        alignSelf: 'center',
        fontSize: wp('3,23606%'),
    },
    descCont:{
        width: 0,
        flexGrow: 1,        
    },
    cost:{
        fontSize: wp('4,12%'),
        alignSelf: 'flex-end',
        marginEnd: wp('4%'),
    },
    Qrup:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    stats:{
        marginStart: wp('3%'),
        flexGrow: 1,
        width:0,
    },
})