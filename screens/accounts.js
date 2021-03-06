import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { AsyncStorage } from "react-native";
import { Card, CardItem, Text } from "native-base";

class AccountScreen extends Component {
  state = {
    title: "",
    addresses: []
  };

  componentDidMount() {}

  addressSubscription = this.props.navigation.addListener(
    "willFocus",
    payload => {
      this.getAddresses();
    }
  );

  getAddresses = async () => {
    try {
      const value = await AsyncStorage.getItem("addressesList");
      if (value !== null) {
        this.setState({ addresses: JSON.parse(value) });
        //alert(value);
      }
    } catch (error) {
      alert("Error");
    }
  };

  goToAddAccount() {
    this.props.navigation.navigate("AddAccount");
  }

  goToAccountInfo(address) {
    this.props.navigation.navigate("AccountInfo", {
      item: address
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Wallets",
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={() => navigation.navigate("AddAccount")}
            title="Add Wallet"
          />
        </View>
      )
    };
  };

  render() {
    if (this.state.addresses.length == 0 || !this.state.addresses) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <StatusBar backgroundColor="#004D40" />
          <Text> Add a ERC-20 Wallet to Get started.</Text>
        </View>
      );
    }
    return (
      <View>
        <StatusBar backgroundColor="#004D40" />
        <FlatList
          style={{ margin: 3 }}
          data={this.state.addresses}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.goToAccountInfo(item.address)}
              >
                <Card>
                  <CardItem header bordered>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.title}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{ fontSize: 16 }}>{item.address}</Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default AccountScreen;
