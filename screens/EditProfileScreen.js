import { useNavigation } from "@react-navigation/native";
import { View, Text,StyleSheet, Button } from "react-native";
import { Input} from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
import { logout } from "../slices/userSlice";
import { firebase } from '../config';

function EditProfileScreen() {
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
            <Button  onPress={() => navigation.goBack()}
        title="Cancel" color="white">
        </Button>
        <Button  onPress={() => navigation.goBack()}
        title="Save" color="white">
        </Button>
        </View>
        <Ionicons
              name="person-circle-outline"
              size={80}
              color={'#05353B'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
             <Text style={{ fontSize: 30, color:"white", marginBottom:100}}>Edit</Text>     
             <View style={{flexDirection:'column', justifyContent:"left", width: '100%', paddingLeft:24}}>
               <Input 
                placeholder='First Name'
                placeholderTextColor='white'
                type="email"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                placeholder='Last Name'
                placeholderTextColor='white'
                type="email"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                placeholder='Hometown'
                placeholderTextColor='white'
                type="email"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                placeholder='Bio'
                placeholderTextColor='white'
                type="email"
                multiline
                numberOfLines={10}
                maxLength={1000}
                autoCapitalize='none'
                autoCorrect={false}
            />
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
export default EditProfileScreen;