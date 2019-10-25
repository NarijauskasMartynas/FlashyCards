import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Constants from "expo-constants";
import decks from "./Application/Store/flashcards";
import Deck from "./Application/Components/Deck";
import Card from "./Application/Components/Card";
import Form from "./Application/Components/Form";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCards: false,
      selectedDeck: "",
      addingNewForm: false,
      decks: decks
    };
  }

  changeState(cards) {
    this.setState({ showCards: true, selectedDeck: cards });
  }

  goToDecks() {
    this.setState({ showCards: false });
  }

  addNewDeck(deck) {
    let newDecks = this.state.decks;
    newDecks.push(deck);
    this.setState({
      decks: newDecks,
      addingNewForm: false
    });
  }

  openForm() {
    this.setState({
      addingNewForm: !this.state.addingNewForm
    });
  }

  render() {
    if (!this.state.showCards) {
      return (
        <View style={styles.container}>
          <Button
            color="#b38914"
            title="Add new deck"
            onPress={() => this.openForm()}
          ></Button>
          {this.state.addingNewForm && (
            <Form addDeck={deck => this.addNewDeck(deck)}></Form>
          )}
          <ScrollView
            contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
            style={styles.scrollView}
          >
            {this.state.decks.map(deck => (
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
          <View style={styles.cardRow}>
            <Card
              cards={this.state.selectedDeck}
              backBtnPressed={() => this.goToDecks()}
            ></Card>
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
    justifyContent: "flex-start",
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
