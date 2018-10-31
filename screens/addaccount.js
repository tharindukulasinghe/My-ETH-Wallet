import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { AsyncStorage } from "react-native";

class AddAccountScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "Add a Account"
  };

  saveAddress = async (title, address) => {
    try {
      var add = await AsyncStorage.getItem("addressesList");
      if (add) {
        var addresses = JSON.parse(add);
        addresses.push({
          title: title,
          address: address,
          key: "" + Date.now()
        });
        await AsyncStorage.setItem("addressesList", JSON.stringify(addresses));
      } else {
        var addresses = [];
        addresses.push({
          title: title,
          address: address,
          key: "" + Date.now()
        });
        await AsyncStorage.setItem("addressesList", JSON.stringify(addresses));
      }
      alert("Successfully saved.");
      this.props.navigation.navigate("Accounts");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Account Title</Text>
        <TextInput
          style={styles.welcome}
          placeholder="Main Wallet"
          onChangeText={text => this.setState({ title: text })}
        />
        <Text style={styles.welcome}>Enter ERC-20 Account Number</Text>
        <TextInput
          style={styles.welcome}
          placeholder="0x"
          onChangeText={text => this.setState({ address: text })}
        />
        <Button
          title="Add Account"
          onPress={() => this.saveAddress(this.state.title, this.state.address)}
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
