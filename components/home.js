import React, { Component } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, Image } from 'react-native';
import asyncHelp from './asynchFunctions';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            locationsList: null,
            favourites: null,
            loading: true
        };

    }

    componentDidMount(){
        let token = asyncHelp.getUserToken();
        if(token !== "" || token !== null){
            this.getAllLocations();
            this.getUserInfo();
            this.setState({
                favourites: asyncHelp.getUserFavourites(),
                loading: false
            });
        } else{
            this.setState({
                loading: false
            });
        }
    }

    getAllLocations(){
        let token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
            method: 'get',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 400){
                console.log("Bad server request");
            } else if(response.status === 401){
                console.log("Unauthorised: You must be logged in in order to access different locations");
            } else{
                console.log("Server side error");
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

    getUserInfo(){
        let token = asyncHelp.getUserToken();
        let id = asyncHelp.getUserId();
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
            method: 'get',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 401){
                console.log("Unauthorised: You must be logged in in order to have you're favourites processed");
            } else if(response.status === 404){
                console.log("No user found for request");
            } else{
                console.log("Server side error");
            }
        })
        .then((respJson) => {
            asyncHelp.setUserFavourites(JSON.stringify(respJson.favourite_locations))
            asyncHelp.setUserReviews(JSON.stringify(respJson.reviews))
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderLocationList(){
        const nav = this.props.navigation;
        let token = asyncHelp.getUserToken();
        if(this.state.locationsList === null || this.state.locationsList === undefined){
            return(
              <View>
                <Text>No locations found</Text>
              </View>
            );
        } else{
            return(
                <ScrollView>
                    {
                        this.state.locationsList.map((item) => {
                            return(
                                <TouchableOpacity onPress={() => {
                                    if(token !== "" || token !== null){
                                        nav.navigate("Location",{id: item.location_id})
                                    }
                                }}>
                                    <Text>{item.location_name}</Text>
                                    <Image source={item.photo_path} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            );
        }
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
        let token = asyncHelp.getUserToken();
        if(this.state.loading){
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        } else{
            if(token === "" || token === null){
                return(
                    <View>
                        <Text>CoffiDa</Text>
                        <Text>Welcome to the CoffiDa App, below you will find a collection of assorted Cafés</Text>
                        <View>
                            <Button title="Login" onPress={this.navLogin()} />
                            <Button title="SignUp" onPress={this.navSignUp()} />
                        </View>
                    </View>
                );
            } else{
                return(
                    <View>
                        <Text>CoffiDa</Text>
                        <Text>Welcome to the CoffiDa App, below you will find a collection of assorted Cafés</Text>
                        <View>
                            <Button title="Logout" onPress={this.navLogout()} />
                            <Button title="Profile" onPress={this.navProfile()} />
                        </View>
                        {this.renderLocationList()}
                    </View>
                );
            }
        }
    }
}

export default Home;