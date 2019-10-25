import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBack: false,
      currentCard: 0
    };
  }

  flipCard() {
    this.setState({
      showBack: !this.state.showBack
    });
  }

  nextCard() {
    let currentCard = this.state.currentCard;
    this.setState({ currentCard: currentCard + 1, showBack: false });
  }

  correctButtonPressed() {
    this.nextCard();
  }

  wrongButtonPressed() {
    this.nextCard();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <View
            style={[
              styles.CardStyle,
              {
                backgroundColor: this.state.showBack ? "#ffc503" : "black",
                height: this.state.showBack ? "90%" : "92%"
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
                ? this.props.cards[this.state.currentCard].back
                : this.props.cards[this.state.currentCard].front}
            </Text>
          </View>
        </TouchableOpacity>

        {this.state.showBack && (
          <View style={styles.titleRow}>
            <Button
              title={"Wrong"}
              color="red"
              onPress={() => this.correctButtonPressed()}
            ></Button>

            <Button
              title={"Correct"}
              color="green"
              onPress={() => this.wrongButtonPressed()}
            ></Button>
          </View>
        )}
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
