import { AppRegistry } from 'react-native';
import App from './App';  // Main App component
import { expo } from './app.json';  // Import 'expo' from app.json

AppRegistry.registerComponent(expo.name, () => App);  // Register the app component using 'expo.name'
