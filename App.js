import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Statusbar
} from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/home";
import AccountScreen from "./screens/accounts";
import AddAccountScreen from "./screens/addaccount";
import AccountInfoScreen from "./screens/accountinfo";
import TopTokenScreen from "./screens/toptokens";

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Accounts: {
      screen: AccountScreen
    },
    AddAccount: {
      screen: AddAccountScreen
    },
    AccountInfo: {
      screen: AccountInfoScreen
    },
    TopTokens: {
      screen: TopTokenScreen
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#00695C"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
