import { color } from '@rneui/base';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  error,
  label, 
  iconName, 
  iconType,
  password, 
  onFocus= () => {},
  ...props
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View style={[style.inputContainer, {borderColor: error ? 'red' : isFocused ? 'blue' : 'grey'}]}>
        <TextInput 
          style={{flex: 1, fontSize: 16}} 
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props} 
        />
        { password &&
          <Icon
            style={{fontSize: 22, color: 'grey'}}
            onPress={() => setHidePassword(!hidePassword)} 
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          />
        
        }
      </View>
      { error && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 7}}>
          {error}
        </Text>
        )}
    </View>
    ); 
  }


const style = StyleSheet.create({
  label: {
    // marginVertical: 5,
    fontSize: 14,
    color: 'grey',
  },
  inputContainer:{
    height: 50,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  }
})


export default Input;