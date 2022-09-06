import { View, StyleSheet, Platform, StatusBar } from "react-native";
import BattleShipBoard from "./BattleShipBoard";
import Instructions from "../Instructions";

import {
  battleshipHelpSlides,
  battleshipInstructions,
} from "./battleshipInstructions";

const Battleship = ({ navigation, route }) => {
  return (
    <>
      <Instructions
        title="Spoon vs Fork!"
        textInstructions={battleshipInstructions}
        helpSlides={battleshipHelpSlides}
      />

      <BattleShipBoard navigation={navigation} route={route} />
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
