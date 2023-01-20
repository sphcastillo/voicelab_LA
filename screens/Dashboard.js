import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createMaterialBottomTabNavigator } from
    "@react-navigation/material-bottom-tabs";
    import HomeScreen from "./HomeScreen";
import ClassesScreen from "./ClassesScreen";
import ActivitiesScreen from "./ActivitiesScreen";
import ProgramsScreen from "./ProgramsScreen"
import { createAppContainer } from "react-navigation";


const Dashboard = () => {
  const [name, setName] = useState('');
  const TabNavigator = createMaterialBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="md-home"
              size={tabInfo.focused ? 26 : 20}
              color={tabInfo.tintColor}
            />
          ),
        },
      },
      Classes: {
        screen: ClassesScreen,
        navigationOptions: {
          tabBarLabel: "Classes",
          tabBarIcon: (tabInfo) => (
            <FontAwesome5 
              name="chalkboard-teacher"
              size={tabInfo.focused ? 26 : 20}
              color={tabInfo.tintColor}
            />
          ),
        },
      },
      Activities: {
        screen: ActivitiesScreen,
        navigationOptions: {
          tabBarLabel: "Activities",
          tabBarIcon: (tabInfo) => (
            <Feather
              name="activity" 
              size={tabInfo.focused ? 26 : 20}
              color={tabInfo.tintColor}
            />
          ),
        },
      },
      Programs: {
        screen: ProgramsScreen,
        navigationOptions: {
          tabBarLabel: "Programs",
          tabBarIcon: (tabInfo) => (
            <MaterialIcons
              name="queue-music" 
              size={tabInfo.focused ? 26 : 20}
              color={tabInfo.tintColor}
            />
          ),
        },
      },
    },
    {
      initialRouteName: "Home",
      barStyle: { backgroundColor: "#05353B" },
    }
  );
  const Navigator = createAppContainer(TabNavigator);
    

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
    <Navigator>
    <HomeScreen />
    </Navigator>
    // <SafeAreaView style={styles.container}>
    //   <View>
    //     <Text style={styles.hello}>
    //       Hello, {name.firstName}
    //     </Text>
    //   </View>
    //   <View>
    //   <Text style={styles.welcome}>
    //     WHERE 
    //     {"\n"} 
    //     SCIENCE 
    //     {"\n"} 
    //     MEETS THE
    //     {"\n"}
    //     VOICE
    //   </Text>
    //   </View>
    //   <TouchableOpacity
    //     style={styles.buttons}
    //     onPress={() => firebase.auth().signOut()}
    //   >
    //     <Text style={styles.buttonText}>
    //       Logout
    //     </Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
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
    color: 'steelblue',
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