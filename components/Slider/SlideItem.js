import {
    StyleSheet,
    View,
    Animated,
    Easing,
    Text,
  } from 'react-native';
  import { Ionicons } from "@expo/vector-icons";
  import React from 'react';
  
  
  const SlideItem = ({item}) => {
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
        <Ionicons
              style={{paddingLeft: 25}}
              name="heart-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
        </View>
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginTop: 30,
      width: 250,
      height: 300,
      alignItems: 'center',
    },
    image: {
      opacity: .5,
      width: '100%',
      height: '100%',
    },
    content: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'left',
        
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