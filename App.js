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

    if(token === ""){
      return(
        <NavigationContainer>
          <stackNav.Navigator initialRouteName="Home">
            <stackNav.Screen name="Home" component={Home} 
              options={{
                headerTitle: "Home", 
                headerRight: () => (
                  <View>
                    <Button title="Login" onPress={() => nav.navigate("Login")} />
                    <Button title="SignUp" onPress={() => nav.navigate("SignUp")} />
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
                  <Button title="Logout" onPress={() => nav.navigate("Logout")} />
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
