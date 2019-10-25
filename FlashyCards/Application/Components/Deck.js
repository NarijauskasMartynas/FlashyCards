import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

const Deck = props => {
  return (
    <View style={styles.deckStyle}>
      <Text>{props.deck.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deckStyle: {
    backgroundColor: "#fcba03",
    width: "50%",
    height: 200,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Deck;
