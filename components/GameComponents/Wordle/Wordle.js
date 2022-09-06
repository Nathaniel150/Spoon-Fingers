import { View, Text} from "react-native";
import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";

import Keyboard from "./Keyboard";
import styles from './styles'
import { CLEAR, ENTER, colors} from "./wordleConstants";

import { fontStyles } from "../../../App";

const NUM_TRIES = 5

const copyArray = (arr) => {
  return [...arr.map(rows => [...rows])]
}

const Wordle = ({ setVisible, setWon, targetWord}) => {
  const word = targetWord;
  const letters = word.split(''); // ['h', 'e', 'l', 'l', 'o']

  const [rows, setRows] = useState(
    new Array(NUM_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [rowsBGColor, setBGColor] = useState(
    new Array(NUM_TRIES).fill(new Array(letters.length).fill(colors.white))
  )

  const[currRow, setCurrRow] = useState(0)
  const[currCol, setCurrCol] = useState(0)

  useEffect(() => {
    if(currRow > 0) {
      checkGameState();
    }

  }, [currRow])

  const clearGame = () => {
    setRows(new Array(NUM_TRIES).fill(new Array(letters.length).fill("")))
    setBGColor(new Array(NUM_TRIES).fill(new Array(letters.length).fill(colors.white)))
    setCurrRow(0)
    setCurrCol(0)
  }

  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  const checkGameState = () => {
    if(checkIfWon()) {
      wait(1000)
      setWon(true) 
      setVisible(true)
      clearGame()
     
    } else if(checkIfLost()) {
      wait(1000)
      setWon(false)
      setVisible(true)
      clearGame()
    }
  }


  
  const checkIfWon = () => {
    const row = rows[currRow - 1]
    return row.every((letter, i) => letter === letters[i])
  }

  const checkIfLost = () => {
      return currRow === rows.length;
  }

  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows)

    if(key === CLEAR){
      const prevCol= currCol - 1;
      if(prevCol >= 0) {
        updatedRows[currRow][prevCol] = "";
        setRows(updatedRows);
        setCurrCol(currCol - 1);
      }
      return;
    }

    if(key === ENTER) {
      if(currCol === rows[0].length){
        updateRowBGColor(currRow)
        setCurrRow(currRow + 1);
        setCurrCol(0);
      }
      return;
    }

    if(currCol < rows[0].length){
      updatedRows[currRow][currCol] = key;
      setRows(updatedRows);
      setCurrCol(currCol + 1)
    }
      
  }


  const updateRowBGColor = (row) => {
    let updatedRowsColors = copyArray(rowsBGColor)
    let answer = letters;
    const guess = rows[row]
    let newColors = [colors.black, colors.black, colors.black, colors.black, colors.black]

    setGreens(newColors, guess, answer)
    setYellows(newColors, guess, answer)

    updatedRowsColors[row] = newColors
    setBGColor(updatedRowsColors)
  }

  const setGreens = (newColors, guess, answer) => {
    for(let i = 0; i < guess.length; i++) {
      if(guess[i] === answer[i]) {
        newColors[i] = colors.greenLock;
        answer[i] = ""
      }
    }
  }
  const setYellows = (newColors, guess, answer) => {
    for(let i = 0; i < guess.length; i++) {
      if(newColors[i] != colors.greenLock) {
        if(answer.includes(guess[i])) {
          newColors[i] = colors.yellowLock
          answer[answer.indexOf(guess[i])] = ""
        }
      }
    }
  }


  const getAllLetterWithColor = (color) => {
    return rows.flatMap((row, i) => 
    row.filter((cell, j) => rowsBGColor[i][j] === color)
    );
  }


  const greenCaps = getAllLetterWithColor(colors.greenLock);
  const yellowCaps = getAllLetterWithColor(colors.yellowLock);
  const greyCaps = getAllLetterWithColor(colors.grey)


  return (
    <View style={styles.container}>
      <View style={styles.map}>

        {rows.map((row, i) => (
          <View key={`row-${i}`}style={styles.row}>
            {row.map((letter, j) => (
              <ImageBackground
                key={`row-${i}:col${j}`}
                style={[
                    styles.cell, 
                  ]}
                source={letter=== "" ? 
                  require("../../../assets/Wordle/locked.png"): 
                  rowsBGColor[i][j] === colors.green ? require("../../../assets/Wordle/unlocked.png") : require("../../../assets/Wordle/noHole.png")}
              >
                <Text style={[styles.cellText, fontStyles.pixelFont, {color: rowsBGColor[i][j]}]}>{letter.toUpperCase()}</Text>
              </ImageBackground>
            ))}
          </View>
        ))}
        
      </View>
      <Keyboard 
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </View>
    
  );
};


export default Wordle;
