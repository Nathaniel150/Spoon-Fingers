import { View, Text, Pressable } from "react-native";
import { keys, ENTER, CLEAR, colors } from "./wordleConstants";
import styles, { keyWidth } from "./keyboardStyles";
import { fontStyles } from "../../../App";

const Keyboard = ({
onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key) => {
    return key === ENTER || key === CLEAR;
  };

  const getKeyBGColor = (key) => {
    if (greenCaps.includes(key)) {
      return colors.green;
    }
    if (yellowCaps.includes(key)) {
      return colors.yellow;
    }
    if (greyCaps.includes(key)) {
      return colors.darkgrey;
    }
    return colors.grey;
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              disabled={greyCaps.includes(key)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              <Text style={[styles.keyText, fontStyles.pixelFont]}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <Pressable
        onPress={() => onKeyPressed(ENTER)}
        disabled={greyCaps.includes(ENTER)}
        style={[
          styles.key,
          styles.enter
        ]}
      >
        <Text style={[styles.keyText, fontStyles.pixelFont]}>{ENTER}</Text>

      </Pressable>
    </View>
  );
};

export default Keyboard;
