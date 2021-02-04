import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
        // handle user authorisation
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            this.setState({
                userID: "",
                userToken: ""
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return(
            <ScrollView>
                <TouchableOpacity
                    onPress={() => this.login()}
                >
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default Logout;