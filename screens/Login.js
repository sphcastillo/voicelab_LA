import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, ImageBackground} from 'react-native';
import { Input} from "@rneui/themed";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { auth } from '../config';
import { login } from "../actions/auth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginUser = () =>  {

    auth.signInWithEmailAndPassword(email, password)
    .then(userAuth =>  {
      dispatch(
        login({
          email: userAuth.user.email,

        })
      )
    }).catch((error) => alert(error));
    
  }

  return (
    <KeyboardAvoidingView>
      <ImageBackground source={require('../assets/amy.jpeg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
      <Text style={{color: "#05353B", marginTop: 50, marginLeft: 20,  fontSize: 23, fontFamily: "Nunito"}}>VoiceLabLA</Text>
        <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.welcome}>
          WHERE SCIENCE 
          {"\n"} 
          MEETS THE VOICE
          {"\n"} 
      </Text>
        <View style={styles.inputContainer}>
            <Input 
                style={styles.inputField}
                placeholder='Email'
                // autoFocus
                type="email"
                value={email}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(email) => setEmail(email)}
            />
            <Input 
                style={styles.inputField}
                placeholder="Password"
                type="password"
                secureTextEntry
                value={password}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(password) => setPassword(password)}
            />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttons}
              title="Go to Login"
              onPress={() => loginUser(email, password)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttons}
              title="Go to SignUp"
              onPress={() => navigation.navigate('Registration')}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate('ForgotPassword')} 
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center', 
  },
  welcome: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    fontFamily: "Nunito",
    fontWeight: '700',
  },
  inputContainer: {
    padding: 10,
    borderColor: 'black',
    width: 300,
    backgroundColor: "#05353B",
    alignItems: 'center',
    height: 250,
    justifyContent: 'center',
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 4,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    backgroundColor: 'transparent',
    textDecorationColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    alignContent: 'center',
    fontSize: 18,
    
  },

  forgotPassword: {
    color: 'white',
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  overlay: {
    backgroundColor:'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%'
},
})