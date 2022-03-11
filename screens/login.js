import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        this.props.navigation.replace('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#021C42' }}>
        <ScrollView>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: '75%',
              height: 250,
              alignSelf: 'center',
              marginTop: '10%',
              resizeMode: 'contain',
            }}
          />

          <View
            style={{ 
              width: '80%',
              backgroundColor: '#FCFCFC',
              alignSelf: 'center',
              padding: 10,
              flex:1,

            }}>
            <Text style={{ fontSize: 30, marginTop: 10,marginLeft:'5%' }}>Login</Text>

            <TextInput
              style={{
                width: '90%',
                height: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf:'center',
                marginTop:20
              }}
              placeholder="Username"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />

            <TextInput
              style={{
                width: '90%',
                height: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf:'center',
                marginTop:10
              }}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (this.state.email.length > 7) {
                  firebase
                    .auth()
                    .sendPasswordResetEmail(this.state.email)
                    .then(() => {
                      alert('Password reset link sent!');
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;

                      alert(errorMessage);
                    });
                } else {
                  alert(
                    'Please enter a valid email to send the password reset link to!'
                  );
                }
              }}>
              <Text
                style={{
                  color: '#0A2463',
                  alignSelf: 'flex-end',
                  marginRight: '5%',
                  marginTop: 20,
                  fontWeight:'bold'
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent:'center',
                backgroundColor: '#0A2463',
                width: '60%',
                height: 40,
                borderRadius: 20,
                marginTop: 30,  
              }}
              onPress={() => {
                if(this.state.email && this.state.password){
                  this.login();

                }
                else{
                  alert('Please fill all the details!')

                }
              }}>
              <Text style={{ color: '#FCFCFC', fontWeight:'bold' }}>
                Login
              </Text>
            </TouchableOpacity>

            <Text
              style={{ color: 'black', marginVertical: 20, alignSelf: 'center' }}
              onPress={() => {
                this.props.navigation.replace('SignUp');
              }}>
              New User? <Text style={{color:'#0A2483', fontWeight:'bold'}}>Register</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
