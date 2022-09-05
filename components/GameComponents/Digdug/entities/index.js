import React, { useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";

import { View, Image } from "react-native";
import Constants from "../../../Constants";

const DirtArray = ({ playerPosition, guardPositions, levelNum, level }) => {
  const [dirt, setDirt] = useState([]);

  useEffect(() => {
    setDirt(level);
  }, [levelNum]);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: 100,
        }}
      >
        {dirt.map((row, i) => {
          return (
            <View key={`row+${i}`}>
              {row.map((square, j) => {
                return (
                  <DirtSquare
                    key={`square+${i}+${j}`}
                    playerPosition={playerPosition}
                    guardPositions={guardPositions}
                    i={i}
                    j={j}
                    square={square}
                    dimensions={level.length}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </>
  );
};

const DirtSquare = ({
  playerPosition,
  guardPositions,
  i,
  j,
  square,
  dimensions,
}) => {
  const blockSize = Constants.MAX_WIDTH / dimensions;

  const hasGuard = (i, j) => {
    //iterates over all the guards to see if any of them are in the current square;
    for (let k = 0; k < guardPositions.length; k++) {
      if (guardPositions[k].xPos == i && guardPositions[k].yPos == j) {
        return true;
      }
    }

    return false;
  };

  // the player is currently in this square
  if (i == playerPosition[0] && j == playerPosition[1]) {
    square.visited = true;

    return (
      <Image
        style={{
          backgroundColor: "#221301",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/Digdug/sah.png")}
      />
    );
  }
  //the guard is currently in this square
  else if (hasGuard(i, j)) {
    square.visited = true;
    //the guard is stunned
    if (square.guardStunned) {
      return (
        <Image
          style={{
            backgroundColor: "red",
            height: blockSize,
            width: blockSize,
            resizeMode: "contain",
          }}
          source={require("../../../../assets/Digdug/stunnedGuard.png")}
          // We can use a gif here for short digging animation
        />
      );
    }
    //the guard is not stunned
    else {
      return (
        <Image
          style={{
            backgroundColor: "#221301",
            height: blockSize,
            width: blockSize,
            resizeMode: "contain",
          }}
          source={require("../../../../assets/Digdug/prisonGuard.png")}
          // We can use a gif here for short digging animation
        />
      );
    }
  }
  //this is the winning square
  else if (square.win) {
    return (
      <Image
        style={{
          backgroundColor: "#221301",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/Digdug/star.png")}
      />
    );
  }
  //If it has been visited
  else if (square.visited) {
    return (
      <View
        style={{
          backgroundColor: "#221301",
          height: blockSize,
          width: blockSize,
        }}
      />
    );
  }
  //if the square is a rock.
  else if (square.isRock) {
    return (
      <Image
        style={{
          backgroundColor: "brown",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/Digdug/rock1withdirt.png")}
      />
    );
  }
  //unvisited ground square
  else {
    return (
      <Image
        style={{
          backgroundColor: "#221301",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/Digdug/dirt1.png")}
      />
    );
  }
};

const styles = StyleSheet.create({
  avatar: {
    width: Constants.AVATAR_RADIUS * 2,
    height: Constants.AVATAR_RADIUS * 2,
    position: "absolute",
    backgroundColor: "pink",
  },
  testObject: {
    width: Constants.AVATAR_RADIUS * 2,
    height: Constants.AVATAR_RADIUS * 2,
    position: "absolute",
    backgroundColor: "pink",
  },
  icon: {
    height: 30,
    width: 30,
  },
  block: {
    width: Constants.BLOCK_RADIUS * 2,
    height: Constants.BLOCK_RADIUS * 2,
    position: "absolute",
    backgroundColor: "#221301",
  },
});

export { DirtArray };
