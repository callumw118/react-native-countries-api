import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function CountryView({route}){ // Destructure props again

    const country = route.params.country;

    return (
        <View>
            <Text>{country.name}</Text>
            <Image source={{uri: country.flag}} style={styles.logo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50
    }
})