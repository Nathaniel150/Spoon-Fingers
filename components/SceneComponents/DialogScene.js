import { View, Text, StyleSheet, Pressable } from "react-native";

const DialogueScene = ({ updateState }) => {
  return (
    <Text onTouchStart={updateState} style={styles.text}>
      Here is some dialogue
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default DialogueScene;
