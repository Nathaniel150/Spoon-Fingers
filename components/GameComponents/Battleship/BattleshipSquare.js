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
  enemy,
}) {
  const blockSize =
    Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_DIMENSIONS - 10;

  const gotHit = () => {
    let newBoard = [...board];
    newBoard[i][j].isHit = true;
    if (newBoard[i][j].isShip) {
      checkIfSunk(newBoard[i][j].shipId);
    }
    setBoard(newBoard);
  };

  const checkIfSunk = (id) => {
    console.log("Checking sunk", id);
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_DIMENSIONS; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_DIMENSIONS; j++) {
        if (board[i][j].shipId == id && !board[i][j].isHit) {
          console.log("Not hit");
          return;
        }
      }
    }
    let newBoard = [...board];
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_DIMENSIONS; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_DIMENSIONS; j++) {
        if (newBoard[i][j].shipId == id) {
          newBoard[i][j].isSunk = true;
        }
      }
    }

    setBoard(newBoard);
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
            borderWidth: 1,
          }}
        >
          <Text>
            {i} , {j}
          </Text>
        </View>
      );
    }
  }

  if (enemy) {
    if (square.isSunk && square.isShip) {
      return (
        <View
          style={{
            backgroundColor: "#701414",
            height: blockSize,
            width: blockSize,
          }}
        />
      );
    } else if (square.isShip && square.isHit) {
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
            backgroundColor: "green",
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
          onTouchStart={gotHit}
          style={{
            backgroundColor: "green",
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
  //player's board. Basically the same except none of the onTouchStart functions trigger.
  else {
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
          style={{
            backgroundColor: "green",
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
}
