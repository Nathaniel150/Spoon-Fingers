import React, { PureComponent, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  View,
  Button,
} from "react-native";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Provider,
} from "@react-native-material/core";
import { GameEngine } from "react-native-game-engine";
import { MoveAvatar } from "./systems";
import { DirtArray } from "./entities";
import Controller from "./Controller";
import { levels } from "./levels.js/level1";
import { levelEntities } from "./levels.js/levelEntities";
import Constants from "../../Constants";
import { StackActions } from "@react-navigation/native";

import Instructions from "../Instructions";
import { digdugHelpSlides, digdugInstructions } from "./digdugInstructions";

export default function Digdug({ navigation, route }) {
  const popAction = StackActions.pop(1);
  const lvlUnlock = route.params.lvlUnlock;

  const [running, setRunning] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [gotCaught, setGotCaught] = useState(false);

  const [currLevel, setCurrLevel] = useState(0);

  const engine = useRef(null);

  const updateLevel = () => {
    //if you are on the last level, move on with the story.
    if (currLevel >= levels.length - 1) {
      lvlUnlock();
      navigation.dispatch(popAction);
      navigation.navigate(Constants.STORY_P4);
    } else {
      setHasWon(false);
      setGotCaught(false);
      engine.current.swap(levelEntities[currLevel + 1]);
      setCurrLevel(currLevel + 1);
      setRunning(true);
    }
  };

  const loseLevel = () => {
    navigation.dispatch(popAction);
    navigation.navigate(Constants.STORY_P3);
    //if you are on the first level, go back to the story
    if (currLevel == 0) {
    } else {
      setGotCaught(false);
      engine.current.swap(levelEntities[currLevel - 1]);
      setCurrLevel(currLevel - 1);
      setRunning(true);
    }
  };

  return (
    <>
      <GameEngine
        ref={engine}
        style={styles.container}
        running={running}
        systems={[MoveAvatar]}
        entities={levelEntities[currLevel]}
        onEvent={(e) => {
          if (e === "winner") {
            setRunning(false);
            setHasWon(true);
          } else if (e == "caught") {
            setRunning(false);
            setGotCaught(true);
          }
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine>

      <Instructions
        title="Final Escape!"
        textInstructions={digdugInstructions}
        helpSlides={digdugHelpSlides}
      />

      <Provider>
        <Dialog visible={hasWon}>
          <DialogContent>
            <Text>Congrats You Escaped!</Text>
          </DialogContent>
          <DialogActions>
            {/* TODO Once I have the new updateState function, this button will return the player to the levels page */}
            <Button
              title="Escape"
              compact
              variant="text"
              onPress={() => {
                updateLevel();
              }}
            />
          </DialogActions>
        </Dialog>
      </Provider>
      <Provider>
        <Dialog visible={gotCaught}>
          <DialogContent>
            <Text>The Guards Have Defeated you!</Text>
          </DialogContent>
          <DialogActions>
            {/* TODO Once I have the new updateState function, this button will return the player to the levels page */}
            <Button
              title="Continue"
              compact
              variant="text"
              onPress={() => {
                loseLevel();
              }}
            />
          </DialogActions>
        </Dialog>
      </Provider>

      {!(hasWon || gotCaught) ? (
        <View style={styles.controllerContainer}>
          <Controller engine={engine} type="move" />
        </View>
      ) : null}

      <View style={styles.spacer}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  controller: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  controllerContainer: {
    // backgroundColor: "grey",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  text: {
    textAlign: "center",
  },
  spacer: {
    marginTop: 30,
  },
  winModal: {
    zIndex: 10,
    position: "absolute",
    top: "20%",
    left: "26%",
    backgroundColor: "lightblue",
    padding: 20,
  },
});

// Ideas: maybe you have ten spoons and can throw your spoon to stun guard,
//  or use 1 to break a rock. If you get to 0 spoons, you can't dig anymore.
