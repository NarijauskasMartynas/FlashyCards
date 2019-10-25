import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Constants from "expo-constants";
import decks from "./Application/Store/flashcards";
import Deck from "./Application/Components/Deck";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.titleRow,
            { fontSize: 30, textAlign: "center", backgroundColor: "#7a5c06" }
          ]}
        >
          Flashy Cards
        </Text>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          style={styles.scrollView}
        >
          {decks.map(deck => (
            <Deck deck={deck}></Deck>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#7a5c06",
    alignItems: "stretch",
    alignContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  titleRow: {
    height: "10%",
    justifyContent: "center"
  },
  scrollView: {
    marginHorizontal: 20
  }
});
