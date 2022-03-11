import React from "react";
import {
  View,
  ImageBackground,
} from "react-native";
import { Header, Icon } from "react-native-elements";

export default class Payments extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Payments",
            style: { color: "#004AAD", fontWeight: "bold", fontSize: 20 },
          }}
          leftComponent={
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color="#004AAD"
              onPress={() => {
                this.props.navigation.goBack(); 
              }}
            />
          }
        />
        <ImageBackground
          source={require("../assets/Payments-screen.png")}
          style={{ width: "100%", height: "100%" }}
        ></ImageBackground>
      </View>
    );
  }
}
