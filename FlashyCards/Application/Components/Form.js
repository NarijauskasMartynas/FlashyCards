import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      question: "",
      answer: ""
    };
  }

  onChangeText(text) {
    this.setState({
      deckName: text
    });
  }

  onQuestionChange(text) {
    this.setState({
      question: text
    });
  }

  onAnswerChange(text) {
    this.setState({
      answer: text
    });
  }

  rename() {
    this.props.renameDeck(this.state.deckName);
  }

  addNewCard() {
    let newCard = { front: this.state.question, back: this.state.answer };
    this.props.addCard(newCard);
  }

  addNewDeck() {
    let deckObj = { name: this.state.deckName, cards: [] };
    this.props.addDeck(deckObj);
  }

  render() {
    return (
      <View style={styles.deckStyle}>
        {this.props.function !== "addCard" && (
          <View>
            <Text>Enter deck name</Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "#705d27",
                borderWidth: 1
              }}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.deckName}
            />
            {this.props.function === "add" && (
              <Button
                color="black"
                title="Add new deck!"
                onPress={() => this.addNewDeck()}
              ></Button>
            )}
            {this.props.function === "rename" && (
              <Button
                color="black"
                title="rename this deck!"
                onPress={() => this.rename()}
              ></Button>
            )}
          </View>
        )}
        {this.props.function === "addCard" && (
          <View>
            <Text>Enter question</Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "#705d27",
                borderWidth: 1
              }}
              onChangeText={text => this.onQuestionChange(text)}
              value={this.state.question}
            />
            <Text>Enter answer</Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "#705d27",
                borderWidth: 1
              }}
              onChangeText={text => this.onAnswerChange(text)}
              value={this.state.answer}
            />
            <Button
              color="black"
              title="Add card!"
              onPress={() => this.addNewCard()}
            ></Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckStyle: {
    backgroundColor: "#fcba03",
    width: "100%",
    height: 200,
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
