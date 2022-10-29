import { useState, useEffect, Suspense } from 'react';
import { firebase } from './config';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Registration';
import Dashboard from './screens/Dashboard';
import Registration from './screens/Registration';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  },[])

  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration}
          options={{headerShown: false}} 
        />
      </Stack.Navigator>
    )
  }

  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{headerShown: false}} 
        />
      </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
        <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
