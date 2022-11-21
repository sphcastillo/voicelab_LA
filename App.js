import { useState, useEffect, Suspense } from 'react';
import { firebase } from './config';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Registration from './screens/Registration';
import ForgotPassword from './screens/ForgotPassword';
import { Provider } from "react-redux";
import { store } from "./store";
import Header from './components/Header';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito.ttf'),
    // 'Nunito-SemiBold': require('./assets/fonts/NunitoSans-SemiBold.ttf')
  })
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
      <Stack.Navigator
      >
        
        <Stack.Screen 
          options={{headerShown: false}}
          name="Login" 
          component={Login}
          
        />
        <Stack.Screen 
          name="Registration" 
          component={Registration}
          options={{
            headerTitle: () => <Header name=""/>
          }} 
        />

        <Stack.Screen 
          options={{headerShown: false}}
          name='ForgotPassword'
          component={ForgotPassword}
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
    <Provider store={store}>
      <NavigationContainer>
          <App/>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
  },
});
