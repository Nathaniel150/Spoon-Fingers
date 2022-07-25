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
  takeEnemyTurn,
  checkIfSunk,
}) {
  const blockSize =
    Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_DIMENSIONS - 10;

  const gotHit = () => {
    let newBoard = [...board];
    newBoard[i][j].isHit = true;
    if (newBoard[i][j].isShip) {
      console.log("yee", newBoard[i][j].shipId);
      checkIfSunk(newBoard[i][j].shipId, board, enemy);
    }
    setBoard(newBoard);

    if (takeEnemyTurn) {
      takeEnemyTurn();
    }
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
    if (square.isShip && square.isSunk) {
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
