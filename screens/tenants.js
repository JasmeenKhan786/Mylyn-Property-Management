import React from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import db from "../config";
import { Header, Icon } from "react-native-elements";

export default class Tenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: props.route.params.propertyId,
      propertyAddress: props.route.params.propertyAddress,
      address: props.route.params.address,
      image: props.route.params.image,

      tenants: [],
    };
  }

  getData = async () => {
    var response = await db
      .collection("tenants")
      .where("propertyId", "==", this.state.propertyId)
      .get();
    this.setState({ tenants: [] });
    response.docs.map((ab) => {
      var temp = this.state.tenants;
      var z = ab.data();
      z.id = ab.id;
      temp.push(z);
      this.setState({ tenants: temp });
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
    if (this.state.tenants.length === 0) {
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
                  Tenant
                </Text>
              }
              rightComponent={
                <Icon
                  name="add-circle-outline"
                  type="ionicon"
                  color="#004AAD"
                  onPress={() => {
                    this.props.navigation.navigate("AddTenant", {
                      propertyId: this.state.propertyId,
                      propertyAddress: this.state.propertyAddress,
                    });
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
              All your Tenants will appear here!
            </Text>
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                color: "black",
                marginHorizontal: "5%",
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 14,
              }}
              onPress={() => {
                this.props.navigation.navigate("AddTenant", {
                  propertyId: this.state.propertyId,
                  propertyAddress: this.state.propertyAddress,
                });
              }}
            >
              Don't see any? Add a Tenant!
            </Text>
          </ScrollView>
        </View>
      );
    } else {
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
                Tenant
              </Text>
            }
            rightComponent={
              <Icon
                name="add-circle-outline"
                type="ionicon"
                color="#004AAD"
                onPress={() => {
                  this.props.navigation.navigate("AddTenant", {
                    propertyId: this.state.propertyId,
                    propertyAddress: this.state.propertyAddress,
                  });
                }}
              />
            }
          /> 
          <ImageBackground
            source={{ uri: this.state.image }}
            style={{ width: "100%", height: 250, justifyContent:'flex-end' }}
          >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight:'bold',
              marginBottom:10, marginLeft:'5%',
              marginRight:'5%'
            }}
          > 
            {this.state.address}
          </Text>
          </ImageBackground>
          <ScrollView>
            {this.state.tenants.map((d) => {
              return (
                <View
                key={d.id}
                  style={{
                    backgroundColor: "pink",
                    width: "90%",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                >
                  <LinearGradient
                    colors={["#63a4ff", "#476AA6"]}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                      justifyContent: "center",
                      padding: 15,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {d.name}
                    </Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Feather name="phone" size={20} color="white" />
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          {d.contact}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                          marginLeft: 30,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={20}
                          color="white"
                        />
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          {d.tenantEmail}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
