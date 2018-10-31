import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";

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

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Wallets",
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={() => navigation.navigate("AddAccount")}
            title="Add
             Wallet"
          />
        </View>
      )
    };
  };

  render() {
    return (
      <View>
        <FlatList
          style={{ margin: 3 }}
          data={this.state.addresses}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => alert(item.title)}>
                <Card>
                  <CardItem>
                    <Body>
                      <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: 18 }}>{item.address}</Text>
                    </Body>
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
