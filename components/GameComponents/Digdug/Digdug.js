import React, { useState, useRef } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Button,
  ImageBackground,
  Platform,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { MoveAvatar } from "./systems";
import { DirtArray } from "./entities";
import Controller from "./Controller";
import Constants from "../../Constants";
import { StackActions } from '@react-navigation/native';

import Instructions from "../Instructions";
import { digdugHelpSlides, digdugInstructions } from "./digdugInstructions";
import Popup from "../Popup";

export default function Digdug({ navigation, route }) {
  const popAction = StackActions.pop(1);
  const lvlUnlock = route.params.lvlUnlock;

  const [running, setRunning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [gotCaught, setGotCaught] = useState(false);

  const [currLevel, setCurrLevel] = useState(0);

  //provide entities to the GameEngine based on the current level the player is on.
  //If you want to add a new level, just add another entry of the same format to this array.
  const [entities, setEntities] = useState([
    {
      dirtArray: {
        playerPosition: [2, 0],
        guardPositions: [
          {
            xPos: 0,
            yPos: 0,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 5,
            yPos: 0,
            stunned: false,
            stunnedTimer: 0,
          },
        ],
        levelNum: 0, //what level this is
        level: [
          [
            { ...ground },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...hole },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...win },
          ],
          [
            { ...hole },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
          ],
          [
            { ...ground },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...ground },
          ],
          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...ground },
          ],

          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...ground },
          ],
        ], // pass a copy of levels, so I don't modify the actual data file
        renderer: <DirtArray />,
      },
    },
    {
      dirtArray: {
        playerPosition: [1, 0],
        guardPositions: [
          {
            xPos: 4,
            yPos: 0,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 2,
            yPos: 4,
            stunned: false,
            stunnedTimer: 0,
          },
        ],
        levelNum: 1, //what level this is
        level: [
          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...hole },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...rock },
            { ...rock },
            { ...hole },
            { ...ground },
            { ...ground },
          ],
          [
            { ...ground },
            { ...ground },
            { ...hole },
            { ...hole },
            { ...rock },
            { ...rock },
          ],
          [
            { ...ground },
            { ...hole },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
          ],

          [
            { ...ground },
            { ...win },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
          ],
        ],
        renderer: <DirtArray />,
      },
    },
    {
      dirtArray: {
        playerPosition: [0, 1],
        guardPositions: [
          {
            xPos: 0,
            yPos: 4,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 3,
            yPos: 1,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 5,
            yPos: 2,
            stunned: false,
            stunnedTimer: 0,
          },
        ],
        levelNum: 2, //what level this is
        level: [
          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
          ],
          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
          ],
          [
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...ground },
          ],
          [
            { ...hole },
            { ...hole },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...ground },
          ],
          [
            { ...hole },
            { ...ground },
            { ...win },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
        ],
        renderer: <DirtArray />,
      },
    },

    {
      dirtArray: {
        playerPosition: [0, 8],
        guardPositions: [
          {
            xPos: 1,
            yPos: 3,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 5,
            yPos: 4,
            stunned: false,
            stunnedTimer: 0,
          },
          {
            xPos: 9,
            yPos: 3,
            stunned: false,
            stunnedTimer: 0,
          },
        ],
        levelNum: 3,
        level: [
          [
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...ground },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...hole },
            { ...hole },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
          ],
          [
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
          ],
          [
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
          ],
          [
            { ...rock },
            { ...ground },
            { ...ground },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
          ],
          [
            { ...rock },
            { ...ground },
            { ...hole },
            { ...hole },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...hole },
            { ...hole },
            { ...hole },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
          ],
          [
            { ...rock },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...ground },
            { ...rock },
            { ...rock },
          ],

          [
            { ...win },
            { ...ground },
            { ...rock },
            { ...hole },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
            { ...rock },
          ],
        ],

        renderer: <DirtArray />,
      },
    },
  ]);

  const engine = useRef(null);

  const updateLevel = () => {
    //if you are on the last level, move on with the story.
    if (currLevel >= entities.length - 1) {
      lvlUnlock();
      navigation.dispatch(popAction);
      navigation.navigate(Constants.STORY_P4);
    } else {
      setHasWon(false);
      setGotCaught(false);
      engine.current.swap(entities[currLevel + 1]);
      setCurrLevel(currLevel + 1);
      setRunning(true);
    }
  };

  const loseLevel = () => {
    engine.current.swap(entities[0]);
    navigation.dispatch(popAction);
    navigation.navigate(Constants.STORY_P3);
  };

  const startGame = () => {
    setRunning(true);
  };

  return (
    <>
      <ImageBackground
        source={require("../../../assets/BackgroundImages/digdugBackground.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <GameEngine
          ref={engine}
          running={running}
          systems={[MoveAvatar]}
          entities={entities[currLevel]}
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
          onClose={() => startGame()}
        />

        <Popup
          visible={hasWon}
          text="One step closer!"
          button1={{
            title: "Escape",
            onPress: () => {
              updateLevel();
            },
          }}
        />

        <Popup
          visible={gotCaught}
          text="The Guards Have Defeated you!"
          button1={{
            title: "Try again...",
            onPress: () => {
              loseLevel();
            },
          }}
        />

        {!(hasWon || gotCaught) ? (
          <View style={styles.controllerContainer}>
            <Controller engine={engine} type="move" />
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: -20,
  },
  controllerContainer: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});

let hole = {
  isRock: false,
  visited: true,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let rock = {
  isRock: true,
  visited: false,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let ground = {
  isRock: false,
  visited: false,
  win: false,
  guardStunned: false,
  isSpoon: false,
};
let win = {
  isRock: false,
  visited: false,
  win: true,
  guardStunned: false,
  isSpoon: false,
};
