import React, {useEffect, useState} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens for authentication flow
import SignupNextScreen from './screens/SignupNextScreen';
import SignupScreen from './screens/SignupScreen';

// Import your screens for main flow
import HomeScreen from './screens/HomeScreen';

// Create authentication stack navigator
const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    SignupNext: {
      screen: SignupNextScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Signup',
    navigationOptions: {
      headerShown: false,
    },
  },
);

// Create main stack navigator
const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerShown: false,
    },
  },
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean);
  console.warn('islogged => ' + isLoggedIn);

  useEffect(() => {
    AsyncStorage.getItem('isLoggedIn')
      .then(value => {
        const isLogged = JSON.parse(value);
        setIsLoggedIn(isLogged);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const AppNavigator = createSwitchNavigator(
    {
      Auth: AuthStack,
      Main: MainStack,
    },
    {
      // initialRouteName: 'AuthMain',
      initialRouteName: isLoggedIn ? 'Main' : 'Auth', // show main stack if logged in, otherwise show auth stack
    },
  );

  // Wrap the switch navigator with an AppContainer
  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
}

// Export the AppContainer as the root component
export default App;
