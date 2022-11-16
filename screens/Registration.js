import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, StatusBar, TouchableOpacity, Keyboard} from 'react-native';
import React, { useState } from 'react';
import { Image, Button} from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { auth, firebase } from '../config';
import { useDispatch } from 'react-redux';
import { login } from "../slices/userSlice";
import { Icon } from "@rneui/themed";
import Input from '../components/Input';




const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const {inputs, setInputs} = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  // })

  const [errors, setErrors] = useState({})

  const validate = (password, firstName, lastName, email) => {
    Keyboard.dismiss();
    let valid = true;
    if(!firstName) {
      handleError('Please put in your first name', 'firstName');
      valid = false;
    }
    if(!lastName) {
      handleError('Please put in your last name', 'lastName');
      valid = false;
    }
    if(!email) {
      handleError('Please put in your email', 'email');
      valid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please put in valid email', 'email')
      valid = false;
    }


    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    if(!password.match(checkPassword)){
      handleError('Password must be atleast 8 characters and contain one uppercase, lowercase, symbol, and number', 'password')
      console.log('WEAK AF')
      valid = false

    }
    if (valid) {
      registerUser(email, password, firstName, lastName)
    }
  }

  const handleError = (errorMessage, input) => {
    setErrors((prevState=>({...prevState,[input]:errorMessage})))
  }
  
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  

  const registerUser = (email, password, firstName, lastName) => {

    auth.createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      userAuth.user.updateProfile({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then(() => {
        // push user into the redux store
        // dispatch a login action
        dispatch(login({
          email: userAuth.user.email,

        }))
      })
      .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        })
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:'https://voicelab-la-3a29d.firebaseapp.com',
        })
        .then(() => {
          alert('Verification email sent!')
        }).catch((error) => {
          alert(error.message)
        })
      })
    }).catch(error => alert("Something went wrong", error));
  }

  // registerUser = async (email, password, firstName, lastName) => {
  //   await firebase.auth().createUserWithEmailAndPassword(email, password)
  //   .then(() => {
  //     firebase.auth().currentUser.sendEmailVerification({
  //       handleCodeInApp: true,
  //       url:'https://voicelab-la-3a29d.firebaseapp.com',
  //     })
  //     .then(() => {
  //       alert('Verification Email Sent')
  //     }).catch((error) => {
  //       alert(error.message)
  //     })
  //     .then(() => {
  //       firebase.firestore().collection('users')
  //       .doc(firebase.auth().currentUser.uid)
  //       .set({
  //         firstName,
  //         lastName,
  //         email,
  //       })
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })  
  //   })
  //   .catch((error) => {
  //     alert(error.message)
  //   })
  // }

  // const handleOnChange = (text, input) => {
  //   setInputs(prevState => ({...prevState, [input]: text}))
  // }


  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text>Register</Text>
        <Text>VoiceLabLA</Text>


        <View style={styles.inputContainer}>
          <Input 
            placeholder='First Name'
            type="firstName"
            value={firstName}
            autoCorrect={false}
            onChangeText={(firstName) => setFirstName(firstName)}
            error={errors.firstName}
            onFocus={() => {
              handleError(null, 'firstName')
            }}

          />
          <Input 
            placeholder='Last Name'
            type="lastName"
            value={lastName}
            autoCorrect={false}
            onChangeText={(lastName) => setLastName(lastName)}
            error={errors.lastName}
            onFocus={() => {
              handleError(null, 'lastName')
            }}
            
          />
          <Input 
            placeholder='Email'
            autoFocus
            type="email"
            value={email}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={(email) => setEmail(email)} 
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email')
            }}
          />
          <Input
            iconName='eye-outline' 
            placeholder="Password"
            type="password"
            value={password}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(password) => setPassword(password)} 
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password')
            }}
            
          />
          {/* <Input 
            style={styles.inputField}
            placeholder="First Name"
            type="firstName"
            value={firstName}
            autoCorrect={false}
            onChangeText={(firstName) => setFirstName(firstName)}
          /> */}
          {/* <Input 
            style={styles.inputField}
            placeholder="Last Name"
            type="lastName"
            value={lastName}
            autoCorrect={false}
            onChangeText={(lastName) => setLastName(lastName)}
          /> */}
          {/* <Input 
              style={styles.inputField}
              placeholder='Email'
              autoFocus
              type="email"
              value={email}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={(email) => setEmail(email)}
          /> */}
          
          {/* <View style={{flexDirection: 'row'}}>
            <Input
                style={styles.inputField}
                placeholder="Password"
                type="password"
                // secureTextEntry
                value={password}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(password) => setPassword(password)}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyPress={handleOnKeyPress}
            />
            <Icon
                name='eye-outline' 
                type='ionicon'
                color='black' 
                size={25}
                
              />
          </View> */}
          

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttons}
              title="SignUp"
              onPress={() => validate(password, firstName, lastName, email)}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
    
  },
  text: {
    textAlign: 'center', 
  },
  inputContainer: {
    width: 275,
    height: 250,
    borderColor: 'black',
    // borderWidth: 2,
    paddingTop: 10,
    marginVertical: 20,


  },
  // inputField: {
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttons: {
    backgroundColor: 'skyblue',
    height: 30,
    width: 100,
    textDecorationColor: 'white',
    marginTop: 20,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    alignContent: 'center',
    
  }
})
