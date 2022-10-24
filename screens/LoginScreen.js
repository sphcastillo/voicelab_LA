import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from "react-native-elements";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log("authUser:", authUser);
            if(authUser){
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, []);

    const signIn = () => {};

    return (
        <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://images.squarespace-cdn.com/content/v1/55d5d706e4b07fd45aec4d89/1555973864037-8FDEJEXDNKZAPHPT3S2V/Find+Your+Own+Unique+Singing+Voice+with+Celebrity+Vocal+Coach+Roxie+Francis+%7C+Develop+A+Career+%26+Business+Plan+as+a+Music+Artist+with+Lucas+Francis+%7C+Professional+Vocal+Coach+Los+Angeles+%7C+Music+Business+Mentorship+%7C+Virtual+Voice+Training+%7C+Best+Online+Vocal+Coaching+%7C+Voice+Training+%7C+Marketing+For+Musicians+%7C+Find+Your+Singing+Voice+%7C+Career+Coaching+For+Singers+in+Los+Angeles+%7C+Branding+For+Musicians",
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Email' 
                    autoFocus 
                    type="email" 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button 
                containerStyle={styles.button} 
                type="outline" 
                title="Register" 
                onPress={() => navigation.navigate("Register")}
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})