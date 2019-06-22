import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { CardItem, Text, Button, Left, Right } from "native-base";
import { AdMobBanner } from "react-native-admob";

class HomeScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "My ETH Wallet"
  };

  render() {
    return (
      <View
        style={{
          margin: 5,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <StatusBar backgroundColor="#004D40" />
        <CardItem>
          <Left />
          <Button
            style={{ margin: 10 }}
            success
            large
            bordered
            onPress={() => this.goToAccounts()}
          >
            <Text> My Wallets </Text>
          </Button>
          <Right />
        </CardItem>
        <CardItem>
          <Left />
          <Button
            style={{ margin: 10 }}
            info
            large
            bordered
            onPress={() => this.goToTopTokens()}
          >
            <Text> Top Tokens </Text>
          </Button>
          <Right />
        </CardItem>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }

  bannerError = e => {
    alert(e);
  };

  goToAccounts() {
    this.props.navigation.navigate("Accounts");
  }

  goToTopTokens() {
    this.props.navigation.navigate("TopTokens");
  }
}

export default HomeScreen;
