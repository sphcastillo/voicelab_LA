import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import VerticalSlideItem from "../components/VerticalSlider/SlideItem";
import Slides from "../components/VerticalSlider/data";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Activities = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event) => {
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
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.activitiesView}>
      <View style={styles.header}>
        <View style={styles.settings}>
          <Text style={styles.activitiesTitle}>VoiceLabLA</Text>
          <Ionicons
            style={styles.activitiesTitle}
            name="person-circle-outline"
            size={40}
            color={"#05353B"}
            onPress={() => navigation.navigate("ProfileModal")}
          />
        </View>
        <View style={styles.activitiesRow}>
          <Ionicons
            style={styles.heartIcon}
            name="heart-outline"
            size={35}
            color={"#05353B"}
            onPress={() => navigation.navigate("ProfileModal")}
          />
          <Ionicons
            style={styles.activitesIcon}
            name="mail-outline"
            size={35}
            color={"#05353B"}
            onPress={() => navigation.navigate("ProfileModal")}
          />
        </View>
      </View>
      <View
        style={styles.activitiesInfo}
      >
        <Text style={styles.title}>5</Text>
        <Text style={styles.title}>Total Classes</Text>
      </View>
      <View style={styles.allActivity}>
        <Text style={styles.activity}>All Actiivty</Text>
      </View>
      <View>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <VerticalSlideItem item={item} />}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activitiesView: {
    backgroundColor: "#688496",
  },
  header: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
    padding: 20,
  },
  settings: {
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
  },
  activitiesTitle: {
    fontSize: 18,
    color: "#05353B",
  },
  activitesIcon: {
    paddingLeft: 25,
  },
  activitiesRow: {
    flexDirection: "row",
    alignContent: "center",
  },
  heartIcon: {
    paddingLeft: 25,
  },
  activitiesInfo: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
  },
  classes: {
    paddingLeft: "5%",
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  allActivity: {
    flexDirection: "row",
  },
  activity: {
    color: "white",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 25,
  },
});
export default Activities;
