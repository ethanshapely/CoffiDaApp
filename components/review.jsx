import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Review extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: "",
            photoPath: ""
        };
    }

    /*getReview(locationID, reviewID){
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locationID+"/review/"+reviewID, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                await AsyncStorage.setItem('@user_id', "")
                await AsyncStorage.setItem('@user_token', "")
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to logout"
            }else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }*/

    getReviewPhoto(locationID, reviewID){
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locationID+"/review/"+reviewID, {
            method: 'get'
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 404){
                throw "No image found"
            }else{
                throw "Server side error"
            }
        })
        .then((respJson) => {
            this.setState({
                photoPath: respJson.photo_path
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return(
            <View>

            </View>
        );
    }
}
export default Review;