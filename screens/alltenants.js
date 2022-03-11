import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Header, Icon } from "react-native-elements";

export default class AllTenants extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>all tenants</Text>

        <Header
          backgroundColor="white"
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
          centerComponent={
            <Text 
              style={{ color: "#0048A0", fontSize: 25, fontWeight: "bold" }}
            >
              Add Tenant
            </Text>
          }
        />

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Tenant");
          }}
        >
          Tenants
        </TouchableOpacity>
      </View>
    );
  }
}
