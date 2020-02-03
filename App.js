import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import Loading from './src/config/Loader';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import BgImage from './src/assets/images/bg.jpg';
import logo from './src/assets/images/logo.png';
import List from './src/components/List';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { environment } from './src/config/constant';

 class App extends Component {
  
  state = {
    welcomeMessage : "Let's Start",
    email: "jm1@example.com",
    password: "jay@123",
    isLogin: false,
    authToken: null,
    processing: false
  }
  login = async() => {
    this.setState({
      processing: true
    })
    await fetch(environment.API_URL + 'user/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    }).then((response) => {
      
      if (response.status == 200) {
        return response.json();
      } else {
        Alert.alert("Error", "Logged in Failed");
        this.setState({
          processing: false
      })
      }
    }).then((responseData) => {
      
      Alert.alert("Succes", "Logged in!");
        this.setState({
            isLogin: true,
            authToken: responseData.token,
            processing: false
        })
    }).catch((err) => {
      Alert.alert("Error", "Something went wrong");
      this.setState({
        processing: false
      })
    });
  };
  
  logout = () => {
    Alert.alert("Logged out")
    this.setState({
        isLogin: false,
        authToken: null
    })
  };

  deleteCoffeeHandler = key => {
    this.setState(prevState => {
      return { 
        coffees: prevState.coffees.filter((coffee, i) => {
          return coffee.key !== key
        })
      }
    })
  };

  updateValue = (key, value) => {
      this.setState({key: value})
  };

  render() {
    let contentData = '';
    if (!this.state.isLogin) {
      contentData = (
        <View style={styles.mainContainer}>
          <Loading isLoading={this.state.processing} />
          <Image source={logo} style={styles.logo}/>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{this.state.welcomeMessage}</Text>
            <TextInput style={[{marginBottom: 10}, styles.inputs]} placeholder="Username"  value={this.state.email}  onChangeText={(email) => this.setState({ email })} keyboardType="email-address"></TextInput>
            <TextInput secureTextEntry={true} style={[styles.inputs]} placeholder="Password" value={this.state.password}  onChangeText={(password) => this.setState({ password })} keyboardType="default"></TextInput>
            <Button onPress={this.login} color="orange" title="Login"/>
          </View>
        </View>
      );
      return (
        <>
          <StatusBar barStyle="dark-content" />
              <View style={styles.body}>
              <SafeAreaView>
                <ImageBackground source={BgImage} style={{width: '100%', height: '100%'}}>
                  {contentData}
                </ImageBackground>
                </SafeAreaView>
              </View>
        </>
      );
    } else {
      return (
        <>
        <SafeAreaView>
        <ImageBackground source={BgImage} style={{width: '100%', height: '100%'}}>
        <TouchableOpacity>
              {/* <Button color="red" title="Logout" onPress={this.logout}/> */}
              <Icon name="ios-log-out" size={30} color="red" onPress={this.logout}/>
            </TouchableOpacity>
          <List authToken={this.state.authToken}></List>
          </ImageBackground>
          </SafeAreaView>
        </>
      );
    }
    
  }
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    padding: 30
  },
  inputs:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    padding: 10
  },
  logo: {
    margin: 0,
    width: 80,
    height: 70,
    marginLeft: 170,
}
});

export default connect()(App);
