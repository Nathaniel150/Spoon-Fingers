import { View, Text, StyleSheet } from "react-native";

const Wordle = ({ updateState }) => {
  return (
    <Text onTouchStart={updateState} style={styles.text}>
      This is wordle
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Wordle;
