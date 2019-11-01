import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default class Card extends React.Component {
  state = {
    showBack: false,
    currentCard: 0,
    correctCards: [],
    wrongCards: [],
    currentDeck: [],
    startTime: 0,
    endTime: 0
  };

  componentWillMount() {
    cardsWithTimes = [];
    this.props.cards.map(card => {
      let cardWithTime = { front: card.front, back: card.back, time: 0 };
      cardsWithTimes.push(cardWithTime);
    });
    this.setState({
      currentDeck: cardsWithTimes
    });
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  flipCard = () => {
    this.setState({
      showBack: !this.state.showBack,
      endTime: new Date()
    });
  };

  deleteCard = () => {
    let filteredArray = this.state.currentDeck.filter(
      item => item !== this.state.currentDeck[this.state.currentCard]
    );
    this.setState({ currentDeck: filteredArray });
    this.props.updateDeck(filteredArray);
  };

  nextCard = () => {
    let currentCard = this.state.currentCard;
    if (currentCard >= this.state.currentDeck.length - 1) {
      let newDeck = this.state.wrongCards.concat(this.state.correctCards);
      this.resetState(newDeck);
    } else {
      this.setState({
        currentCard: currentCard + 1,
        showBack: false,
        startTime: new Date()
      });
    }
  };

  correctButtonPressed = () => {
    correctCards = this.state.correctCards;
    this.buttonHandling(correctCards);
  };

  wrongButtonPressed = () => {
    wrongCards = this.state.wrongCards;
    this.buttonHandling(wrongCards);
  };

  buttonHandling(cardType) {
    let timeInSec = (this.state.endTime - this.state.startTime) / 1000;
    let currentCard = this.state.currentDeck[this.state.currentCard];
    currentCard.time = timeInSec;
    cardType.push(currentCard);
    cardType.sort((a, b) => b.time - a.time);
    this.setState({ cardType: cardType });
    this.nextCard();
  }

  resetPressed = () => {
    remainingCards = this.state.currentDeck.slice(this.state.currentCard);
    let newDeck = this.state.wrongCards
      .concat(remainingCards)
      .concat(this.state.correctCards);
    this.resetState(newDeck);
  };

  resetState(newDeck) {
    this.setState({
      currentDeck: newDeck,
      currentCard: 0,
      showBack: false,
      correctCards: [],
      wrongCards: []
    });
  }

  showControllButtons() {
    return (
      <View style={styles.titleRow}>
        <Button
          title={"Wrong"}
          color="red"
          onPress={this.wrongButtonPressed}
        ></Button>

        <Button
          title={"Correct"}
          color="green"
          onPress={this.correctButtonPressed}
        ></Button>
      </View>
    );
  }

  render() {
    return (
      <View>
        <ButtonsList
          resetCard={this.resetPressed}
          deleteCard={this.deleteCard}
          backPressed={this.props.backBtnPressed}
        />
        {this.state.currentDeck.length > 0 && (
          <View>
            <TouchableOpacity onPress={this.flipCard}>
              <View
                style={[
                  styles.CardStyle,
                  {
                    backgroundColor: this.state.showBack ? "#ffc503" : "black",
                    height: this.state.showBack ? "90%" : "92.5%"
                  }
                ]}
              >
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    color: this.state.showBack ? "black" : "white"
                  }}
                >
                  <Text style={{ fontSize: 200, textAlign: "center" }}>
                    {this.state.showBack ? "!" : "?"}
                    {"\n"}
                  </Text>
                  {this.state.showBack
                    ? this.state.currentDeck[this.state.currentCard].back
                    : this.state.currentDeck[this.state.currentCard].front}
                </Text>
              </View>
            </TouchableOpacity>
            {this.state.showBack && this.showControllButtons()}
          </View>
        )}
        {this.state.currentDeck.length === 0 && <EmptyView />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleRow: {
    height: "5%",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#ffb026"
  },
  CardStyle: {
    width: 330,
    height: "90%",
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

const ButtonsList = props => (
  <View style={styles.titleRow}>
    <Button
      title={"Back"}
      color={"#5c4a08"}
      onPress={props.backPressed}
    ></Button>
    <Button
      title={"Reset"}
      color={"#5c4a08"}
      onPress={props.resetCard}
    ></Button>
    <Button
      title={"Delete card"}
      color={"#5c4a08"}
      onPress={props.deleteCard}
    ></Button>
  </View>
);

const EmptyView = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    }}
  >
    <Text>Deck is empty</Text>
  </View>
);
