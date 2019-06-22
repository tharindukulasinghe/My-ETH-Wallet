import React, { Component } from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { CardItem, Text, Button, Left, Right } from "native-base";
import { AdMobBanner, AdMobRewarded } from "react-native-admob";

class HomeScreen extends Component {
  state = {};

  static navigationOptions = {
    title: "My ETH Wallet"
  };

  componentDidMount() {
    //AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID("ca-app-pub-5256999799292373/3586322807");

    AdMobRewarded.addEventListener("rewarded", reward =>
      console.log("AdMobRewarded => rewarded", reward)
    );
    AdMobRewarded.addEventListener("adLoaded", () =>
      console.log("AdMobRewarded => adLoaded")
    );
    AdMobRewarded.addEventListener("adFailedToLoad", error =>
      console.warn(error)
    );
    AdMobRewarded.addEventListener("adOpened", () =>
      console.log("AdMobRewarded => adOpened")
    );
    AdMobRewarded.addEventListener("videoStarted", () =>
      console.log("AdMobRewarded => videoStarted")
    );
    AdMobRewarded.addEventListener("adClosed", () => {
      console.log("AdMobRewarded => adClosed");
      AdMobRewarded.requestAd().catch(error => console.warn(error));
    });
    AdMobRewarded.addEventListener("adLeftApplication", () =>
      console.log("AdMobRewarded => adLeftApplication")
    );

    AdMobRewarded.requestAd().catch(error => console.warn(error));
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            margin: 10,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "stretch"
          }}
        >
          <StatusBar backgroundColor="#004D40" />
          <TouchableOpacity onPress={() => this.goToAccounts()}>
            <CardItem style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Left />
              <Button
                style={{ margin: 30 }}
                transparent
                large
                onPress={() => this.goToAccounts()}
              >
                <Text> My Wallets </Text>
              </Button>
              <Right />
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goToTopTokens()}>
            <CardItem style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Left />
              <Button
                style={{ margin: 30 }}
                transparent
                large
                success
                onPress={() => this.goToTopTokens()}
              >
                <Text> Top Tokens </Text>
              </Button>
              <Right />
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showRewarded()}>
            <CardItem style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Left />
              <Button
                style={{ margin: 30 }}
                transparent
                large
                info
                onPress={() => this.showRewarded()}
              >
                <Text> Coin Faucet </Text>
              </Button>
              <Right />
            </CardItem>
          </TouchableOpacity>
        </View>

        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID="ca-app-pub-5256999799292373/1601022408"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => alert(error)}
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

  showVideoAd() {
    AdMobRewarded.requestAd().then(AdMobRewarded.showAd());
    //alert("No coin faucets available!");
  }

  showRewarded() {
    AdMobRewarded.showAd()
      .catch(error => console.warn(error))
      .then(() => {
        AdMobRewarded.requestAd().catch(error => console.warn(error));
        this.props.navigation.navigate("CoinFaucet");
      });
  }
}

export default HomeScreen;

/* <CardItem>
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
</CardItem> */
