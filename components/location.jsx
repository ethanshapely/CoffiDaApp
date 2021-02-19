import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Location extends Component{
    constructor(props){
        super(props)
        this.state = {
            jsonData: ""
        }
    }

    getLocationInfo(){
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locationID, {
            method: 'get'
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    jsonData: response.json()
                })
            }else if(response.status === 404){
                throw "Unauthorised: You must be logged in in order to logout"
            }else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /* 
    .then((respJson) => {
        const reviewList = {}
        const 
        this.setState({
            locID: respJson.location_id
            locName: respJson.location_name
            locTown: respJson.location_town
            lat: respJson.latitude
            long: respJson.longtitude
            photoPath: respJson.photo_path
            avgTotalRating: respJson.avg_overall_rating
            avgPriceRating: respJson.avg_price_rating
            avgQualityRating: respJson.avg_quality_rating
            avgClenlinessRating: respJson.avg_clenliness_rating
        })
    })
     */

    /*
    const logCheck = ""
    try{
        logCheck = await AsyncStorage.getItem('@user_token');
    }
    catch(error){}

    if(logCheck === ""){
        <View>
    }
    else{
        <View>
    }
    */

    render(){
        return(
            <View>

            </View>
        );
    }
}
export default Location;