import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { auth, firebase } from "../config";
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    // reset password

    const resetPassword = (email) => {
        console.log("This is the email for RESET PASSWORD: ", email);
        auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('Password reset email sent!')
        }).catch((error) => {
            alert(error.message)
        })

        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.screenTitle}>Reset Password</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputDirections}>To reset your password, we first need your email address.</Text>
                    <Input 
                        style={styles.inputField}
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        autoCorrect={false}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={() => resetPassword(email)}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05353B'
    },
    screenTitle: {
        fontSize: 21,
        color: 'white',
        fontWeight: '600',
    },
    inputContainer: {
        width: 275,
        height: 300,
        borderColor: 'black',
        // borderWidth: 2,
        paddingTop: 10,
    },
    inputDirections: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    inputField: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginTop: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    resetButton: {
        backgroundColor: '#05353B',
        height: 40,
        width: 130,
        textDecorationColor: 'white',
        marginTop: -10,
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
    buttonText: {
        color: 'white',
        alignContent: 'center',
        fontSize: 18,
    }
})