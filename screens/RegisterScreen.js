import { StyleSheet, View } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from "react-native-elements";
import { auth } from "firebase";

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                });
            })
            .catch((error) => alert(error.message));
    };


    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar  style="light" />
            <Text h4 style={{ marginBottom: 50 }}>
                Create a VoiceLab LA account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus 
                    type="text" 
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email" 
                    type="email" 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry={true}
                    type="password" 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture URL (optional)" 
                    type="text" 
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                onPress={register}
                containerStyle={styles.button}
                raised
                title="Register"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})