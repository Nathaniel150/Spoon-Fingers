import { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import Constants from "../../Constants";
import BattleshipSquare from "./BattleshipSquare";
import Draggable from "react-native-draggable";
import Ship from "./Ship";

export default function BattleShipBoard({ updateState }) {
  //TODO I think this should have a dependence on shipInfoTracker, but it wasn't working for some reason.
  useEffect(() => {
    console.log("Ship info", shipInfoTracker);
    if (checkFinishedSetup()) {
      console.log("finished");
      updateState();
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
      isSunk: false,
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    let board = [];
    for (let i = 0; i < Constants.BATTLESHIP_BOARD_DIMENSIONS; i++) {
      let row = [];

      for (let j = 0; j < Constants.BATTLESHIP_BOARD_DIMENSIONS; j++) {
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
        selected: false,
        placed: false,
        orientation: "vertical",
        size: Constants.BATTLESHIP_SIZES[i],
      };
      ships.push({ ...defaultShip });
    }
    return ships;
  };

  const checkFinishedSetup = () => {
    return shipInfoTracker.every((ship) => {
      return ship.placed;
    });
  };

  const selectShip = (i) => {
    let infoTrackerCopy = [...shipInfoTracker];
    for (let k = 0; k < infoTrackerCopy.length; k++) {
      //set the correct ship to selected.
      if (k == i) {
        infoTrackerCopy[k].selected = true;
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
      if (j + size > Constants.BATTLESHIP_BOARD_DIMENSIONS) {
        return false;
      }

      for (let k = 0; k < size; k++) {
        if (board[i][j + k].isShip) {
          return false;
        }
      }
    }

    if (orientation == "horizontal") {
      if (i + size > Constants.BATTLESHIP_BOARD_DIMENSIONS) {
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
    // let ship = shipInfoTracker.filter((ship) => ship.selected == true);
    console.log("Ship", ship);
    //check if the ship can be placed in this location.
    let newBoard = [...board];

    //will stop the player from placing a ship in an illegal spot.
    if (!canPlaceShip(i, j, ship.orientation, ship.size)) {
      console.log("here");
      return;
    }

    if (ship.orientation == "vertical") {
      for (let k = 0; k < ship.size; k++) {
        console.log("here");
        newBoard[i][j + k].isShip = true;
        console.log("Placing Ship: ", newBoard[i][j + k].isShip);
      }
    } else if (ship.orientation == "horizontal") {
      for (let k = 0; k < ship.size; k++) {
        console.log("here");
        newBoard[i + k][j].isShip = true;
        console.log("Placing Ship: ", newBoard[i + k][j].isShip);
      }
    }
    ship.placed = true;

    let infoTrackerCopy = [...shipInfoTracker];
    infoTrackerCopy[shipIndex] = ship;
    setShipInfoTracker(infoTrackerCopy);
    setBoard(newBoard);
  };

  //an array of booleans that tracks which ships have been hit.
  const [board, setBoard] = useState(() => createBoard());
  //To keep track of which ships (draggable elements) have been places, so I can remove them from the screen when they have been placed.
  const [shipInfoTracker, setShipInfoTracker] = useState(() => initShips());
  //keeping track of if the player is still setting up their board or if they are playing the game.
  const [isSetup, setIsSetup] = useState(true);

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: 50,
        }}
      >
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
                  />
                );
              })}
            </View>
          );
        })}
      </View>

      {/* I want the draggable to dissapear after it is realeased. */}
      {shipInfoTracker.map((ship, i) => {
        if (ship.placed) {
          return;
        }

        return (
          <Draggable key={i}>
            <Ship
              selectShip={() => selectShip(i)}
              changeOrientation={() => changeOrientation(i)}
              battleShipSize={Constants.BATTLESHIP_SIZES[i]}
              ship={ship}
              orientation={ship.orientation}
              x={50 + i * 100}
              y={500}
              i={i}
            />
          </Draggable>
        );
      })}
      <Pressable
        onPress={() => {
          changeOrientation();
        }}
        style={{
          top: 600,
          zIndex: 2000,
          backgroundColor: "grey",
          height: "40%",
          width: "30%",
        }}
        color={"red"}
      >
        <Text>Flip</Text>
      </Pressable>
    </SafeAreaView>
  );
}

//Todo if I place a ship, it should auto select a new one
