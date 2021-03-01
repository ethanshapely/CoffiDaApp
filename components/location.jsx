import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import getUserToken from 'asynchFunctions';

class Location extends Component{
    constructor(props){
        super(props);

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
            reviews: null,
            favourited: props.favourited
        };

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

    favouriteLocation(){
        const token = getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/favourite", {
            method: 'post',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return true
            }else if(response.status === 400){
                throw "Bad request sent"
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to favourite a Cafe location"
            }else if(response.status === 404){
                throw "No location found for request"
            }else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    unfavouriteLocation(){
        const token = getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/favourite", {
            method: 'delete',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return true
            }else if(response.status === 400){
                throw "Bad request sent"
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to unfavourite a Cafe location"
            }else if(response.status === 403){
                throw "Forbidden: You cannot unfavourite a location that is not in your favourites"
            }else if(response.status === 404){
                throw "No location found for request"
            }else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    writeReview(){
        let token = getUserToken();
        let sendData={
            overall_rating: -1,
            price_rating: -1,
            quality_rating: -1,
            clenliness_rating: -1,
            review_body: ""
        }

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review", {
            method: 'post',
            headers: {
                'X-Authorisation': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            if(response.status === 201){
                console.log("Review created")
            }else if(response.status === 400){
                throw "Bad request sent"
            }else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to create a review"
            }else if(response.status === 404){
                throw "No location found for request"
            }else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderReviews(){
        if(this.state.reviews != null){
            return(
                <ScrollView>
                    {
                        this.state.reviews.map((item) => {
                            return(
                                <Review locID={this.state.locID} data={item} />
                            );
                        })
                    }
                </ScrollView>
            )
        }else{
            return(
                <View>
                    <Text>No reviews exist for this location yet</Text>
                </View>
            )
        }
    }

    render(){
        return(
            <View>
                
                {renderReviews()}
            </View>
        );
    }
}

export default Location;