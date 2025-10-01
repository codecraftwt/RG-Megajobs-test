import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Authentication/Login';

export default function AuthStack() {
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };


const styles = StyleSheet.create({})