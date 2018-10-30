import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";

class AccountScreen extends Component {
  state = {
    title: "",
    address: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => this.setState({ title: json.title }));
    //this.getAddresses();
  }

  addressSubscription = this.props.navigation.addListener(
    "willFocus",
    payload => {
      console.debug("didBlur", payload);
      this.getAddresses();
    }
  );
  getAddresses = async () => {
    try {
      const value = await AsyncStorage.getItem("address");
      if (value !== null) {
        this.setState({ address: value });
        //alert(value);
      }
    } catch (error) {
      alert("Error");
    }
  };

  goToAddAccount() {
    this.props.navigation.navigate("AddAccount");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Your Accounts",
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={() => navigation.navigate("AddAccount")}
            title="Add"
          />
        </View>
      )
    };
  };

  render() {
    return (
      <View>
        <Text>{this.state.title}</Text>
        <Text>{this.state.address}</Text>
      </View>
    );
  }
}

export default AccountScreen;
