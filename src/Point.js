import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChoseCupons from './ChoseCupons'
import PickCupons from './PickCupons'

const Point = createStackNavigator({
          Chose: ChoseCupons,
          Pick: PickCupons
        },
        {
          initialRouteName: 'Pick',
          headerMode: 'none',
          navigationOptions: {
           headerVisible: false,
        }
        }
);

export default createAppContainer(Point);