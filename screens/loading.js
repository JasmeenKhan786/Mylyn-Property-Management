import React from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import firebase from "firebase";

export default class Loading extends React.Component {
 
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        this.props.navigation.replace('Home')
        } else {
            this.props.navigation.replace('Login')

        }
      });
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={"large"} color="#0A2463"/>
      </View>
    );
  }
}
