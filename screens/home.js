import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class HomeScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "My ETH Wallet"
  };

  render() {
    return (
      <View>
        <Text>Hello Home</Text>
        <Button title="Accounts" onPress={() => this.goToAccounts()} />
      </View>
    );
  }

  goToAccounts() {
    this.props.navigation.navigate("Accounts");
  }
}

export default HomeScreen;
