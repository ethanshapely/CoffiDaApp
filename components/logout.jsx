import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component{

    constructor(props){
        super(props);

        this.state = {
            userID: "",
            userToken: ""
        }

    }

    /* componentDidMount(){
        load state data (or add it to the constructor, probably through Async Storage)
    }*/

    logout(){

        const token = AsyncStorage.getItem('@user_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
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
    }

    render(){
        return(
            <View>
                <Button title="Logout" onPress={() => this.logout()} />
                <Text>Are you sure you want to logout?</Text>
            </View>
        );
    }
}

export default Logout;