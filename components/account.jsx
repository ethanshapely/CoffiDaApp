import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        // try{
        //     let userToken = await AsyncStorage.getItem('@user_token')
        // }
        // catch(e){
        //     console.log(e);
        // }
        const token = AsyncStorage.getItem('@user_token');
        const id = AsyncStorage.getItem('@user_id');

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