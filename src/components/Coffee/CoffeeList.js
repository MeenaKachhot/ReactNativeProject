import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

const coffeeList = (props) => (
    <TouchableOpacity onPress={props.onDeleteCoffee}>
    <View style={styles.data}>
        <Image source={{uri:"https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471__340.jpg"}} style={styles.image}/>
        <Text style={styles.name}>{props.name}</Text>
    </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    data:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    name:{
        padding: 10,
        color: 'orange'
    },
    image: {
        width: 80,
        height: 70,
    }
  });

export default coffeeList