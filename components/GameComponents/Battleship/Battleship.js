import { View, Text, StyleSheet, Pressable } from "react-native";
import BattleShipBoard from "./BattleShipBoard";
import Instructions from "../Instructions";

import {
  battleshipHelpSlides,
  battleshipInstructions,
} from "./battleshipInstructions";

const Battleship = ({ navigation }) => {
  return (
    <>
      <Instructions
        title="Spoon vs Fork!"
        textInstructions={battleshipInstructions}
        helpSlides={battleshipHelpSlides}
      />
      <BattleShipBoard navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
});

export default Battleship;
