import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header, Icon } from "react-native-elements";

export default class Properties extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      properties: [],
    };
  }

  getData = async () => {
    var response = await db
      .collection("property")
      .where("owner", "==", this.state.email)
      .get();

    this.setState({ properties: [] });

    response.docs.map((ab) => {
      var temp = this.state.properties;
      var z = ab.data();
      z.id = ab.id;
      temp.push(z);
      this.setState({ properties: temp });
    });
  };

  componentDidMount() {
    this.getData();

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    if (this.state.properties.length === 0) {
      return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <ScrollView>
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
                  Properties
                </Text>
              }
              rightComponent={
                <Icon
                  name="add-circle-outline"
                  type="ionicon"
                  color="#004AAD"
                  onPress={() => {
                    this.props.navigation.navigate("AddProperty");
                  }}
                />
              }
            />

            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                color: "#0048A0",
                marginHorizontal: "5%",
                marginTop: "50%",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              All your Properties will appear here!
            </Text>

            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                color: "black",
                marginHorizontal: "5%",
                marginTop: 20,
                fontWeight: "bold",
                fontSize: 14,
              }}
              onPress={() => {
                this.props.navigation.navigate("AddProperty");
              }}
            >
             Don't see any? Add a Property!
            </Text>
          </ScrollView>
        </View>
      );
    } else {
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
                  Properties
                </Text>
              }
              rightComponent={
                <Icon
                  name="add-circle-outline"
                  type="ionicon"
                  color="#004AAD"
                  onPress={() => {
                    this.props.navigation.navigate("AddProperty");
                  }}
                />
              }
            />
          <ScrollView>

            {this.state.properties.map((d) => {
              return (
                <View
                key={d.id}
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    borderRadius: 10,
                    alignSelf: "center",
                    marginTop: 10,
                    borderColor: "#004AAD",
                    borderWidth: 1, 
                    flexDirection: "row", 
                    padding:2,
                  }}
                >
                    <Image
                      style={{
                        width: "50%", 
                        height: "100%",
                        borderRadius: 10,
                      }}
                      source={{ uri: d.image }}
                    />
                  <View style={{ marginLeft: "3%", padding:10 , flex:1}}>
                    <Text style={{fontWeight:'700', fontSize:16}}>{d.address}</Text>
                    <Text style={{color:'grey', fontSize:14}}>{d.city}</Text>
                    <Text  style={{color:'black', fontSize:14}}>{d.state}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#0048A0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        marginTop:10,
                        padding: 10,
                        
                      }}
                      onPress={() => {
                        this.props.navigation.navigate("Tenant", {
                          propertyId: d.id,
                          propertyAddress: d.address,
                          image:d.image,
                          address:d.address
                        });
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "500" }}>
                        View Tenants
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
