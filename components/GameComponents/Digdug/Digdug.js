import React, { PureComponent, useState, useRef } from "react";
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
import Constants from "../../Constants";
import { StackActions } from '@react-navigation/native';


export default function Digdug({ navigation, route }) {
  const popAction = StackActions.pop(1);
  const lvlUnlock = route.params.lvlUnlock;


  const [running, setRunning] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [gotCaught, setGotCaught] = useState(false);

  const engine = useRef(null);

  const [entities, setEntities] = useState({
    dirtArray: {
      playerPosition: [1, 1],
      guardPositions: [
        {
          xPos: 3,
          yPos: 6,
          stunned: false,
          stunnedTimer: 0,
        },
        {
          xPos: 5,
          yPos: 0,
          stunned: false,
          stunnedTimer: 0,
        },
        // [3, 6],
        // [5, 0],
        // [9, 3],
      ],
      renderer: <DirtArray />,
    },
  });

  return (
    <>
      <GameEngine
        ref={engine}
        style={styles.container}
        running={running}
        systems={[MoveAvatar]}
        entities={entities}
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
              onPress={() => {lvlUnlock(); navigation.dispatch(popAction); navigation.navigate(Constants.STORY_P4)}}
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
              onPress={() => {navigation.dispatch(popAction); navigation.navigate(Constants.STORY_P3)} }
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
