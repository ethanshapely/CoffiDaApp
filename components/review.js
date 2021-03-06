import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Button, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import asyncHelp from './asynchFunctions';

class Review extends Component{

    constructor(props){
        super(props);

        this.state = {
            locID: props.locID,
            revID: props.data.review_id,
            overallRating: props.data.overall_rating,
            priceRating: props.data.price_rating,
            qualityRating: props.data.quality_rating,
            clenlinessRating: props.data.clenliness_rating,
            reviewBody: props.data.review_body,
            likes: props.data.likes,
            photoPath: "",
            // userOwned: false,
            liked: false
        };
    }

    componentDidMount(){
        this.getReviewPhoto()
    }

    getReviewPhoto(){
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.revID+"/photo", {
            method: 'get'
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 404){
                console.log("No image found");
            } else{
                console.log("Server side error");
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

    //

    // addPhoto(){
    //     let token = asyncHelp.getUserToken();

    //     return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.revID+"/photo", {
    //         method: 'post',
    //         headers: {
    //             'X-Authorisation': token//,
    //             //'Content-Type': 'image/png','image/jpeg'
    //         },
    //         body: ""//Get image
    //     })
    //     .then((response) => {
    //         if(response.status === 200){
    //             console.log("Photo added")
    //         } else if(response.status === 400){
    //             console.log("Bad request sent");
    //         } else if(response.status === 401){
    //             console.log("Unauthorised: You must be logged in in order to add a photo to a review");
    //         } else if(response.status === 404){
    //             console.log("No review found for request");
    //         } else{
    //             console.log("Server side error");
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    // deletePhoto(){
    //     let token = asyncHelp.getUserToken();

    //     return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.revID+"/photo", {
    //         method: 'delete',
    //         headers: {
    //             'X-Authorisation': token
    //         }
    //     })
    //     .then((response) => {
    //         if(response.status === 200){
    //             console.log("Photo deleted")
    //         } else if(response.status === 400){
    //             console.log( "Bad request sent");
    //         } else if(response.status === 401){
    //             console.log("Unauthorised: You must be logged in in order to delete a review");
    //         } else if(response.status === 403){
    //             console.log("Forbidden: You cannot delete a review that doesn't exist");
    //         } else if(response.status === 404){
    //             console.log("No review found for request");
    //         } else{
    //             console.log("Server side error");
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    likeReview(){
        let token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.revID+"/like", {
            method: 'post',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                console.log("Like added")
            } else if(response.status === 400){
                console.log("Bad request sent");
            } else if(response.status === 401){
                console.log("Unauthorised: You must be logged in in order to like a review");
            } else if(response.status === 403){
                console.log("Forbidden: You cannot like a review that doesn't exist");
            } else if(response.status === 404){
                console.log("No review found for request");
            } else{
                console.log("Server side error");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    unlikeReview(){
        let token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.revID+"/like", {
            method: 'delete',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                console.log("Like removed")
            } else if(response.status === 400){
                console.log("Bad request sent");
            } else if(response.status === 401){
                console.log("Unauthorised: You must be logged in in order to unlike a review");
            } else if(response.status === 403){
                console.log("Forbidden: You cannot unlike a review that doesn't exist");
            } else if(response.status === 404){
                console.log("No review found for request");
            } else{
                console.log("Server side error");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleLike(){
        if(this.state.liked){
            this.likeReview();
            this.setState({
                liked: true
            });
        } else{
            this.unlikeReview();
            this.setState({
                liked: false
            });
        }
    }

    handleLikeText(){
        if(this.state.liked){
            return "Unlike"
        } else{
            return "Like"
        }
    }

    render(){
        return(
            <View>
                <h3>{this.state.name}</h3>
                <Text>{this.state.reviewBody}</Text>
                <Image url={this.state.photoPath} />
                <View>
                    <Text>Likes: {this.state.likes}</Text>
                    <Button title={this.handleLikeText()} onPress={this.handleLike()} />
                </View>
            </View>
        );
    }
}
export default Review;