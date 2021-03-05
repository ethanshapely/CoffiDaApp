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
import Location from './components/location';
import Review from './components/review';
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
                headerTitle: "Home"
              }}/>
            <stackNav.Screen name="Login" component={Login} 
              options={{
                headerTitle: "Login"
            }}/>
            <stackNav.Screen name="SignUp" component={SignUp} 
              options={{
                headerTitle: "SignUp"
            }}/>
          </stackNav.Navigator>
        </NavigationContainer>
      );
    } else{
      return(
        <NavigationContainer>
          <stackNav.Navigator initialRouteName="Home">
            <stackNav.Screen name="Home" component={Home} 
              options={{
                headerTitle: "Home"
              }} />
            <stackNav.Screen name="Profile" component={Profile} 
              options={{
                headerTitle: "Profile"
            }}/>
            <stackNav.Screen name="Logout" component={Logout} 
              options={{
                headerTitle: "Logout"
            }}/>
            <stackNav.Screen name="Location" component={Location} 
              options={{
                headerTitle: "Location"
            }}/>
            <stackNav.Screen name="Review" component={Review} 
              options={{
                headerTitle: "Review"
            }}/>
          </stackNav.Navigator>
        </NavigationContainer>
      );
    }
  }

}


export default CoffiApp;
