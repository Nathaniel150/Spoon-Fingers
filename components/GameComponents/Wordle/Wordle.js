import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";

import Keyboard from "./Keyboard";
import styles from './styles'
import { CLEAR, ENTER, colors} from "./wordleConstants";

import CountDown from 'react-native-countdown-component';
import { fontStyles } from "../../../App";
import { color } from "react-native-reanimated";

const NUM_TRIES = 5

const copyArray = (arr) => {
  return [...arr.map(rows => [...rows])]
}

const Wordle = ({ setVisible, setWon, targetWord, timerOn, setTimerOn, timeLimit, id }) => {
  const word = targetWord;
  const letters = word.split(''); // ['h', 'e', 'l', 'l', 'o']

  const [rows, setRows] = useState(
    new Array(NUM_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [rowsBGColor, setBGColor] = useState(
    new Array(NUM_TRIES).fill(new Array(letters.length).fill("#ffffff"))
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
    setBGColor(new Array(NUM_TRIES).fill(new Array(letters.length).fill(null)))
    setCurrRow(0)
    setCurrCol(0)
    setTimerOn(false)
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
      wait(500)
      setWon(true)
      setVisible(true)
      clearGame()

    } else if(checkIfLost()) {
      wait(500)
      setWon(false)
      setVisible(true)
      clearGame()

    }
  }

  const loseGame = () => {
    wait(500)
    setWon(false)
    setVisible(true)
    clearGame()
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
        newColors[i] = colors.green;
        answer[i] = ""
      }
    }
  }
  const setYellows = (newColors, guess, answer) => {
    for(let i = 0; i < guess.length; i++) {
      if(newColors[i] != colors.green) {
        if(answer.includes(guess[i])) {
          newColors[i] = colors.yellow
          answer[answer.indexOf(guess[i])] = ""
        }
      }
    }
  }



  // const getCellBGColor = (row, col) => {
  //   const letter = rows[row][col]
  //   if(row >= currRow) {
  //     return "pink"
  //   }
  //   if(letter === letters[col]) {
  //     return colors.green;
  //   }
  //   if(letters.includes(letter)) {
  //     return colors.yellow;
  //   }

  //   return colors.grey;
  // }

  const getAllLetterWithColor = (color) => {
    return rows.flatMap((row, i) => 
    row.filter((cell, j) => rowsBGColor[i][j] === color)
    );
  }


  const greenCaps = getAllLetterWithColor(colors.green);
  const yellowCaps = getAllLetterWithColor(colors.yellow);
  const greyCaps = getAllLetterWithColor(colors.grey)


  return (
    <View style={styles.container}>
      {/* <Text style={[styles.title, fontStyles.pixelFont]}>LOCKLE</Text> */}
      <CountDown
          key={id}
          until={timeLimit}
          size={25}
          onFinish={() => loseGame()}
          digitStyle={{backgroundColor: 'white'}}
          digitTxtStyle={{color: colors.darkgrey}}
          timeToShow={['M', 'S']}
          timeLabels={{m:null,s: null}}
          running={timerOn}
      />
      <View style={styles.map}>

        {rows.map((row, i) => (
          <View key={`row-${i}`}style={styles.row}>
            {row.map((letter, j) => (
              // <View 
              //   key={`cell-${i}-${j}`}
              //   style={[
              //     styles.cell, 
              //     { 
              //       backgroundColor: rowsBGColor[i][j]
              //     }
              //   ]}>
              //   <ImageBackground
              //     style={{flex:1}}
              //     source={require("../../../assets/locked.png")}
              //   >
              //       <Text style={[styles.cellText, fontStyles.pixelFont]}>{letter.toUpperCase()}</Text>

              //   </ImageBackground>
              // </View>
              <ImageBackground
                   style={[
                    styles.cell, 
                    //{ backgroundColor: rowsBGColor[i][j]}
                  ]}
                  source={letter=== "" ? 
                  require("../../../assets/locked.png"): 
                  rowsBGColor[i][j] === colors.green ? require("../../../assets/unlocked.png") : require("../../../assets/noHole.png")}
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
