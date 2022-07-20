import { useState } from "react";
import { View, Text } from "react-native";
import Constants from "../../Constants";

export default function BattleshipSquare({
  square,
  setup,
  board,
  setBoard,
  placeShip,
  i,
  j,
}) {
  const blockSize = Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_DIMENSIONS;

  const gotHit = () => {
    let newBoard = [...board];
    newBoard[i][j].isHit = true;
    setBoard(newBoard);
  };

  const updateLocationInfoOnLayout = (e) => {
    const layout = e.nativeEvent.layout;

    let newBoard = [...board];
    newBoard[i][j].height = layout.height;
    newBoard[i][j].width = layout.width;
    //for some reason this is always 0, so i am adding i * width to set in in the right location.
    newBoard[i][j].x = layout.x + i * layout.width;
    newBoard[i][j].y = layout.y;

    setBoard(newBoard);
    console.log("Setup", setup);
  };
  if (setup) {
    if (square.isShip) {
      return (
        <View
          style={{
            backgroundColor: "grey",
            height: blockSize,
            width: blockSize,
          }}
        >
          <Text>
            {i} , {j}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          onTouchStart={() => placeShip(i, j)}
          style={{
            backgroundColor: "blue",
            height: blockSize,
            width: blockSize,
            borderColor: "black",
            borderWidth: "1px",
          }}
        >
          <Text>
            {i} , {j}
          </Text>
        </View>
      );
    }
  }

  if (square.isShip && square.isHit) {
    return (
      <View
        style={{
          backgroundColor: "red",
          height: blockSize,
          width: blockSize,
        }}
      />
    );
  } else if (!square.isShip && square.isHit) {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: blockSize,
          width: blockSize,
        }}
      />
    );
  } else if (square.isShip) {
    return (
      <View
        onTouchStart={gotHit}
        style={{
          backgroundColor: "grey",
          height: blockSize,
          width: blockSize,
        }}
      />
    );
  } else {
    return (
      <View
        // I can use this to get info about where the square is on the screen.
        onLayout={(e) => {
          updateLocationInfoOnLayout(e);
        }}
        onTouchStart={gotHit}
        style={{
          backgroundColor: "blue",
          height: blockSize,
          width: blockSize,
        }}
      >
        <Text>
          {i} , {j}
        </Text>
      </View>
    );
  }
}
