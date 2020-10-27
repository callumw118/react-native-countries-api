import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Americas")

  function fetchCountries() {
    fetch(`https://restcountries.eu/rest/v2/region/${selectedRegion}?fields=name`)
      .then(res => res.json())
      .then(data => setCountries(data))
  }

  function handleCountryClick(country) {
    Alert.alert(country.name)
  }

  // Empty array here is to stop this from running when the countries data updates
  // Can pass a value into the array which will trigger useEffect again when
  // that state is updated
  useEffect(() => {
    fetchCountries();
  }, [selectedRegion])

  return (
    <>
      <Picker style={styles.container}
        selectedValue={selectedRegion}
        onValueChange={(itemValue, itemIndex) => setSelectedRegion(itemValue)}
      >
        <Picker.Item label="Americas" value="Americas" />
        <Picker.Item label="Asia" value="Asia" />
        <Picker.Item label="Europe" value="Europe" />
        <Picker.Item label="Africa" value="Africa" />
      </Picker>
      <FlatList
        data={countries}
        keyExtractor={item => item.name} //key
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => handleCountryClick(item)}
            >
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingTop: 30
  },
  text: {
    fontSize: 20,
    margin: 10
  }
});
