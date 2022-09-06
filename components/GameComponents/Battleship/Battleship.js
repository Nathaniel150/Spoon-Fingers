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
      <View style={styles.spacer} />

      <BattleShipBoard navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 200,
  },
  spacer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Battleship;
