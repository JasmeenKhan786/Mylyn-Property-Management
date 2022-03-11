import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView, 
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Header, Icon } from "react-native-elements";

//firebase.auth().currentUser.email

export default class AddProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      address: "",
      city: "",
      state: "",
      uploading: "none",
      image: "",
      zip: "",
    };
  }

  addData = () => {
    db.collection("property").add({
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      image: this.state.image,
      zip: this.state.zip,
      owner: this.state.email,
    });
    alert("property added succesfully");
    this.props.navigation.navigate("Properties");
  };

  selectImage = async (path) => {
    this.setState({ uploading: true });
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {
    var response = await fetch(uri);
    //binary large objects
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + this.state.name + this.state.email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + this.state.name + this.state.email);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url, uploading: false });
      })
      .catch((error) => {
        this.setState({ image: "#", uploading: "none" });
      });
  };
 
  render() {
    var icon;
    if (this.state.uploading === "none") {
      icon = <Entypo name="upload" size={24} color="#0A2463" />;
    } else if (this.state.uploading) {
      icon = <ActivityIndicator size={"small"} color="#0A2463" />;
    } else {
      icon = <Feather name="check-circle" size={24} color="#0A2463" />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
        <Text style={styles.text}>Address</Text>

        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            height: 40,
            marginTop: 5,
            borderRadius:10,
            paddingLeft:10,
            backgroundColor:'rgba(10, 36, 99,0.5)'
          }} 
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
          placeholder="e.g. 25, Beach House, Carter Road"
        />

        <Text style={styles.text}>City</Text>

        <TextInput
         style={{
          width: "90%",
          alignSelf: "center",
          height: 40,
          marginTop: 5,
          borderRadius:10,
          paddingLeft:10,
          backgroundColor:'rgba(10, 36, 99,0.5)'
        }} 
        placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ city: text });
          }}
          placeholder="e.g. San Diego"
        />

        <Text style={styles.text}>State</Text>

        <TextInput
         style={{
          width: "90%",
          alignSelf: "center",
          height: 40,
          marginTop: 5,
          borderRadius:10,
          paddingLeft:10,
          backgroundColor:'rgba(10, 36, 99,0.5)'
        }} 
        placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ state: text });
          }}
          placeholder="e.g. California"
        />

        <Text style={styles.text}>Zip Code</Text>

        <TextInput
          style={{
            width: "90%",
            alignSelf: "center",
            height: 40,
            marginTop: 5,
            borderRadius:10,
            paddingLeft:10,
            backgroundColor:'rgba(10, 36, 99,0.5)'
          }} 
          placeholderTextColor="white"
          onChangeText={(text) => {
            this.setState({ zip: text });
          }}
          placeholder="e.g. 599120"
        />

        <View style={{ flexDirection: "row", alignSelf:'center', marginTop:30 }}>
          <Text style={{color:'#0A2463', fontSize:15}}>Upload Property Image</Text>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.selectImage("contracts/");
            }}
          >
            {icon}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent:'center',
            alignSelf: "center",
            backgroundColor: "#0A2463",
            width: "80%", 
            height: 40,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() => {
            if(this.state.address && this.state.city && this.state.state && this.state.image && this.state.zip){
              this.addData();

            }
            else{
              alert('Please fill all the details!')
            }
          }}
        >
          <Text style={{ color: "#FCFCFC", fontWeight:'bold' , fontSize:16}}>
            Add Property
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
    color:'#0A2463',
    marginTop:10
  },
});
