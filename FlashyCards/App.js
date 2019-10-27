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
      cardsArray: "",
      addingNewForm: false,
      decks: decks,
      selectedDeck: "",
      formFunction: ""
    };
  }

  changeState(deck) {
    this.setState({
      showCards: true,
      cardsArray: deck.cards,
      selectedDeck: deck
    });
  }

  goToDecks() {
    this.setState({ showCards: false });
  }

  addNewDeck(deck) {
    this.setState({
      decks: [...this.state.decks, deck],
      addingNewForm: false
    });
  }

  addCard(card) {
    let currentDeck = this.state.selectedDeck;
    let index = this.state.decks.indexOf(currentDeck);
    currentDeck.cards = [...currentDeck.cards, card];
    let decksArray = this.state.decks;
    decksArray[index] = currentDeck;
    this.setState({
      decks: decksArray,
      addingNewForm: false
    });
  }

  updateDeck(cardsArray) {
    let currentDeck = this.state.selectedDeck;
    let index = this.state.decks.indexOf(currentDeck);
    let decksArray = this.state.decks;
    currentDeck.cards = cardsArray;
    decksArray[index] = currentDeck;
    this.setState({
      decks: decksArray
    });
  }

  deleteDeck(deck) {
    let filteredArray = this.state.decks.filter(item => item !== deck);
    this.setState({
      decks: filteredArray
    });
  }

  renameDeck(text) {
    let currentDeck = this.state.selectedDeck;
    let index = this.state.decks.indexOf(currentDeck);
    currentDeck.name = text;
    let decksArray = this.state.decks;
    currentDeck.name = text;
    decksArray[index] = currentDeck;
    this.setState(prevState => ({
      decks: decksArray,
      addingNewForm: false
    }));
  }

  openForm(deck, operation) {
    this.setState({
      formFunction: operation,
      addingNewForm: !this.state.addingNewForm,
      selectedDeck: deck
    });
  }

  render() {
    if (!this.state.showCards) {
      return (
        <View style={styles.container}>
          <Button
            color="#b38914"
            title="Add new deck"
            onPress={() => this.openForm([], "add")}
          ></Button>
          {this.state.addingNewForm && (
            <Form
              addDeck={deck => this.addNewDeck(deck)}
              renameDeck={text => this.renameDeck(text)}
              addCard={card => this.addCard(card)}
              function={this.state.formFunction}
            ></Form>
          )}
          <ScrollView
            contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
            style={styles.scrollView}
          >
            {this.state.decks.map(deck => (
              <View
                key={deck.name}
                style={{
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    color="green"
                    title="add cards"
                    onPress={() => this.openForm(deck, "addCard")}
                  ></Button>
                  <Button
                    color="purple"
                    title="rename"
                    onPress={() => this.openForm(deck, "rename")}
                  ></Button>
                </View>
                <Deck
                  deck={deck}
                  showCards={() => this.changeState(deck)}
                ></Deck>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Button
                    color="red"
                    title="delete"
                    onPress={() => this.deleteDeck(deck)}
                  ></Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cardRow}>
            <Card
              cards={this.state.cardsArray}
              backBtnPressed={() => this.goToDecks()}
              updateDeck={deck => this.updateDeck(deck)}
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
