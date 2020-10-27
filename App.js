import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryList from './src/components/CountryList';
import CountryView from './src/components/CountryView'

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CountryList" component={CountryList} />
        <Stack.Screen name="CountryDetail" component={CountryView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
