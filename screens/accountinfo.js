import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Card, CardItem, Body, Text, Right } from "native-base";

class AccountInfoScreen extends Component {
  state = {
    item: {
      title: "",
      addInfo: ""
    }
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Wallet Info"
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    const address = navigation.getParam("item");
    this.setState({ address: address });
    //alert(address);

    fetch(`http://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`)
      .then(response => response.json())
      .then(json => {
        this.setState({ addInfo: json, isLoading: false });
      })
      .catch(err => alert("Error : " + err));
  }

  getETHbalance() {
    //const balance = JSON.parse(this.state.addInfo).ETH.balance;
    var balance = this.state.addInfo.ETH.balance;
    return balance;
  }

  getTokens() {
    var tokens = this.state.addInfo.tokens;
    return tokens;
  }

  format(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={{ margin: 3 }}>
        <Card>
          <CardItem header bordered>
            <Text style={{ fontSize: 18 }}>ETH Balance</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 18 }}>
                {this.getETHbalance() + " ETH"}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text style={{ fontSize: 18 }}>Token Balance</Text>
          </CardItem>
          {this.getTokens().map(token => {
            return (
              <CardItem bordered key={token.tokenInfo.address}>
                <Text style={{ fontSize: 18 }}>{token.tokenInfo.name}</Text>
                <Right>
                  <Text style={{ fontSize: 18 }}>
                    {this.format(
                      token.balance.toPrecision() /
                        Math.pow(10, parseInt(token.tokenInfo.decimals))
                    ) +
                      " " +
                      token.tokenInfo.symbol}
                  </Text>
                </Right>
              </CardItem>
            );
          })}
        </Card>
      </ScrollView>
    );
  }
}

export default AccountInfoScreen;
