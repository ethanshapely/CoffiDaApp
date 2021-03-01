import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {getUserToken, getUserId} from 'asynchFunctions';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            token: null,
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            favLocations: {},
            reviews: {},
            likedReviews: {}
        };
    }

    componentDidMount(){
        let tokenVal = getUserToken();
        let idVal = getUserId();
        this.setState({
            token: tokenVal,
            id: idVal
        });
    }

    getUserInfo(){
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+this.state.id, {
            method: 'get',
            headers: {
                'X-Authorisation': this.state.token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in to view your profile"
            }else if(response.status === 404){
                throw "User not found"
            }else{
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
            })
        })
    }

    updateUser(){
        let sendData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        const token = AsyncStorage.getItem('@user_token');
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+this.state.userID, {
            method: 'patch',
            headers: {
                'X-Authorisation': token
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in as a registered user to obtain user details"
            }else if(response.status === 404){
                throw "User not found"
            }else{
                throw "Server side error"
            }
        })
    }

    render(){
        return(
            <View></View>
        );
    }
}

export default Profile;