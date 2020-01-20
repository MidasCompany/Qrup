import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login'
import Root_ from './Root_'
import Reader from './Reader'
import Register from './Register'

const App = createStackNavigator({
          Login: Login,
          User: Root_,  
          Reader: Reader,
          Register: Register,
        },
        {
          initialRouteName: 'User',
          headerMode: 'none',
          navigationOptions: {
           headerVisible: false,
        }
        }
);

export default createAppContainer(App);