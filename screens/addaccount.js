import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { AsyncStorage } from "react-native";

class AddAccountScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "Add a Account"
  };

  saveAddress = async address => {
    try {
      await AsyncStorage.setItem("address", address);
      alert("Successfully saved.");
      this.props.navigation.navigate("Accounts");
    } catch (error) {
      alert("Error");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Enter ERC-20 Account Number</Text>
        <TextInput
          style={styles.welcome}
          placeholder="0x"
          onChangeText={text => this.setState({ address: text })}
        />
        <Button
          title="Add Account"
          onPress={() => this.saveAddress(this.state.address)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    marginTop: 25,
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default AddAccountScreen;
