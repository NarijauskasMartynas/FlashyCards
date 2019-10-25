import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: ""
    };
  }

  addNewDeck() {
    let deckObj = { name: this.state.deckName, cards: [] };
    this.props.addDeck(deckObj);
  }

  onChangeText(text) {
    this.setState({
      deckName: text
    });
  }

  render() {
    return (
      <View style={styles.deckStyle}>
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
          <Button
            color="black"
            title="Add new deck!"
            onPress={() => this.addNewDeck()}
          ></Button>
        </View>
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
