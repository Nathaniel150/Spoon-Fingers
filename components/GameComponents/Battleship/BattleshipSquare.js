import { View, Text, StyleSheet, Image, Platform } from "react-native";
import Constants from "../../Constants";

const blockSize = Platform.isPad
  ? Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 20
  : Constants.MAX_WIDTH / Constants.BATTLESHIP_BOARD_WIDTH - 5;

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

  if (setup && enemy) {
    return <View style={styles.hidden} />;
  }

  if (setup) {
    if (square.isShip) {
      return (
        <View style={styles.white}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/Battleship/prisoner1_repeat.gif")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else {
      return (
        <View onTouchStart={() => placeShip(i, j)} style={styles.white}></View>
      );
    }
  }

  if (enemy) {
    if (square.isSunk && square.isShip) {
      return (
        <View style={styles.black}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/Battleship/prisonGuardDefeated.png")}
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
            source={require("../../../assets/Battleship/stunnedGuard.png")}
          />
        </View>
      );
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.hit} />;
    } else if (square.isShip) {
      return <View onTouchStart={gotHit} style={styles.white}></View>;
    } else {
      return <View onTouchStart={gotHit} style={styles.white}></View>;
    }
  }
  //player's board. Basically the same except none of the onTouchStart functions trigger.
  else {
    if (square.isShip && square.isSunk) {
      return (
        <View style={styles.black}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/Battleship/prisoner1_defeated.gif")}
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
            source={require("../../../assets/Battleship/prisoner1_defeated.gif")}
            // We can use a gif here for short digging animation
          />
        </View>
      );
    } else if (!square.isShip && square.isHit) {
      return <View style={styles.hit}></View>;
    } else if (square.isShip) {
      return (
        <View style={styles.white}>
          <Image
            style={{
              height: blockSize,
              width: blockSize,
              resizeMode: "contain",
            }}
            source={require("../../../assets/Battleship/prisoner1_repeat.gif")}
          />
        </View>
      );
    } else {
      return <View style={styles.white}></View>;
    }
  }
}

const styles = new StyleSheet.create({
  hit: {
    backgroundColor: "grey",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  red: {
    backgroundColor: "#db2524",
    height: blockSize,
    width: blockSize,
    borderColor: "black",
    borderWidth: 1,
  },
  black: {
    backgroundColor: "black",
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
  hidden: {
    height: blockSize,
    width: blockSize,
  },
});
