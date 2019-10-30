import Deck from "./Deck";
import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

export default class DeckList extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        style={styles.scrollView}
      >
        {this.props.decks.map(deck => (
          <View key={deck.name} style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "space-around" }}>
              <Button
                color="green"
                title="add cards"
                onPress={() => this.props.openForm(deck, "addCard")}
              ></Button>
              <Button
                color="purple"
                title="rename"
                onPress={() => this.props.openForm(deck, "rename")}
              ></Button>
            </View>
            <Deck
              deck={deck}
              showCards={() => this.props.changeState(deck)}
            ></Deck>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Button
                color="red"
                title="delete"
                onPress={() => this.props.deleteDeck(deck)}
              ></Button>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20
  },
  cardRow: {
    height: "95%",
    width: "100%",
    backgroundColor: "#ffb026",
    alignItems: "center"
  }
});
