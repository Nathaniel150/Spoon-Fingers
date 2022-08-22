import { Icon } from "@rneui/base";

export const colors = {
    black: "#121214",
    darkgrey: "#3A3A3D",
    grey: "#818384",
    lightgrey: "#D7DADC",
    greenLock: "#19fc00",
    yellowLock: "#FAF700",
    green: "#007810",
    yellow: "#d4be00",
    white: "#ffffff"
  };
  
  export const colorsToEmoji = {
    [colors.darkgrey]: "⬛",
    [colors.primary]: "🟩",
    [colors.secondary]: "🟧",
  };
  
  export const CLEAR =  <Icon name='backspace'type='ionicon'color='white'/>
  export const ENTER= "UNLOCK";

  
  export const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    [ "z", "x", "c", "v", "b", "n", "m", CLEAR],
  ];