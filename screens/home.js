import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
        backgroundColor='white'
          leftComponent={
            <Icon
              name="log-out-outline"
              type="ionicon"
              color="#004AAD"
              onPress={() => { 
                

                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    // Sign-out successful.
                    this.props.navigation.replace('Login');
                  })
                  .catch((error) => {
                    // An error happened.
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    alert(errorMessage);
                  });
              }}
            />
          }
          centerComponent={
            <Text style={{color:'#0048A0', fontSize:25, fontWeight:'bold'}}>Home</Text>
          }
        />
        <ScrollView>
        <LinearGradient colors={['#FFFFFF', '#F0EEEA']} style={{ flex: 1 }}>
          <Text style={styles.headerText}>Welcome to a</Text>
          <Text style={styles.headerText}>Property</Text>
          <Text style={styles.headerText}>Managment App</Text>

          <View style={{ flex: 1, marginTop: '10%' }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Property');
              }}>
              <Image
                source={require('../assets/Properties.png')}
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 20,
                  alignSelf: 'center',
                  marginTop: '3%',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Payment');
              }}>
              <Image
                source={require('../assets/Payments.png')}
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 20,
                  alignSelf: 'center',
                  marginTop: '10%',
                }}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: '#004AAD',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
