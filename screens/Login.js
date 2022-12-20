import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { useDispatch } from 'react-redux';
import { auth, firebase } from '../services/config';
import { login } from "../slices/userSlice";

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isClicked, setIsClicked] = useState(false)
  
  const dispatch = useDispatch();
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [0, -500]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const loginHandler = () => {
    setIsClicked(!isClicked)
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    setIsClicked(!isClicked)
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  const loginUser = () =>  {
    auth.signInWithEmailAndPassword(email, password) 
    .then(userAuth =>  {
      dispatch(
        login({
          email: userAuth.user.email,

        })
      )
      firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        // setName(snapshot.data())
        navigation.replace("Dashboard")
      }
      else {
        console.log('user does not exist')
      }
    })

    }).catch((error) => alert(error));
    
  }

  const RegisterUser = (email, password, firstName, lastName) => {

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

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 30} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 30} />
          </ClipPath>
          <Image
            href={require("../assets/amy.jpeg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text onPress={() => (
            setIsClicked(!isClicked),
            imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>  
        <Animated.View style={welcomeAnimatedStyle}>
        <Text  style={styles.welcome}>
          WHERE SCIENCE 
          {"\n"} 
          MEETS THE VOICE
          {"\n"} 
      </Text>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            value={email}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => setEmail(email)}
          />
          {isRegistering && (
            <TextInput
              placeholder="First Name"
              placeholderTextColor="black"
              style={styles.textInput}
              type="firstName"
              value={firstName}
              autoCorrect={false}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          )}
          {isRegistering && (
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="black"
              style={styles.textInput}
              type="lastName"
              value={lastName}
              autoCorrect={false}
              onChangeText={(lastName) => setLastName(lastName)}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            style={styles.textInput}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={()=>{
              if(isRegistering) {
                formButtonScale.value = withSequence(withSpring(1.5), withSpring(1))
                RegisterUser(email, password, firstName, lastName)
              }
              else {
              formButtonScale.value = withSequence(withSpring(1.5), withSpring(1))
              loginUser(email, password)
              }
            }
              
              }>
              <Text style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>


              {/* <TouchableOpacity 
          style={styles.forgotPasswordContainer}
              // onPress={() => resetPassword()}
          onPress={() => navigation.navigate('ForgotPassword')} 
          >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}

        
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
