import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login'
import Root from './Root'
import Reader from './Reader'
import Register from './Register'

const App = createStackNavigator({
          Login: Login,
          User: Root,  
          Reader: Reader,
          Register: Register,
        },
        {
          initialRouteName: 'Login',
          headerMode: 'none',
          navigationOptions: {
           headerVisible: false,
        }
        }
);

export default createAppContainer(App);