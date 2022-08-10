import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Header,
  ImageBackground,
} from "react-native";
import Constants from "../../Constants";
import BattleshipSquare from "./BattleshipSquare";
import Draggable from "react-native-draggable";
import Ship from "./Ship";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Provider,
} from "@react-native-material/core";
import { StackActions } from "@react-navigation/routers";

export default function BattleShipBoard({ navigation, route }) {
  const lvlUnlock = route.params.lvlUnlock;
  const popAction = StackActions.pop(1)

  //TODO I think this should have a dependence on shipInfoTracker, but it wasn't working for some reason.
  useEffect(() => {
    if (checkFinishedSetup()) {
      setReady(true);
    }
  });

  //Build the board that is basically empty.
  const createBoard = () => {
    //this stores information about how the game state of each square
    // as well as the loacation that each square is rendered at.
    // The location information will be set as each square is rendered in BattleshipSquare.
    let defaultSquare = {
      isShip: false,
      isHit: false,
      shipId: null, //when each ship is placed, it is given an id, so we can figure out when it is sunk
      isSunk: false,
    };

    let board = [];
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_WIDTH; i++) {
      let row = [];

      for (let j = 0; j < Constants.BATTLESHIP_BOARD_HEIGHT; j++) {
        row.push({ ...defaultSquare });
      }
      board.push(row);
    }
    return board;
  };

  const initShips = () => {
    let ships = [];
    for (let i = 0; i < Constants.NUM_BATTLESHIPS; i++) {
      let defaultShip = {
        selected: false, //used in setup to know which ship to place
        placed: false, // used in setup to show whether the ship has been placed.
        orientation: "vertical", // which way the ship is facing.
        size: Constants.BATTLESHIP_SIZES[i],
      };
      ships.push({ ...defaultShip });
    }
    return ships;
  };

  const initEnemyBoard = () => {};
  //once the enemy board has been initialized, randomly place the
  // ships on it.
  useEffect(() => {
    console.log("Initializing enemy board");
    if (enemyBoard && isSetup) {
      for (let i = 0; i < Constants.NUM_BATTLESHIPS; i++) {
        //place the battle ship at random location
        let col = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_WIDTH);
        let row = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_HEIGHT);

        let orientations = ["vertical", "horizontal"];
        let index = Math.floor(Math.random() * 2);
        while (
          !canPlaceEnemyShip(
            col,
            row,
            orientations[index],
            Constants.BATTLESHIP_SIZES[i]
          )
        ) {
          col = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_WIDTH);
          row = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_HEIGHT);
          index = Math.floor(Math.random() * 2);
        }
        placeEnemyShip(
          col,
          row,
          orientations[index],
          Constants.BATTLESHIP_SIZES[i],
          i // use i as the shipId
        );
      }
    }
  }, [enemyBoard]);

  useEffect(() => {
    if (!isSetup) {
      setWon(hasWon);
      setLost(hasLost);
    }
  });

  //returns true when all the enemy ships have been sunk.
  const hasWon = () => {
    //the player can't win during setup
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_WIDTH; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_HEIGHT; j++) {
        //make sure every square that is a ship is also sunk.
        if (enemyBoard[i][j].isShip && !enemyBoard[i][j].isSunk) {
          return false;
        }
      }
    }
    console.log("YOU WON!");
    return true;
  };

  //return true if all the player's ships have bee sunk.
  const hasLost = () => {
    //the player can't lose during setup

    for (let i = 0; i < Constants.BATTLESHIP_BOARD_WIDTH; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_HEIGHT; j++) {
        console.log(board[i][j].isSunk);
        if (board[i][j].isShip && !board[i][j].isSunk) {
          return false;
        }
      }
    }
    return true;
  };

  //check that it is allowed to place the ship at the location i,j
  const canPlaceEnemyShip = (i, j, orientation, size) => {
    if (orientation == "vertical") {
      if (j + size > Constants.BATTLESHIP_BOARD_HEIGHT) {
        return false;
      }

      for (let k = 0; k < size; k++) {
        if (enemyBoard[i][j + k].isShip) {
          return false;
        }
      }
    }

    if (orientation == "horizontal") {
      if (i + size > Constants.BATTLESHIP_BOARD_WIDTH) {
        return false;
      }

      for (let k = 0; k < size; k++) {
        if (enemyBoard[i + k][j].isShip) {
          return false;
        }
      }
    }

    return true;
  };

  //place the ship based on its orientation.
  const placeEnemyShip = (col, row, orientation, size, id) => {
    let newBoard = [...enemyBoard];

    if (orientation == "vertical") {
      for (let k = 0; k < size; k++) {
        newBoard[col][row + k].isShip = true;
        newBoard[col][row + k].shipId = id;
      }
    } else if (orientation == "horizontal") {
      for (let k = 0; k < size; k++) {
        newBoard[col + k][row].isShip = true;
        newBoard[col + k][row].shipId = id;
      }
    }
    setEnemyBoard(newBoard);
  };

  const checkFinishedSetup = () => {
    return shipInfoTracker.every((ship) => {
      return ship.placed;
    });
  };

  const startGame = () => {
    setIsSetup(false);
    setReady(false); //To hide the popup menu
  };

  const selectShip = (i) => {
    let infoTrackerCopy = [...shipInfoTracker];

    for (let k = 0; k < infoTrackerCopy.length; k++) {
      //set the correct ship to selected.
      if (k == i) {
        infoTrackerCopy[k].selected = true;
        changeOrientation(i);
      }
      //unselect all the other ships.
      else {
        infoTrackerCopy[k].selected = false;
      }
    }

    setShipInfoTracker(infoTrackerCopy);
  };

  const changeOrientation = (i) => {
    let infoTrackerCopy = [...shipInfoTracker];

    for (let k = 0; k < infoTrackerCopy.length; k++) {
      //change the orentation of the selcted ship.
      if (shipInfoTracker[k].selected) {
        if (shipInfoTracker[k].orientation == "horizontal") {
          shipInfoTracker[k].orientation = "vertical";
        } else {
          shipInfoTracker[k].orientation = "horizontal";
        }
        break;
      }
    }
    setShipInfoTracker(infoTrackerCopy);
  };

  const canPlaceShip = (i, j, orientation, size) => {
    if (orientation == "vertical") {
      if (j + size > Constants.BATTLESHIP_BOARD_HEIGHT) {
        return false;
      }

      for (let k = 0; k < size; k++) {
        if (board[i][j + k].isShip) {
          return false;
        }
      }
    }

    if (orientation == "horizontal") {
      if (i + size > Constants.BATTLESHIP_BOARD_WIDTH) {
        return false;
      }

      for (let k = 0; k < size; k++) {
        if (board[i + k][j].isShip) {
          return false;
        }
      }
    }

    return true;
  };

  //places a ship on the board. The i and j are the indices where the ship should start.
  const placeShip = (i, j) => {
    let shipIndex = shipInfoTracker.findIndex((ship) => ship.selected == true);
    let ship = shipInfoTracker[shipIndex];

    //disable placement if no ship is selected.
    if (ship == undefined) {
      return;
    }

    //check if the ship can be placed in this location.
    let newBoard = [...board];

    //will stop the player from placing a ship in an illegal spot.
    if (!canPlaceShip(i, j, ship.orientation, ship.size)) {
      return;
    }

    if (ship.orientation == "vertical") {
      for (let k = 0; k < ship.size; k++) {
        newBoard[i][j + k].isShip = true;
        newBoard[i][j + k].shipId = shipIndex;
      }
    } else if (ship.orientation == "horizontal") {
      for (let k = 0; k < ship.size; k++) {
        newBoard[i + k][j].isShip = true;
        newBoard[i + k][j].shipId = shipIndex;
      }
    }
    ship.selected = false;
    ship.placed = true;

    let infoTrackerCopy = [...shipInfoTracker];
    infoTrackerCopy[shipIndex] = ship;
    setShipInfoTracker(infoTrackerCopy);
    setBoard(newBoard);
  };

  const resetBoard = () => {
    setReady(false);
    setBoard(createBoard);
    setShipInfoTracker(initShips);
    // initEnemyBoard();
    // setEnemyBoard(createBoard);
    // setIsSetup(true);
  };

  const [enemyFound, setEnemyFound] = useState(false); //if the enemy has hit a ship.
  //used to search in all direction.
  const [nextFoundI, setNextFoundI] = useState(null);
  const [nextFoundJ, setNextFoundJ] = useState(null);
  //used keep track of starting point and search after nextFoundI and J have reached a dead end;
  const [foundI, setFoundI] = useState(null);
  const [foundJ, setFoundJ] = useState(null);
  const [direction, setDirection] = useState("vertical");

  const takeEnemyTurn = () => {
    let newBoard = [...board];
    console.log("DIRECTION: ", direction);
    if (!enemyFound) {
      let col = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_WIDTH);
      let row = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_HEIGHT);

      //make sure the computer doesn't go after a square that it already chose.
      while (newBoard[col][row].isHit) {
        col = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_WIDTH);
        row = Math.floor(Math.random() * Constants.BATTLESHIP_BOARD_HEIGHT);
      }

      newBoard[col][row].isHit = true;
      if (newBoard[col][row].isShip) {
        console.log("Checking sunk on enemy turn");
        setEnemyFound(true);
        setFoundI(col);
        setFoundJ(row);
        setNextFoundI(col);
        setNextFoundJ(row);
        checkIfSunk(newBoard[col][row].shipId, newBoard, false);
      }
    } else {
      //try in each of the 4 direction surrounding the square where the computer founda a ship;
      if (nextFoundJ - 1 >= 0 && !newBoard[nextFoundI][nextFoundJ - 1].isHit) {
        newBoard[nextFoundI][nextFoundJ - 1].isHit = true;
        if (newBoard[nextFoundI][nextFoundJ - 1].isShip) {
          setEnemyFound(
            !checkIfSunk(
              newBoard[nextFoundI][nextFoundJ - 1].shipId,
              newBoard,
              false
            )
          );
          setNextFoundJ(nextFoundJ - 1);
          setDirection("vertical");
        }
      } else if (
        nextFoundJ + 1 < Constants.BATTLESHIP_BOARD_HEIGHT &&
        !newBoard[nextFoundI][nextFoundJ + 1].isHit
      ) {
        newBoard[nextFoundI][nextFoundJ + 1].isHit = true;

        if (newBoard[nextFoundI][nextFoundJ + 1].isShip) {
          setEnemyFound(
            !checkIfSunk(
              newBoard[nextFoundI][nextFoundJ + 1].shipId,
              newBoard,
              false
            )
          );
          setNextFoundJ(nextFoundJ + 1);
          setDirection("vertical");
        }
      } else if (
        nextFoundI - 1 >= 0 &&
        !newBoard[nextFoundI - 1][nextFoundJ].isHit
      ) {
        newBoard[nextFoundI - 1][nextFoundJ].isHit = true;

        if (newBoard[nextFoundI - 1][nextFoundJ].isShip) {
          setEnemyFound(
            !checkIfSunk(
              newBoard[nextFoundI - 1][nextFoundJ].shipId,
              newBoard,
              false
            )
          );
          setNextFoundI(nextFoundI - 1);
          setDirection("horizontal");
        }
      } else if (
        nextFoundI + 1 < Constants.BATTLESHIP_BOARD_WIDTH &&
        !newBoard[nextFoundI + 1][nextFoundJ].isHit
      ) {
        newBoard[nextFoundI + 1][nextFoundJ].isHit = true;
        if (newBoard[nextFoundI + 1][nextFoundJ].isShip) {
          setEnemyFound(
            !checkIfSunk(
              newBoard[nextFoundI + 1][nextFoundJ].shipId,
              newBoard,
              false
            )
          );
          setNextFoundI(nextFoundI + 1);
          setDirection("horizontal");
        }
      }
      //once nextFoundI and J have reached a dead end, revert to
      else {
        if (foundJ - 1 >= 0 && !newBoard[foundI][foundJ - 1].isHit) {
          newBoard[foundI][foundJ - 1].isHit = true;
          if (newBoard[foundI][foundJ - 1].isShip) {
            setEnemyFound(
              !checkIfSunk(newBoard[foundI][foundJ - 1].shipId, newBoard, false)
            );
            setNextFoundJ(foundJ - 1);
            setDirection("vertical");
          }
        } else if (
          foundJ + 1 < Constants.BATTLESHIP_BOARD_HEIGHT &&
          !newBoard[foundI][foundJ + 1].isHit
        ) {
          newBoard[foundI][foundJ + 1].isHit = true;

          if (newBoard[foundI][foundJ + 1].isShip) {
            setEnemyFound(
              !checkIfSunk(newBoard[foundI][foundJ + 1].shipId, newBoard, false)
            );
            setNextFoundJ(foundJ + 1);
            setDirection("vertical");
          }
        } else if (foundI - 1 >= 0 && !newBoard[foundI - 1][foundJ].isHit) {
          newBoard[foundI - 1][foundJ].isHit = true;

          if (newBoard[foundI - 1][nextFoundJ].isShip) {
            setEnemyFound(
              !checkIfSunk(newBoard[foundI - 1][foundJ].shipId, newBoard, false)
            );
            setNextFoundI(foundI - 1);
            setDirection("horizontal");
          }
        } else if (
          foundI + 1 < Constants.BATTLESHIP_BOARD_WIDTH &&
          !newBoard[foundI + 1][foundJ].isHit
        ) {
          newBoard[foundI + 1][foundJ].isHit = true;
          if (newBoard[foundI + 1][foundJ].isShip) {
            setEnemyFound(
              !checkIfSunk(newBoard[foundI + 1][foundJ].shipId, newBoard, false)
            );
            setNextFoundI(foundI + 1);
            setDirection("horizontal");
          }
        } else {
          setEnemyFound(false);
        }
      }
    }
    setBoard(newBoard);
  };

  const checkIfSunk = (id, boardToUse, enemyBoard) => {
    console.log("Checking sunk", id);
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_WIDTH; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_HEIGHT; j++) {
        if (boardToUse[i][j].shipId == id && !boardToUse[i][j].isHit) {
          console.log("Not Sunk", i, j);
          return false;
        }
      }
    }
    let newBoard = [...boardToUse];
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_WIDTH; i++) {
      for (let j = 0; j < Constants.BATTLESHIP_BOARD_HEIGHT; j++) {
        if (newBoard[i][j].shipId == id) {
          newBoard[i][j].isSunk = true;
        }
      }
    }
    if (enemyBoard) {
      setEnemyBoard(newBoard);
    } else {
      setBoard(newBoard);
    }
    return true;
  };

  //an array of booleans that tracks which ships have been hit.
  const [board, setBoard] = useState(() => createBoard());

  const [enemyBoard, setEnemyBoard] = useState(() => createBoard());

  //To keep track of which ships (draggable elements) have been placed, so I can remove them from the screen when they have been placed.
  const [shipInfoTracker, setShipInfoTracker] = useState(() => initShips());
  //keeping track of if the player is still setting up their board or if they are playing the game.
  const [isSetup, setIsSetup] = useState(true);

  const [ready, setReady] = useState(false);
  //keep track of when the player wins
  const [won, setWon] = useState(false);
  //keep track of when the player loses
  const [lost, setLost] = useState(false);

  return (
    <ImageBackground
      source={require("../../../assets/grey-background.jpeg")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.battleship_container}>
        <View style={styles.board}>
          {board.map((row, i) => {
            return (
              <View key={`row+${i}`}>
                {row.map((square, j) => {
                  return (
                    <BattleshipSquare
                      key={`square+${i}+${j}`}
                      setup={isSetup}
                      placeShip={() => placeShip(i, j)}
                      square={square}
                      board={board}
                      setBoard={setBoard}
                      i={i}
                      j={j}
                      enemy={false}
                      checkIfSunk={checkIfSunk}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>

        {/* Spacer will eventually have fight animation */}
        {isSetup ? (
          <></>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                backgroundColor: "#663801",
                width: "100%",
                resizeMode: "contain",
              }}
              source={require("../../../assets/200.gif")}
            />

          </View>
        )}
        {isSetup ? (
          <></>
        ) : (
          <View style={styles.board}>
            {enemyBoard.map((row, i) => {
              return (
                <View key={`row+${i}`}>
                  {row.map((square, j) => {
                    return (
                      <BattleshipSquare
                        key={`square+${i}+${j}`}
                        setup={isSetup}
                        placeShip={() => {}}
                        square={square}
                        board={enemyBoard}
                        setBoard={setEnemyBoard}
                        i={i}
                        j={j}
                        enemy={true}
                        takeEnemyTurn={() => takeEnemyTurn()}
                        checkIfSunk={checkIfSunk}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}

        {isSetup ? (
          shipInfoTracker.map((ship, i) => {
            if (ship.placed) {
              return;
            }
            const screenWidth = Dimensions.get("window").width;

            let x = 50 + i * 100;

            let y =
              (screenWidth / Constants.BATTLESHIP_BOARD_WIDTH - 5) *
                Constants.BATTLESHIP_BOARD_HEIGHT +
              100;

            return (
              <Ship
                key={`ship${i}`}
                selectShip={() => selectShip(i)}
                changeOrientation={() => changeOrientation(i)}
                battleShipSize={Constants.BATTLESHIP_SIZES[i]}
                ship={ship}
                orientation={ship.orientation}
                x={x}
                y={y}
                i={i}
              />
            );
          })
        ) : (
          <></>
        )}

        <Provider>
          <Dialog visible={ready}>
            {/* <DialogHeader title={won === true ? "WON" : "LOST"} /> */}
            <DialogContent>
              <Text>Content</Text>
            </DialogContent>
            <DialogActions>
              <Button
                title="Reset"
                compact
                variant="text"
                onPress={() => resetBoard()}
              />
              <Button
                title="Start"
                compact
                variant="text"
                onPress={() => startGame()}
              />
            </DialogActions>
          </Dialog>
        </Provider>
        {/* Popup menu when the player wins */}
        <Provider>
          <Dialog visible={won}>
            <DialogContent>
              <Text>Congrats!</Text>
            </DialogContent>
            <DialogActions>
              <Button
                title="Escape Cafeteria"
                compact
                variant="text"
                onPress={() => {lvlUnlock(); navigation.dispatch(popAction); navigation.navigate(Constants.STORY_P3)}}
              />
            </DialogActions>
          </Dialog>
        </Provider>
        <Provider>
          <Dialog visible={lost}>
            <DialogContent>
              <Text>The Guards Have Defeated you!</Text>
            </DialogContent>
            <DialogActions>
              {/* TODO Once I have the new updateState function, this button will return the player to the levels page */}
              <Button
                title="Continue"
                compact
                variant="text"
                onPress={() => {navigation.dispatch(popAction); navigation.navigate(Constants.STORY_P2)} }
              />
            </DialogActions>
          </Dialog>
        </Provider>
      </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  battleship_container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // marginBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  ship_container: {
    display: "flex",
    // backgroundColor: "red",
    borderWidth: 4,
    borderColor: "red",
  },
});

//Todo if I place a ship, it should auto select a new one
