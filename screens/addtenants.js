import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header, Icon } from "react-native-elements";

export default class AddTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      propertyId: props.route.params.propertyId,
      propertyAddress: props.route.params.propertyAddress,
      tenantEmail: "",
    };
  }

  addData = () => {
    db.collection("tenants")
      .add({
        name: this.state.name,
        contact: this.state.contact,
        propertyId: this.state.propertyId,
        propertyAddress: this.state.propertyAddress,
        ownerEmail: firebase.auth().currentUser.email,
        tenantEmail: this.state.tenantEmail,
      })
      .then(() => {
        alert("Tenant Added!");
        this.props.navigation.navigate("Tenant");
      })
      .catch(() => {
        alert("something wrong!");
      });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
              Add Property
            </Text>
          }
        />
        <ScrollView>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            height: 40,
            marginTop: 5,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: "rgba(10, 36, 99,0.5)",
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
          placeholder="e.g. Mylyn Zheng"
        />

        <Text style={styles.text}>Contact</Text>

        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            height: 40,
            marginTop: 5,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: "rgba(10, 36, 99,0.5)",
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ contact: text });
          }}
          placeholder="000-000-0000"
        />

        <Text style={styles.text}>Email</Text>

        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            height: 40,
            marginTop: 5,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: "rgba(10, 36, 99,0.5)",
          }}
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ tenantEmail: text });
          }}
          placeholder="example@gmail.com"
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "#0A2463",
            width: "80%",
            height: 40,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() => {
            if (
              this.state.name &&
              this.state.contact &&
              this.state.tenantEmail
            ) {
              this.addData();
            } else {
              alert("Please fill all the details!");
            }
          }}
        >
          <Text style={{ color: "#FCFCFC", fontWeight: "bold", fontSize: 16 }}>
            Add Tenant
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: "5%",
    fontSize: 16,
    color: "#0A2463",
    marginTop: 10,
  },
});
