import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
  
const Home = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../assets/amy.jpeg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
      <View style={styles.settings}>
      <Text style={{fontSize: 18, color: "#05353B" }}>
          VoiceLabLA
        </Text>
      <Ionicons
              style={{paddingLeft: 25}}
              name="person-circle-outline"
              size={40}
              color={'#05353B'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
      </View>
    
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={styles.welcome}>
          WHERE SCIENCE 
          {"\n"} 
          MEETS THE VOICE
          {"\n"} 
      </Text>
    </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
      },
      welcome: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white',
        fontFamily: "Nunito",
        fontWeight: '700',
      },
      overlay: {
        backgroundColor:'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%'
    },
      settings: {
        position: 'relative',
        paddingTop: '15%',
        paddingLeft: '5%',
      }
})
  
export default Home;