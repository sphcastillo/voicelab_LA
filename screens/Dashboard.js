import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';


const Dashboard = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else {
        console.log('user does not exist')
      }
    })
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.hello}>
          Hello, {name.firstName}
        </Text>
      </View>
      <View>
      <Text style={styles.welcome}>
        WHERE 
        {"\n"} 
        SCIENCE 
        {"\n"} 
        MEETS THE
        {"\n"}
        VOICE
      </Text>
      </View>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 50,
  },
  buttons: {
    backgroundColor: 'blue',
    height: 30,
    width: 100,
    textDecorationColor: 'white',
    marginTop: 10,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    alignContent: 'center',
    
  }
})