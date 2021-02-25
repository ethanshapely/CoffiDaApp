import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Location extends Component{
    constructor(props){
        super(props)
        this.state = {
            locID: props.id,// Load component with <Location id=(integer)>
            locName: "",
            locTown: "",
            lat: -1.0,
            long: -1.0,
            photoPath: "",
            avgTotalRating: -1,
            avgPriceRating: -1,
            avgQualityRating: -1,
            avgClenlinessRating: -1,
            reviews: null
        }
    }

    componentDidMount(){
        this.getLocationInfo();
    }

    getLocationInfo(){
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID, {
            method: 'get'
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 404){
                throw "Unauthorised: You must be logged in in order to logout"
            }else{
                throw "Server side error"
            }
        })
        .then((respJson) => {
            //let reviewsList = respJson.location_reviews
            this.setState({
                locName: respJson.location_name,
                locTown: respJson.location_town,
                lat: respJson.latitude,
                long: respJson.longtitude,
                photoPath: respJson.photo_path,
                avgTotalRating: respJson.avg_overall_rating,
                avgPriceRating: respJson.avg_price_rating,
                avgQualityRating: respJson.avg_quality_rating,
                avgClenlinessRating: respJson.avg_clenliness_rating,
                reviews: respJson.location_reviews //reviewsList.map(item => {reviewID: item.review_id, overallRating: item.overall_rating, priceRating: item.price_rating, qualityRating: item.quality_rating, reviewBody: item.review_body, likes: item.likes})
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /* 
    .then((respJson) => {
        //let reviewsList = respJson.location_reviews
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
            reviews: respJson.location_reviews //reviewsList.map(item => {reviewID: item.review_id, overallRating: item.overall_rating, priceRating: item.price_rating, qualityRating: item.quality_rating, reviewBody: item.review_body, likes: item.likes})
        })
    })
    .catch()
     */

    /*
    const logCheck = ""
    try{
        logCheck = AsyncStorage.getItem('@user_token');
    }
    catch(error){}

    if(logCheck === ""){
        <View>
    }
    else{
        <View>
    }
    */

    renderReviews(){
        /* 
        <ScrollView>
            {
                this.state.reviews.map((item) => {
                    return (
                        <View>// add id value reference? (e.g. value={item.review_id})
                            <Text> {item.review_body} </Text>
                        </View>
                    );
                })
            }
        </ScrollView>
        */
        return(
            <ScrollView>
                <View></View>
            </ScrollView>
        )
    }

    render(){
        return(
            <View>

            </View>
        );
    }
}
export default Location;