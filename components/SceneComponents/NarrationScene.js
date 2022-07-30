import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function NarrationScene({ scene }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{scene.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fcfdffc7",
    width: "85%",
    height: "22%",

    alignSelf: "center",
    marginBottom: 30,
  },
  text: {
    padding: 15,
    fontSize: 20,
    // fontFamily: 'PixeloidSans',
  },
});

export default NarrationScene;
