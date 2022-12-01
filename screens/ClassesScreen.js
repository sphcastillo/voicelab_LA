
import React, { useRef, useState } from "react";
import { Text, 
  View, StyleSheet , FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slides from '../components/Slider/data';
import SlideItem from "../components/Slider/SlideItem";
import Pagination from "../components/Slider/Pagination"
import { Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const Classes = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').height

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 1, alignItems: "flex-start", backgroundColor: '#688496', }}>
      <ScrollView style={{height: deviceHeight, width: deviceWidth}}>
      <View style={styles.overlay}>
        <View style={styles.header}>  
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
      <View style={{flexDirection: "row", alignItems:'center'}}>
      <Ionicons
              style={{paddingLeft: 25}}
              name="heart-outline"
              size={35}
              color={'#05353B'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
      <Ionicons
              style={{paddingLeft: 25}}
              name="mail-outline"
              size={35}
              color={'#05353B'}
              onPress={() => navigation.navigate('ProfileModal')}
            />
      </View>
      </View>
      <View style={styles.classes}>
      <Text style={styles.title}>
        Warm Ups
      </Text>
      <View style={{ height: 400, width: deviceWidth}}>      
        <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      </View>
      <Text style={styles.title}>
        Improve Your Range
      </Text>
      <View style={{ height: 400, width: deviceWidth}}>      
        <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      </View>
      <Text style={styles.title}>
        Warm ups
      </Text>
      <View style={{ height: 400, width: deviceWidth}}>      
        <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      </View>
      </View>
    </View>
    </ScrollView>
    </View>
  );
};
  
const styles = StyleSheet.create({
      header: {
        marginTop: "10%",
        flexDirection:"row", 
        justifyContent: "space-between", 
        width: '100%', 
        alignContent: 'center',
        padding: 20,
      },
      settings: {
        flexDirection:"column",
        justifyContent: 'flex-start',
        position: 'relative',
      },
      classes: {
        paddingLeft: '5%'
      },
      title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',


      }
})
export default Classes;