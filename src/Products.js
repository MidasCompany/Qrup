import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput} from 'react-native'
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
export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Add')
    }
    Terte =() =>{
        alert("Testando Botão")
    }

    constructor(props) {
        super(props);    
        this.state = {
            descryption: 'copo do dakkee',
            type: '550ml',
            qr:'',
            user_id:'',
            insertCode: false,
            load: false,
            token: ''
        };
      }
      async componentDidMount(){
        this.setState ({
            user_id:  await AsyncStorage.getItem('@Qrup:u_id'),
            token: await AsyncStorage.getItem('@Qrup:token')
        })
    }
    onTextInsert = async() =>{
        if (this.state.qr.length === 0 ){
            alert('Insira o Código do Copo')
          } else{ 
            this.setState({load:true})
            try{
              const response = await api.post('/users/'+this.state.user_id+'/cups',{
                descryption : this.state.descryption,
                type: this.state.type,
                qr: this.state.qr,
              },
              {
                  headers:{
                      Authorization : "Bearer " + this.state.token
                  }
              }) ;
              this.setState({load:false, insertCode: false})
            } catch (response){
              //this.setState({errorMessage: response.data.error });     
              console.log(response)   
               this.setState({load:false})
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
          color: '#006300'
        },
        {
          text: "Escanear Código",
          icon: <Icon2 name="add-a-photo" style={styles.actionButtonIcon}/>,
          name: "scan",
          position: 2,
          color: '#006300'
        },
      ];
    render() {        
        return (
            <>     
                {/*<Text>{this.props.navigation.getParam('leitura')}</Text>*/}
                    <Modal
                        transparent = {true}
                        visible = {this.state.insertCode}
                    >
                    <LoadingScreen enabled = {this.state.load}/>
                    <View style = {styles.insertCode}>                            
                        <TextInput
                            placeholder = {'Insert Your Qrup Code Here'}
                            autoCapitalize = 'characters'
                            placeholderTextColor = '#006300'
                            style = {styles.inputCode}
                            onChangeText = {(qr)=>this.setState({qr})}
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
                    color= '#006300'
                    dismissKeyboardOnPress = {true}
                 />
            </>
        )
    }
}

const styles = StyleSheet.create({
    terte:{
        backgroundColor: 'red',
        fontSize: 20
    },
    ad:{
        fontSize: wp('15%'),
    },
    /*adView:{
        marginTop: hp('80%'),
        width: wp('20%'),
        height: hp('9%'),
        //backgroundColor: 'red',
        alignContent: 'center',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        textAlignVertical: 'center',
        resizeMode: 'contain'
    },*/
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
        marginTop: wp('95%'),
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
        marginTop: wp('4%'),
        backgroundColor: '#006300',
        width: wp('20%'),
		alignSelf: 'center'
    },
})