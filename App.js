import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';
import SignUp from './components/signUp';
import Profile from './components/profile';
import getUserToken from './components/asynchFunctions'

class CoffiApp extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      sessionToken: false
    };

  }
  
  render(){

    const stackNav = createStackNavigator();
    const token = getUserToken();
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
        <stackNav.Navigator>
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
      );
    } else{//add Profile link
      return(
        <stackNav.Navigator>
          <stackNav.Screen name="Home" component={Home} 
            options={{
              headerTitle: "Home", 
              headerRight: () => (
                <Button title="Logout" onPress={() => nav.navigate("Logout")} />
          )}} />
          <stackNav.Screen name="Profile" component={Profile} />
          <stackNav.Screen name="Logout" component={Logout} />
        </stackNav.Navigator>
      );
    }
  }

}


export default CoffiApp;
