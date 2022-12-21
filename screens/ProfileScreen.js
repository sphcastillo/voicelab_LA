import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable,StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
// import { logout } from "../slices/userSlice";
// import { firebase } from '../config';

function ProfileScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
        
    return (
        <View style={styles.center}>
            <View style={styles.container}>
            <Text style={{color: "#05353B", fontSize: 23}}>VoiceLabLA</Text>
        <Button  onPress={() => navigation.goBack()}
        title="X" color="#05353B">
        </Button>
        </View>
        <Ionicons
              name="person-circle-outline"
              size={80}
              color={'#05353B'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
             <Text style={{ fontSize: 30 }}>name</Text>     
             <View style={{flexDirection:'row', justifyContent:"space-evenly", width: '100%', paddingTop: 75}}>
               <View style={{flexDirection:'column', alignItems:"center"} }>
               <Ionicons
              name="person-add-outline"
              size={40}
              color={'black'}
              onPress={() => navigation.navigate('EditProfileModal')}
            />
                 <Button title="Edit Profile" color="white"></Button>
               </View>
               <Text style={{fontSize:43}}>|</Text>
               <View style={{flexDirection:'column', alignItems:'center'} }>
               <Ionicons
              name="cog"
              size={40}
              color={'black'}
              onPress={() => navigation.navigate('SettingsModal')}
            />
                 <Button title="Settings" color="white"></Button>
               </View>
             </View>
      </View>
      
    )
}
const styles = StyleSheet.create({
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#688596"
  },
    container: {
      ...StyleSheet.absoluteFillObject,
      padding: 20,
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
      position: 'absolute', // add if dont work with above
    },
    buttons: {
        color: 'white',
    }
  });
export default ProfileScreen;