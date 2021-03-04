import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import asyncHelp from './asynchFunctions';
import Review from './review';

class Location extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            locID: props.id,// Load component with <Location id=(integer)>
            locName: "",
            locTown: "",
            lat: -1.0,
            long: -1.0,
            photoPath: "",
            avgOverallRating: -1,
            avgPriceRating: -1,
            avgQualityRating: -1,
            avgClenlinessRating: -1,
            reviews: null,
            favourited: props.favourited,
            favButtonColour: "",
            reviewedByUser: false,
            userReviewId: -1,
            userReviewBody: "",
            userOverallRating: 3,
            userPriceRating: 3,
            userQualityRating: 3,
            userClenlinessRating: 3
        };

    }

    componentDidMount(){
        this.getLocationInfo();
        let jsonFavourites = JSON.parse(asyncHelp.getUserFavourites());
        for(item in jsonFavourites){
            if(item.location_id === this.locID){
                this.setState({
                    favourited: true
                });
            }
        }
        if(this.state.favourited){
            this.setState({
                favButtonColour: "#f0f0f0"
            });
        } else{
            this.setState({
                favButtonColour: "#969696"
            });
        }
        let jsonReviews = JSON.parse(asyncHelp.getUserReviews());
        for(item in jsonReviews){
            if(item.location.location_id === this.state.locID){
                this.setState({
                    reviewedByUser: true,
                    userReviewId: item.review.review_id,
                    userReviewBody: item.review.review_body,
                    userOverallRating: item.review.overall_rating,
                    userPriceRating: item.review.price_rating,
                    userQualityRating: item.review.quality_rating,
                    userClenlinessRating: item.review.clenliness_rating
                });
            }
        }
        this.setState({
            loading: false
        });
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
                avgOverallRating: respJson.avg_overall_rating,
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
        const token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/favourite", {
            method: 'post',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return true
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to favourite a Cafe location"
            } else if(response.status === 404){
                throw "No location found for request"
            } else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    unfavouriteLocation(){
        const token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/favourite", {
            method: 'delete',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return true
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to unfavourite a Cafe location"
            } else if(response.status === 403){
                throw "Forbidden: You cannot unfavourite a location that is not in your favourites"
            } else if(response.status === 404){
                throw "No location found for request"
            } else{
                throw "Server side error"
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    writeReview(){
        this.setState({
            loading: true
        });
        let token = asyncHelp.getUserToken();
        let sendData={
            overall_rating: this.state.userOverallRating,
            price_rating: this.state.userPriceRating,
            quality_rating: this.state.userQualityRating,
            clenliness_rating: this.state.userClenlinessRating,
            review_body: this.state.userReviewBody
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
                this.setState({
                    reviewedByUser: true,
                    loading: false
                });
                console.log("Review created")
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to create a review"
            } else if(response.status === 404){
                throw "No location found for request"
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

    updateReview(){
        this.setState({
            loading: true
        });
        let token = asyncHelp.getUserToken();
        let sendData={
            overall_rating: this.state.userOverallRating,
            price_rating: this.state.userPriceRating,
            quality_rating: this.state.userQualityRating,
            clenliness_rating: this.state.userClenlinessRating,
            review_body: this.state.userReviewBody
        }

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.userReviewId, {
            method: 'patch',
            headers: {
                'X-Authorisation': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    loading: false
                });
                console.log("Review updated")
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to edit a review"
            } else if(response.status === 403){
                throw "Forbidden: You cannot update a review that doesn't exist"
            } else if(response.status === 404){
                throw "No review found for request"
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

    deleteReview(){
        this.setState({
            loading: true
        });
        let token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.locID+"/review/"+this.state.userReviewId, {
            method: 'delete',
            headers: {
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    reviewedByUser: false,
                    loading: false
                });
                console.log("Review deleted")
            } else if(response.status === 400){
                throw "Bad request sent"
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to delete a review"
            } else if(response.status === 403){
                throw "Forbidden: You cannot delete a review that doesn't exist"
            } else if(response.status === 404){
                throw "No review found for request"
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

    handleFavourite(){
        this.setState({
            loading: true
        });
        if(this.state.favourited){
            this.unfavouriteLocation();
            this.setState({
                favourited: false,
                favButtonColour: "#f0f0f0",
                loading: false
            });
        } else{
            this.favouriteLocation();
            this.setState({
                favourited: true,
                favButtonColour: "#969696",
                loading: false
            });
        }
    }

    renderReviewWrite(){
        /*
        header: rating selections
        review body

        if review exists: load start data, set button to send update (patch) request
        else: load numbers as 3 and review body as 'Type here...'
              set button to send write (post) request

        state: reviewed: props.reviewed

        componentDidMount:
        if(this.state.reviewed){
            this.setState({
                userReviewBody: user's Review body
                userOverallRating: 
                userPriceRating:

            })
        } else{

        }

        button text = this.state.reviewButtonText
        if reviewed: "Update"
        else: "Submit"

        Delete button:
            set ' this.state.reviewed: ' false in delete request
            set reviewButtonText to "Submit"
        <View>
            <>
        </View>
        
        */
        if(this.state.reviewedByUser){
            return(
                <View>
                    <label for="overallRating">Overall Rating</label>
                    <input type="number" id="overallRating" min={1} max={5} value={this.state.overallRating} />
                    <label for="priceRating">Price Rating</label>
                    <input type="number" id="priceRating" min={1} max={5} value={this.state.priceRating} />
                    <label for="qualityRating">Quality Rating</label>
                    <input type="number" id="qualityRating" min={1} max={5} value={this.state.qualityRating} />
                    <label for="clenlinessRating">Clenliness Rating</label>
                    <input type="number" id="clenlinessRating" min={1} max={5} value={this.state.clenlinessRating} />
                    <TextInput 
                        onChangeText={reviewBody => this.setState({reviewBody})}
                        value={this.state.reviewBody} 
                    />
                    {/* add import image button and small preview of current image */}
                    <Button title="Update" onPress={this.updateReview} />
                    <Button title="Delete" onPress={this.deleteReview()} />
                </View>
            );
        } else{
            return(
                <View>
                    <View>
                    <label for="overallRating">Overall Rating</label>
                    <input type="number" id="overallRating" min={1} max={5} value={this.state.overallRating} />
                    <label for="priceRating">Price Rating</label>
                    <input type="number" id="priceRating" min={1} max={5} value={this.state.priceRating} />
                    <label for="qualityRating">Quality Rating</label>
                    <input type="number" id="qualityRating" min={1} max={5} value={this.state.qualityRating} />
                    <label for="clenlinessRating">Clenliness Rating</label>
                    <input type="number" id="clenlinessRating" min={1} max={5} value={this.state.clenlinessRating} />
                    <TextInput 
                        onChangeText={text => onChangeText(text)}
                        value={this.state.reviewBody} 
                    />
                    {/* add import image button and small preview of current image */}
                    <Button title="Submit" onPress={this.writeReview()} />
                </View>
                </View>
            )
        }
    }

    renderLocation(){
        let token = asyncHelp.getUserToken();

        if(token === ""){
            return(
                <View>
                    <Title>{this.state.locTown+": "+this.state.locName}</Title>
                    <Image url={this.state.photoPath} />
                    <View>
                        <Text>Average Overall Rating: {this.state.avgOverallRating}</Text>
                        <Text>Average Price Rating: {this.state.avgPriceRating}</Text>
                        <Text>Average Quality Rating: {this.state.avgQualityRating}</Text>
                        <Text>Average Clenliness Rating: {this.state.avgClenlinessRating}</Text>
                    </View>
                </View>
            );
        } else{
            return(
                <View>
                    <Title>{this.state.locTown+": "+this.state.locName}</Title>
                    <Image url={this.state.photoPath} />
                    <View>
                        <Text>Average Overall Rating: {this.state.avgOverallRating}</Text>
                        <Text>Average Price Rating: {this.state.avgPriceRating}</Text>
                        <Text>Average Quality Rating: {this.state.avgQualityRating}</Text>
                        <Text>Average Clenliness Rating: {this.state.avgClenlinessRating}</Text>
                    </View>
                    <Button title="Favourite" color={this.state.favButtonColour} onPress={() => this.handleFavourite()} />
                    {this.renderReviewWrite}
                </View>
            );
        }
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
            );
        } else{
            return(
                <View>
                    <Text>No reviews exist for this location yet</Text>
                </View>
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
                    {this.renderLocation()}
                    {this.renderReviews()}
                </View>
            );
        }
    }
}

export default Location;