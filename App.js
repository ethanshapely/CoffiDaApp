import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Button, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';
import SignUp from './components/signUp';
import Profile from './components/profile';
import asyncHelp from './components/asynchFunctions';

const stackNav = createStackNavigator();

class CoffiApp extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      sessionToken: false
    };

  }
  
  navLogin(){
    const nav = this.props.navigation;
    nav.navigate("Login");
  }

  navSignUp(){
    const nav = this.props.navigation;
    nav.navigate("SignUp");
  }

  navLogout(){
    const nav = this.props.navigation;
    nav.navigate("Logout");
  }

  navProfile(){
    const nav = this.props.navigation;
    nav.navigate("Profile");
  }

  render(){

    // const stackNav = createStackNavigator();
    const token = asyncHelp.getUserToken();
    const nav = this.props.navigation;

    /*
      if(this.state.loading){
        return(
          <View>
            <Text>Loading...</Text>
          </View>
        );
      } 
    */

    if(token === "" || token === null){
      return(
        <NavigationContainer>
          <stackNav.Navigator initialRouteName="Home">
            <stackNav.Screen name="Home" component={Home} 
              options={{
                headerTitle: "Home", 
                headerRight: () => (
                  <View>
                    <Button title="Login" onPress={this.navLogin()} />
                    <Button title="SignUp" onPress={this.navSignUp()} />
                  </View>
            )}} />
            <stackNav.Screen name="Login" component={Login} />
            <stackNav.Screen name="SignUp" component={SignUp} />
          </stackNav.Navigator>
        </NavigationContainer>
      );
    } else{
      return(
        <NavigationContainer>
          <stackNav.Navigator initialRouteName="Home">
            <stackNav.Screen name="Home" component={Home} 
              options={{
                headerTitle: "Home", 
                headerRight: () => (
                  <View>
                    <Button title="Logout" onPress={this.navLogout()} />
                    <Button title="Profile" onPress={this.navProfile()} />
                  </View>
            )}} />
            <stackNav.Screen name="Profile" component={Profile} />
            <stackNav.Screen name="Logout" component={Logout} />
          </stackNav.Navigator>
        </NavigationContainer>
      );
    }
  }

}


export default CoffiApp;
