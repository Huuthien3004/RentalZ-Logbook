import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack"

// Stacks
import Home from "./Index";
import PostForm from "../Screens/PostForm";
import Notification from "../Screens/Notification";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {


  return (
    <Tab.Navigator
      initialRouteName=""
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2ACAEA",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ]
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      /> */}
            <Tab.Screen
        name="Post"
        component={PostForm}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={30} />
          ),
        }}
      />

<Tab.Screen
        name="Alarm"
        component={Notification}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={30} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default Main;