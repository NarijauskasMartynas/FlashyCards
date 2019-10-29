import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Form extends React.Component {
  state = {
    deckName: "",
    question: "",
    answer: ""
  };

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

  rename = () => {
    this.props.renameDeck(this.state.deckName);
  };

  addNewCard = () => {
    let newCard = { front: this.state.question, back: this.state.answer };
    this.props.addCard(newCard);
  };

  addNewDeck = () => {
    let deckObj = { name: this.state.deckName, cards: [] };
    this.props.addDeck(deckObj);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.function !== "addCard" && (
          <DeckEditingComponent
            function={this.props.function}
            deckName={this.state.deckName}
            rename={this.rename}
            onChangeText={text => this.onChangeText(text)}
            addNewDeck={this.addNewDeck}
          />
        )}
        {this.props.function === "addCard" && (
          <AddCardComponent
            question={this.state.question}
            answer={this.state.answer}
            onQuestionChange={text => this.onQuestionChange(text)}
            onAnswerChange={text => this.onAnswerChange(text)}
            addCard={this.addNewCard}
          />
        )}
      </View>
    );
  }
}

const AddCardComponent = props => (
  <View>
    <Text>Enter question</Text>
    <TextInput
      style={styles.inputStyle}
      onChangeText={text => props.onQuestionChange(text)}
      value={props.question}
    />
    <Text>Enter answer</Text>
    <TextInput
      style={styles.inputStyle}
      onChangeText={text => props.onAnswerChange(text)}
      value={props.answer}
    />
    <Button
      color="black"
      title="Add card!"
      onPress={() => props.addCard()}
    ></Button>
  </View>
);

const DeckEditingComponent = props => (
  <View>
    <Text>Enter deck name</Text>
    <TextInput
      style={styles.inputStyle}
      onChangeText={text => props.onChangeText(text)}
      value={props.deckName}
    />
    {props.function === "add" && (
      <Button
        color="black"
        title="Add new deck!"
        onPress={props.addNewDeck}
      ></Button>
    )}
    {props.function === "rename" && (
      <Button
        color="black"
        title="rename this deck!"
        onPress={props.rename}
      ></Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
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
  },
  inputStyle: {
    height: 40,
    width: 200,
    borderColor: "#705d27",
    borderWidth: 1
  }
});
