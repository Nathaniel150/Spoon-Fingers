import { View, Text, StyleSheet, Pressable } from "react-native";

const BattleShip = ({ updateState }) => {
  return (
    <Text onTouchStart={updateState} style={styles.text}>
      Battleship
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default BattleShip;
