import React from 'react';
import {StatusBar} from 'react-native'
import Routes from './src/Routes';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
	render(){
		return (
			<>
				<StatusBar backgroundColor = "#50a488" barStyle="light-content" />
				<Routes />
			</>
		)
	}
}