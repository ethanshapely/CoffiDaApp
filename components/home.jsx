import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {getUserToken, getUserFavourites, setUserFavourites, setUserReviews} from 'asynchFunctions';

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
        let token = getUserToken();
        if(token != ""){
            this.getAllLocations();
            this.getUserInfo();
            this.setState({
                favourites: getUserFavourites(),
                loading: false
            });
        } else{
            this.setState({
                loading: false
            });
        }
    }

    getAllLocations(){
        let token = getUserToken();

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
                throw "Bad server request"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to logout"
            } else{
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

    getUserInfo(){
        let token = getUserToken();
        let id = getUserId();
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+JSON.parse(id), {
            method: 'get',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to have you're favourites processed"
            } else if(response.status === 404){
                throw "No user found for request"
            } else{
                throw "Server side error"
            }
        })
        .then((respJson) => {
            setUserFavourites(JSON.stringify(respJson.favourite_locations))
            setUserReviews(JSON.stringify(respJson.reviews))
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderLocationList(){
        const nav = this.props.navigation;
        let token = getUserToken();
        if(this.state.loading){
            return(
              <View>
                <Text>Loading...</Text>
              </View>
            );
        } else{
            return(
                <ScrollView>
                    {
                        this.state.locationsList.map((item) => {
                            return(
                                <TouchableOpacity onPress={() => {
                                    if(token != ""){
                                        nav.navigate("Location",{id: item.location_id})
                                    }
                                }}>
                                    <Text>{item.location_name}</Text>
                                    <Image source={require(item.photo_path)} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            );
        }
    }

    render(){
        if(this.state.loading){
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        } else{
            return(
                <View>
                    <Title>CoffiDa</Title>
                    <Text>Welcome to the CoffiDa App, below you will find a collection of assorted Café</Text>
                    {this.renderLocationList()}
                </View>
            );
        }
    }
}

export default Home;