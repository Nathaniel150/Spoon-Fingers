import React, { useState } from "react";
import { fontStyles } from "../../App";
import {
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
//onClose is an optional prop.
const Instructions = ({ title, helpSlides, textInstructions, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);

  //this function will build the slides needed for the Swiper Component.
  const getSlides = () => {
    let helpSlideViews = [];

    //add the initial instructions slide
    helpSlideViews.push(
      <View key="start" style={styles.slide}>
        <Text style={[styles.instructionHeader, fontStyles.pixelBoldFont]}>
          {title}
        </Text>
        <FlatList
          data={textInstructions}
          renderItem={({ item }) => (
            <Text style={[styles.instructionListItem, fontStyles.pixelFont]}>
              {item}
            </Text>
          )}
        />
      </View>
    );

    //add a help slide to describe each of the marking button options(not readable, crossed out...)
    for (let helpSlide of helpSlides) {
      helpSlideViews.push(
        <View key={helpSlide.header} style={styles.slide}>
          <Text style={[styles.modalTextHeader, fontStyles.pixelBoldFont]}>
            {helpSlide.header}
          </Text>
          <Image style={styles.helpImage} source={helpSlide.image} />
          <Text style={[styles.modalTextDescription, fontStyles.pixelFont]}>
            {helpSlide.text}
          </Text>
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
                bottom: 1,
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
                    <Text style={[styles.text, fontStyles.pixelBoldFont]}>
                      Close
                    </Text>
                  </View>
                )}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if (onClose) {
                    onClose();
                  }
                }}
              ></Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  },
  modalTextHeader: {
    flex: 0.5,
    fontSize: 24,
    fontWeight: "bold",
  },
  helpImage: {
    flex: 1.5,
    resizeMode: "contain",
    width: "100%",
  },
  modalTextDescription: {
    flex: 1,
    textAlign: "left",
    marginTop: 20,
  },
  closeButtonView: {
    alignSelf: "stretch",
  },
  closeButton: {
    elevation: 2,
    backgroundColor: "grey",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  closeButtonPressed: {
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
    marginHorizontal: 20,
    marginVertical: 100,

    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
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
