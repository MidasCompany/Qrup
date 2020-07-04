import React from 'react';
import {StatusBar} from 'react-native'
import Routes from './src/Routes';

export default class App extends React.Component {
	render(){
		return (
			<>
			{console.disableYellowBox = true}
				<StatusBar backgroundColor = 'black'/>
				<Routes />
			</>
		)
	}
}