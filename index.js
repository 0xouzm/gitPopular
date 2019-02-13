/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import {YellowBox} from 'react-native';
import {AppRegistry} from 'react-native';
import setup from './js/pages/setup';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent(appName, () => setup);
