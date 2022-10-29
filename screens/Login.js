import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Image, Button, Input} from "@rneui/themed";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch (error){
      alert(error.message)
    }
  }

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text>VoiceLabLA</Text>
        <Text style={styles.welcome}>
          WHERE 
          {"\n"} 
          SCIENCE 
          {"\n"} 
          MEETS THE
          {"\n"}
          VOICE
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center', 
  },
  welcome: {
    textAlign: 'center',
    fontSize: 50,
  },
  inputContainer: {
    width: 275,
    height: 175,
    borderColor: 'black',
    borderWidth: 2,
    paddingTop: 10,
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttons: {
    backgroundColor: 'blue',
    height: 30,
    width: 100,
    textDecorationColor: 'white',
    marginTop: -10,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    alignContent: 'center',
    
  }
})