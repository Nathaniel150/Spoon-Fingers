import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
        <View style={styles.grey}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/prisonerEyepatch.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else {
      return (
        <View onTouchStart={() => placeShip(i, j)} style={styles.blue}></View>
      );
    }
  }

  if (enemy) {
    if (square.isSunk && square.isShip) {
      return (
        <View style={styles.darkRed}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/CharacterProfileImages/guard.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else if (square.isShip && square.isHit) {
      return (
        <View style={styles.red}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets//CharacterProfileImages/guard.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.white} />;
    } else if (square.isShip) {
      return <View onTouchStart={gotHit} style={styles.blue}></View>;
    } else {
      return (
        <View onTouchStart={gotHit} style={styles.blue}>
          {/* <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/table.png")}
            // We can use a gif here for short digging animation
          /> */}
        </View>
      );
    }
  }
  //player's board. Basically the same except none of the onTouchStart functions trigger.
  else {
    if (square.isShip && square.isSunk) {
      return (
        <View style={styles.darkRed}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/prisonerEyepatch.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else if (square.isShip && square.isHit) {
      return (
        <View style={styles.red}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/prisonerEyepatch.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.white}></View>;
    } else if (square.isShip) {
      return (
        <View style={styles.grey}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/prisonerEyepatch.png")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else {
      return (
        <View style={styles.blue}>
          {/* <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/table.png")}
            // We can use a gif here for short digging animation
          /> */}
        </View>
      );
    }
  }
}

const styles = new StyleSheet.create({
  blue: {
    backgroundColor: "#ffffff3f",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  white: {
    backgroundColor: "grey",
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
    backgroundColor: "#524d4a6f",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
});
