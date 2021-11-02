import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Items from "../Screens/Items"
import PostForm from "../Screens/PostForm"
import UpdateNotes from "../Screens/UpdateNotes"
import SingleItem from "../Screens/SingleItem"
const Stack = createStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Items"
                component={Items}
                options={{header:() => null,
                    title: "Items"
                }}
            />
        <Stack.Screen 
                name='Details'
                component={SingleItem}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen name="Create Form" component={PostForm}  />
            <Stack.Screen name="Update Notes" component={UpdateNotes} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MainStack />
}