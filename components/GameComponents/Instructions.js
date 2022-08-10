import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";

import Swiper from "react-native-swiper";

//this will need to take title,intructions(array of strings), and helpSlides(see current format below) as props.
const Instructions = ({ title, helpSlides, textInstructions }) => {
  const [modalVisible, setModalVisible] = useState(true);

  //this function will build the slides needed for the Swiper Component.
  const getSlides = () => {
    let helpSlideViews = [];

    //add the initial instructions slide
    helpSlideViews.push(
      <View key="start" style={styles.slide}>
        <Text style={styles.instructionHeader}>{title}</Text>
        <FlatList
          data={textInstructions}
          renderItem={({ item }) => (
            <Text style={styles.instructionListItem}>{item}</Text>
          )}
        />
      </View>
    );

    //add a help slide to describe each of the marking button options(not readable, crossed out...)
    for (let helpSlide of helpSlides) {
      helpSlideViews.push(
        <View key={helpSlide.header} style={styles.slide}>
          <Text style={styles.modalTextHeader}>{helpSlide.header}</Text>
          <Image style={styles.helpImage} source={helpSlide.image} />
          <Text style={styles.modalTextDescription}>{helpSlide.text}</Text>
        </View>
      );
    }

    return helpSlideViews;
  };

  return (
    <Pressable
      onPress={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Swiper
              loop={false}
              paginationStyle={{
                position: "absolute",
                bottom: 2,
              }}
            >
              {getSlides()}
            </Swiper>
            <View style={styles.closeButtonView}>
              <Pressable
                children={({ pressed }) => (
                  <View
                    style={
                      pressed ? styles.closeButtonPressed : styles.closeButton
                    }
                  >
                    <Text style={styles.text}>Close</Text>
                  </View>
                )}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              ></Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <Text style={styles.text}>Help</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionHeader: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextHeader: {
    flex: 0.5,
    fontSize: 24,
    fontWeight: "bold",
  },
  helpImage: {
    flex: 5,
    resizeMode: "contain",
    width: "100%",
  },
  modalTextDescription: {
    flex: 1,
    textAlign: "center",
  },
  closeButtonView: {
    alignSelf: "stretch",
  },
  closeButton: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "grey",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  closeButtonPressed: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#6e2e09",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  instructionListItem: {
    marginTop: 20,
    fontSize: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default Instructions;
