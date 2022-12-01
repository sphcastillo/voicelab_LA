import { useNavigation } from "@react-navigation/native";
import { View, Text,StyleSheet, Button,Pressable } from "react-native";
import { useDispatch } from 'react-redux';
import { logout } from "../slices/userSlice";
import { firebase } from '../config';

function SettingsScreen() {
  
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logoutUser = () =>  {
          dispatch(
            logout()
          );
        firebase.auth().signOut()
    }
         
        
    return (
        <View style={styles.center}>
            <View style={styles.container}>
            <Button  
                onPress={() => navigation.goBack()}
                title="Cancel" 
                color="white">
            </Button>
            <Button  
                onPress={() => navigation.goBack()}
                title="Save" 
                color="white">
            </Button>
        </View>
             <Text style={{ fontSize: 30, color:"white", marginBottom:100}}>Settings</Text>     
             <View style={{flexDirection:'column', alignItems:"flex-start", width: '100%', padding:24}}>
             <Pressable style={styles.button} >
                    <Text style={styles.buttonText} >Notification Preferences</Text>
            </Pressable>
            <Pressable style={styles.button} >
                    <Text style={styles.buttonText} >Profile Visibility</Text>
            </Pressable>
            <Pressable style={styles.button} >
                    <Text style={styles.buttonText} >Blocked Users</Text>
            </Pressable>
            <Pressable style={styles.button}  onPress={()=> logoutUser()}>
                    <Text style={styles.buttonText} >Logout</Text>
            </Pressable>
             </View>
      </View>
      
    )
}
const styles = StyleSheet.create({
  center: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:"#688596"
  },
    container: {
      ...StyleSheet.absoluteFillObject,
      padding: 20,
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
      position: 'absolute',
    },
    button: {
        padding: 24,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
  });
export default SettingsScreen;