import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      contact: "",
    };
  }

  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("User Created");
        db.collection("users").doc(this.state.email).set({
          email: this.state.email,
          firstName: this.state.firstName,
          lastname: this.state.lastName,
          contact: this.state.contact,
        });

        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#021C42" }}>
        <ScrollView contentContainerStyle={{flex:1}}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: "75%",
            height: 250,
            alignSelf: "center",
            marginTop: "10%", 
            resizeMode: "contain",
          }}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <Text style={{ fontSize: 30, marginLeft: "5%", marginTop: 20 }}>
            Sign Up
          </Text>

          <TextInput
            placeholder="First Name"
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Last Name"
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
            style={styles.textInput}
          />

          <TextInput
            placeholder="example@gmail.com"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            style={styles.textInput}
          />

          <TextInput
            placeholder="123-456-7890"
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
            style={styles.textInput}
            maxLength={13}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            style={styles.textInput}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
            style={styles.textInput}
          />

          <TouchableOpacity
            style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "#0A2463",
              width: "60%",
              height: 40,
              borderRadius: 20,
              marginTop: 30,
            }}
            onPress={() => {
              if (
                this.state.email &&
                this.state.confirmPassword &&
                this.state.password &&
                this.state.contact &&
                this.state.firstName &&
                this.state.lastName
              ) {
                if (this.state.password === this.state.confirmPassword) {
                  this.signUp();
                } else {
                  alert("Passwords dont match!");
                }
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text
              style={{
                color: "#FCFCFC",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text
            style={{ color: "black", marginVertical: 20, alignSelf: "center" }}
            onPress={() => {
              this.props.navigation.replace("Login");
            }}
          >
            Already Registered?{" "}
            <Text style={{ color: "#0A2483", fontWeight: "bold" }}>Login</Text>
          </Text>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
