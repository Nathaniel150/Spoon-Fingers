import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Main2 from "./components/Main2.0";

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
    return <Main2/>
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
