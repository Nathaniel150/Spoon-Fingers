import { View, Text, StyleSheet, Pressable } from "react-native";

const Digdug = ({ updateState }) => {
  return (
    <Text onTouchStart={updateState} style={styles.text}>
      Digdug
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Digdug;
