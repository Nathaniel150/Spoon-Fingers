import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
          backgroundColor: "black",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/prisonerEyepatch.png")}
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
          source={require("../../../../assets/prisonerMohawk.png")}
          // We can use a gif here for short digging animation
        />
      );
    }
    //the guard is not stunned
    else {
      return (
        <Image
          style={{
            backgroundColor: "black",
            height: blockSize,
            width: blockSize,
            resizeMode: "contain",
          }}
          source={require("../../../../assets/prisonerMohawk.png")}
          // We can use a gif here for short digging animation
        />
      );
    }
  }
  //this is not working yet, but eventually I want to show the spoon moving through the air
  else if (square.isSpoon) {
    return (
      <Image
        style={{
          backgroundColor: "brown",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/spoon.png")}
      />
    );
  }
  //this is the winning square
  else if (square.win) {
    return (
      <Image
        style={{
          backgroundColor: "#663801",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/star.png")}
      />
    );
  }
  //If it has been visited
  else if (square.visited) {
    return (
      <View
        style={{
          backgroundColor: "black",
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
        source={require("../../../../assets/rock.png")}
      />
    );
  }
  //unvisited ground square
  else {
    return (
      <Image
        style={{
          backgroundColor: "black",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/dirt.png")}
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
    backgroundColor: "black",
  },
});

export { DirtArray };
