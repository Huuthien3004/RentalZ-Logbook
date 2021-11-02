import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Main from "./Navigators/Main";


LogBox.ignoreAllLogs(true);

export default function App() {
  return (
        <NavigationContainer>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
  );
}