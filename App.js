import { useState, useEffect, Suspense } from "react";
import { firebase } from "./services/config";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import { useFonts } from "expo-font";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login";
import DashboardScreen from "./screens/Dashboard";
import RegistrationScreen from "./screens/Registration";
import ForgotPasswordScreen from "./screens/ForgotPassword";

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    Nunito: require("./assets/fonts/Nunito.ttf"),
    Nunito: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Voice Lab LA" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen  name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
