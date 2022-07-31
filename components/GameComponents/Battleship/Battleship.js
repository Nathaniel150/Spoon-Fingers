import { View, Text, StyleSheet, Pressable } from "react-native";
import BattleShipBoard from "./BattleShipBoard";

const Battleship = ({ navigation}) => {
  return <BattleShipBoard navigation={navigation} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Battleship;
