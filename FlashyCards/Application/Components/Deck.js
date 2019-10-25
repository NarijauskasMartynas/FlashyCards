import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Deck extends React.Component {
  deckPressed(cards) {
    this.props.showCards(cards);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.deckPressed(this.props.deck.cards)}>
        <View style={styles.deckStyle}>
          <Text>{this.props.deck.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deckStyle: {
    backgroundColor: "#ffc503",
    width: 150,
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
