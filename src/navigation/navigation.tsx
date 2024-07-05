import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import BlockedListScreen from "../screens/BlockedListScreen";

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen
        name={"BlockedListScreen"}
        component={BlockedListScreen as any}
      />
    </Stack.Navigator>
  );
};
