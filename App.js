import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";

import { useState } from 'react';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);

  const getFonts = () =>
        Font.loadAsync({
            PixeloidSansBold: require("./assets/fonts/PixeloidSans-Bold.ttf"),
            PixeloidSans: require("./assets/fonts/PixeloidSans.ttf"),
        });    

  if (fontsloaded) {
    return <Main />;
  } else {
      return (
        <AppLoading
        startAsync={getFonts}
        onFinish={() => {
            setFontsLoaded(true);
        }}
        onError={console.warn}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

const fontStyles = StyleSheet.create({
  pixelBoldFont: {
    fontFamily: 'PixeloidSansBold'
  },
  pixelFont: {
    fontFamily: 'PixeloidSans'
  }

})
export {fontStyles}
