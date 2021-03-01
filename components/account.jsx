import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {getUserToken, getUserId} from 'asynchFunctions';

//Deprecated: Realised that I forgot about this component after making the profile component except that this was written to be more fitting for other users accounts,
//            perhaps this will be re-used for viewing other user's accounts
class Account extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

    }

    componentDidMount(){
        this.getUser();
    }

    /*

    */

    getUser(){
        const token = getUserToken();
        const id = getUserId();

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
            method: 'get',
            headers: {
                'X-Authorisation': token
            }
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
        .then((respJson) => {
            this.setState({
                firstName: respJson.first_name,
                lastName: respJson.last_name,
                email: respJson.email
            })
        })
        .catch((error) => {
            console.log(error);
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
            <View>

            </View>
        );
    }
    
}

export default Account;