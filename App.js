import {createAppContainer} from 'react-navigation'; // Version can be specified in package.json

import {AppStackNavigator} from './navigators/AppNavigators'
export default createAppContainer(AppStackNavigator);