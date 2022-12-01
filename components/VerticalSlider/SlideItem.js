import {
    StyleSheet,
    View,
    Animated,
    Easing,
    Text,
  } from 'react-native';
  import { Ionicons } from "@expo/vector-icons";
  import React from 'react';
  
  
  const VerticalSlideItem = ({item}) => {
    const translateYImage = new Animated.Value(5);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={item.img}
          resizeMode="cover"
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
  
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <View style={styles.liking}>
        </View>
      </View>
    );
  };
  
  export default VerticalSlideItem;
  
  const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginLeft: 10,
      width: '100%',
      height: 100,
      alignItems: 'center',
      flexDirection:'row',
    },
    image: {
      width: '40%',
      height: '100%',
    },
    content: {
        alignItems: 'left',
        marginLeft:10,
        
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    description: {
      fontSize: 15,
      color: 'white',
    },
    price: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    },
    liking: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
  });