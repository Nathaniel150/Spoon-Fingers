import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "../../Constants";

const blockSize = Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 5;

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
      return <View style={styles.darkRed} />;
    } else if (square.isShip && square.isHit) {
      return <View style={styles.red} />;
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.white} />;
    } else if (square.isShip) {
      return <View onTouchStart={gotHit} style={styles.blue}></View>;
    } else {
      return <View onTouchStart={gotHit} style={styles.blue}></View>;
    }
  }
  //player's board. Basically the same except none of the onTouchStart functions trigger.
  else {
    if (square.isShip && square.isSunk) {
      return <View style={styles.darkRed} />;
    } else if (square.isShip && square.isHit) {
      return <View style={styles.red} />;
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.white} />;
    } else if (square.isShip) {
      return <View style={styles.grey} />;
    } else {
      return <View style={styles.blue}></View>;
    }
  }
}

const styles = new StyleSheet.create({
  blue: {
    backgroundColor: "blue",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  white: {
    backgroundColor: "white",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  red: {
    backgroundColor: "red",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  darkRed: {
    backgroundColor: "#850900",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  grey: {
    backgroundColor: "grey",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
});
