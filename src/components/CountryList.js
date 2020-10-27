import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CountryList({navigation}) {

  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Americas")
  const [searchText, setSearchText] = useState("");

  function fetchCountries() {
    fetch(`https://restcountries.eu/rest/v2/region/${selectedRegion}?fields=name`)
      .then(res => res.json())
      .then(data => setCountries(data))
  }

  function handleCountryClick(country) {
    Alert.alert(country.name)
  }

  function handleSearch() {
    if (searchText === "") {
      fetchCountries();
    } else {
      const filteredCountries = countries.filter(country => {
        return country.name.match(searchText)
      })
      setCountries(filteredCountries)
    }
  }

  // Empty array here is to stop this from running when the countries data updates
  // Can pass a value into the array which will trigger useEffect again when
  // that state is updated
  useEffect(() => {
    fetchCountries();
  }, [selectedRegion])

  useEffect(() => {
    handleSearch()
  }, [searchText])

  return (
    <View>
      <Picker style={styles.container}
        selectedValue={selectedRegion}
        onValueChange={(itemValue, itemIndex) => setSelectedRegion(itemValue)}
      >
        <Picker.Item label="Americas" value="Americas" />
        <Picker.Item label="Asia" value="Asia" />
        <Picker.Item label="Europe" value="Europe" />
        <Picker.Item label="Africa" value="Africa" />
      </Picker>

      <TextInput
        style={{ height: 40 }}
        placeholder="Search for a country"
        defaultValue={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <FlatList
        data={countries}
        keyExtractor={item => item.name} //key
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('CountryDetail')}
            >
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      />
    </View>
  )
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