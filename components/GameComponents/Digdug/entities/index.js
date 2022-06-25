import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View, Image, Text, Button } from "react-native";
import Constants from "../Constants";
import { level1 } from "../levels.js/level1";

const DirtArray = ({ playerPosition, guardPosition }) => {
  const [dirt, setDirt] = useState([]);

  useEffect(() => {
    setDirt(level1);
  }, []);

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: 50,
        }}
      >
        {dirt.map((row, i) => {
          return (
            <View>
              {row.map((square, j) => {
                return (
                  <DirtSquare
                    playerPosition={playerPosition}
                    guardPosition={guardPosition}
                    i={i}
                    j={j}
                    dirt={dirt}
                    setDirt={setDirt}
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

const DirtSquare = ({ playerPosition, guardPosition, i, j, dirt, setDirt }) => {
  let dimensions = level1.length;

  const blockSize = Constants.MAX_WIDTH / dimensions;
  // the player is currently in this square
  if (i == playerPosition[0] && j == playerPosition[1]) {
    let newDirt = dirt;
    newDirt[i][j].visited = true;
    setDirt(newDirt);

    return (
      <Image
        style={{
          backgroundColor: "black",
          height: blockSize,
          width: blockSize,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/prisonerEyepatch.png")}
        // We can use a gif here for short digging animation
      />
    );
  }
  //the guard is currently in this square
  else if (i == guardPosition[0] && j == guardPosition[1]) {
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
  } else {
    if (dirt[i][j].win) {
      return (
        <Image
          style={{
            backgroundColor: "#915947",
            height: blockSize,
            width: blockSize,
            resizeMode: "contain",
          }}
          source={require("../../../../assets/star.png")}
        />
      );
    }
    //If is is not a rock, and has been visited
    if (!dirt[i][j].isRock && dirt[i][j].visited) {
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
    else if (dirt[i][j].isRock) {
      return (
        <Image
          style={{
            backgroundColor: "#915947",
            height: blockSize,
            width: blockSize,
            resizeMode: "contain",
          }}
          source={require("../../../../assets/rock.png")}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "#915947",
            height: blockSize,
            width: blockSize,
          }}
        />
      );
    }
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
