import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Constants from "expo-constants";
import decks from "./Application/Store/flashcards";
import Deck from "./Application/Components/Deck";
import Card from "./Application/Components/Card";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCards: false,
      selectedDeck: ""
    };
  }

  changeState(cards) {
    this.setState({ showCards: true, selectedDeck: cards });
  }

  goToDecks() {
    this.setState({ showCards: false });
  }

  render() {
    if (!this.state.showCards) {
      return (
        <View style={styles.container}>
          <Button color="#b38914" title="Add new deck"></Button>
          <ScrollView
            contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
            style={styles.scrollView}
          >
            {decks.map(deck => (
              <Deck
                deck={deck}
                key={deck.name}
                showCards={cards => this.changeState(cards)}
              ></Deck>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <Button title={"Reset"} onPress={() => this.goToDecks()}></Button>
            <Button title={"Back"} onPress={() => this.goToDecks()}></Button>
          </View>
          <View style={styles.cardRow}>
            <Card cards={this.state.selectedDeck}></Card>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffb026",
    alignItems: "stretch",
    alignContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  titleRow: {
    height: "5%",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#ffb026"
  },
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
