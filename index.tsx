import { AppRegistry } from 'react-native';
import App from './App';  // Import the main app component
import * as appConfig from './app.json';  // Import the entire app.json file

const { name } = appConfig.expo;  // Access 'expo' and get 'name'

AppRegistry.registerComponent(name, () => App);  // Register the app component as the entry point
