import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            locationsList: null
        }
    }

    componentDidMount(){
        this.getAllLocations();
    }

    getAllLocations(){
        const token = AsyncStorage.getItem('@user_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
            method: 'get',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
                throw "Bad server request"
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to logout"
            }else{
                throw "Server side error"
            }
        })
        .then((respJson) => {
            this.setState({
                locationsList: respJson
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderLocationList(){
        const nav = this.props.navigation;
        return(
            <ScrollView>
                {
                    this.state.locationsList.map((item) => {
                        return(
                            <TouchableOpacity onPress={() => nav.navigate("Location",{id: item.location_id})}>
                                <Text>{item.location_name}</Text>
                                <Image source={require(item.photo_path)} />
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        );
    }

    render(){

        const stackNav = createStackNavigator();
        let token = AsyncStorage.getItem('@user_token')

        if(token === ""){
            //
        }
        else{
            //
        }

        /*
        <Location id=1 /> 
        */

        /*
        const nav = this.props.navigation;

        return(
            <stackNav.Navigator>
                <stackNav.Screen name="Home" component={Home} 
                    options={{
                        headerTitle: "Home", 
                        headerRight: () => (
                            <Button title="Logout" onPress{() => nav.navigate("Logout")} />
                        )}} />
                <stackNav.Screen name="Logout" component={Logout} />
                
            </stackNav.Navigator>
        );
        
        or...
        return(
            <stackNav.Navigator>
                <Home />
            </stackNav.Navigator>
        );

        Home render:
        return(
            <stackNav.Screen name="HomeSceen" component={HomeScreen} 
                options={{
                    headerTitle: "Home", 
                    headerRight: () => (
                        <Button title="Logout" onPress{() => nav.navigate("Logout")} />
            )}} />
        );
        */

        /*return(
            <stackNav.Navigator>
                <stackNav.Screen name="Home" component={Home} 
                    options={{
                        headerTitle: "Home", 
                        headerRight: () => (
                            <Button title="Login" onPress{() => nav.navigate("Login")} />
                            <Button title="SignUp" onPress{() => nav.navigate("SignUp")} />
                        )}} />
                <stackNav.Screen name="Login" component={Login} />
                <stackNav.Screen name="SignUp" component={SignUp} />
            </stackNav.Navigator>
        );*/
    }
}

export default Home;