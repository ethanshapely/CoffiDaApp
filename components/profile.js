import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import asyncHelp from './asynchFunctions';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            favLocations: {},
            reviews: {},
            likedReviews: {},
            loading: true
        };
    }

    componentDidMount(){
        this.getUserInfo()
        this.setState({
            loading: false
        });
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
                throw "Unauthorised: You must be logged in to view your profile"
            } else if(response.status === 404){
                throw "User not found"
            } else{
                throw "Server side error"
            }
        })
        .then((respJson) => {
            this.setState({
                firstname: respJson.first_name,
                lastname: respJson.last_name,
                email: respJson.email,
                favLocations: respJson.favourite_locations,
                reviews: respJson.reviews,
                likedReviews: respJson.likes_reviews
            });
            asyncHelp.setUserFavourites(JSON.stringify(respJson.favourite_locations));
        })
    }

    updateUser(){
        this.setState({
            loading: true
        });
        let token = asyncHelp.getUserToken();
        let id = asyncHelp.getUserId();

        let sendData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
            method: 'patch',
            headers: {
                'X-Authorisation': token
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    loading: false
                });
                console.log("User profile updated")
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in to alter your profile"
            } else if(response.status === 403){
                throw "Forbidden: You cannot alter a user's profile other than your own"
            } else if(response.status === 404){
                throw "User not found"
            } else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            this.setState({
                loading: false
            });
            console.log(error);
        })
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
                    <Text>First Name: </Text>
                    <TextInput 
                        onChangeText={(firstname => this.setState({firstname}))}
                        value={this.state.firstname}
                    />
                    <Text>Last Name: </Text>
                    <TextInput 
                        onChangeText={(lastname => this.setState({lastname}))}
                        value={this.state.lastname}
                    />
                    <Text>Email: </Text>
                    <TextInput 
                        autoCompleteType="email"
                        onChangeText={(email => this.setState({email}))}
                        value={this.state.email}
                    />
                    <Text>Password: </Text>
                    <TextInput 
                        secureTextEntry={true}
                        onChangeText={(email => this.setState({email}))}
                        value={this.state.email}
                    />
                </View>
            );
        }
    }
}

export default Profile;