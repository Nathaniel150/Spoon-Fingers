import React from "react";
import Wordle from "./Wordle";
import { StyleSheet, View, Button, Text } from "react-native";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Provider,
} from "@react-native-material/core";
import { useState, useEffect } from "react";
import { colors } from "./wordleConstants";
import Constants from "../../Constants";
import uuid from "react-native-uuid";
import { StackActions } from "@react-navigation/routers";
import Instructions from "../Instructions";
import { wordleHelpSlides, wordleInstructions } from "./wordleInstructions";



//Game 1(3minutes): Pop up(introducing the game and how to play), gameplay, pop-up if won or lost and trasinition to next game,
//Game 2(2minutes): pop up, gameplay, pop-up if won or lost and transition to last game
//Game 3 (1minute):pop up (last one, the guards are approaching), gameplay, pop up,
//Test comment
function Lockle({ navigation, route }) {
  const lvlUnlock = route.params.lvlUnlock;
  const popAction = StackActions.pop(1);

  const words = [
    "spoon",
    "knife",
    "guard",
    "loser",
    "fight",
    "under",
    "brick",
    "pixel",
    "mouse",
  ];

  const wordleContent = [
    {
      startText: "Level 1",
      word: "stair",
      endText: "endText 1",
      time: 180,
    },
    {
      startText: "Level 2",
      word: "knife",
      endText: "endText 2",
      time: 120,
    },
    {
      startText: "Level 3",
      word: "forks",
      endText: "endText 3",
      time: 60,
    },
  ];

  const [won, setWon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(0);

  const checkandUpdateGame = () => {
    if (won) {
      if (level < wordleContent.length - 1) {
        setLevel(level + 1);
      } else {
        lvlUnlock();
        navigation.dispatch(popAction)
        navigation.navigate(Constants.STORY_P2)
      }
    } else {
      navigation.dispatch(popAction)
      navigation.navigate(Constants.STORY_P1)
    }

    setVisible(false);
  };



  return (
    <View style={styles.container}>
      <Instructions
        title="Wordle"
        textInstructions={wordleInstructions}
        helpSlides={wordleHelpSlides}
      />

      <Wordle
        setVisible={setVisible}
        setWon={setWon}
        targetWord={wordleContent[level].word}
      />

      <Provider>
        <Dialog visible={visible}>
          <DialogHeader title={won === true ? "WON" : "LOST"} />
          <DialogContent style={styles.dialog}>
            <Text>Content</Text>
          </DialogContent>
          <DialogActions>
            <Button
              title="Ok"
              compact
              variant="text"
              onPress={() => checkandUpdateGame()}
            />
          </DialogActions>
        </Dialog>
      </Provider>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Lockle;
