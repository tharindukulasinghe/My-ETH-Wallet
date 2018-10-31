import React, { Component } from "react";
import { View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";

class HomeScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "My ETH Wallet"
  };

  render() {
    return (
      <View style={{ margin: 5 }}>
        <Button title="Accounts" onPress={() => this.goToAccounts()} />
      </View>
    );
  }

  goToAccounts() {
    this.props.navigation.navigate("Accounts");
  }
}

export default HomeScreen;
