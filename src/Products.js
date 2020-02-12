import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from  'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button';
import {FloatingAction} from 'react-native-floating-action'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default class Products extends Component {
    Scan = () =>{
        this.props.navigation.navigate('Add')
    }
    Terte =() =>{
        alert("Testando Botão")
    }
    func ={
        pen :this.Scan,
        exc: {},
        scan: this.Scan
    }
    actions = [
        {
          text: "Write Code",
          icon:  <Icon2 name="create" style={styles.actionButtonIcon}/>,
          name: "pen",
          position: 1
        },
        {
          text: "Exclude Item",
          icon: <Icon2 name="clear" style={styles.actionButtonIcon}/>,
          name: "exc",
          position: 1
        },
        {
          text: "Scan Code",
          icon: <Icon2 name="add-a-photo" style={styles.actionButtonIcon}/>,
          name: "scan",
          position: 3
        },
      ];
    render() {        
        return (
            <>                
                  
                <View>
                   {/*<Text>{this.props.navigation.getParam('leitura')}</Text>*/}
                    <View style= {styles.adView}>
                        {/*<TouchableOpacity onPress = {()=> this.Scan()}>
                            <Icon2 name='add-circle' color='#006300' style = {styles.ad}/>
                        </TouchableOpacity>*/}
                        {/*<ActionButton buttonColor="#006300" position = 'right' radius = {90} degress = {20}>
                            <ActionButton.Item buttonColor='#006300' onPress={() => console.log("notes tapped!")}>
                                <Icon2 name="clear" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#006300' onPress={() => {}}>
                                <Icon2 name="create" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#006300' onPress={() => console.log('oi tudo')}>
                                 <Icon2 name="add-a-photo" style={styles.actionButtonIcon}/>
                            </ActionButton.Item>
                        </ActionButton>   */}      
                    </View>   
                </View>                                 
                <FloatingAction
                            actions={this.actions}
                            onPressItem={name => {
                                this.func[name]()
                            }}
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
    adView:{
        marginTop: hp('80%'),
        width: wp('20%'),
        height: hp('9%'),
        //backgroundColor: 'red',
        alignContent: 'center',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        textAlignVertical: 'center',
        resizeMode: 'contain'
    },
    actionButtonIcon: {
        fontSize: wp('6%'),
        height: 30,
        color: 'white',
      },
})
