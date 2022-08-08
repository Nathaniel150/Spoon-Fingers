import { View, Text, StyleSheet, Pressable } from "react-native";
import BattleShipBoard from "./BattleShipBoard";

const Battleship = ({ navigation, route}) => {
  return <BattleShipBoard navigation={navigation} route={route} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Battleship;
