import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Card, CardItem, Body, Text, Right } from "native-base";

class TopTokenScreen extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    fetch(`http://api.ethplorer.io/getTop?limit=10&apiKey=freekey&criteria=cap`)
      .then(response => response.json())
      .then(json => {
        this.setState({ tokens: json, isLoading: false });
      })
      .catch(err => alert("Error : " + err));
  }

  getTokens() {
    var tokens = this.state.tokens.tokens;
    return tokens;
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
      <ScrollView>
        <Card>
          <CardItem header bordered>
            <Text style={{ fontSize: 18 }}>Top 10 Tokens</Text>
          </CardItem>
          {this.getTokens().map(token => {
            return (
              <CardItem bordered key={token.address}>
                <Text style={{ fontSize: 18 }}>{token.name}</Text>
                <Right style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, textAlign: "right", marginRight: 3 }}
                  >
                    {token.symbol}
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

export default TopTokenScreen;
