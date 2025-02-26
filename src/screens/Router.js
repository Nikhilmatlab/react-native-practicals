import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './AppStack/Home/Home';
import {SCREENS} from '../common/Utils/Screens';
import DisableList from './AppStack/DisableList/DisableList';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREENS.Home} component={Home} />
        <Stack.Screen name={SCREENS.DisableList} component={DisableList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
