import { View, Text, StyleSheet, Pressable } from "react-native";
import BattleShipBoard from "./BattleShipBoard";

const Battleship = ({ updateState }) => {
  console.log("Battleship");
  return <BattleShipBoard updateState={updateState} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Battleship;
