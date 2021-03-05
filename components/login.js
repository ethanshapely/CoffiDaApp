import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import asyncHelp from './asynchFunctions';

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            userID: "",
            userToken: "",
            loading: false
        };

    }

    login(){
        this.setState({
            loading: true
        });
        let sendData = {
            email: this.state.email,
            password: this.state.password
        };

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 400){
                console.log("Invalid email/password")
            } else{
                console.log("Server side error")
            }
        })
        .then((respJson) => {
            asyncHelp.setUserToken(respJson.session_token);
            asyncHelp.setUserId(respJson.user_id.toString());
            asyncHelp.setUserFavourites("");
            asyncHelp.setUserReviews("");
            this.props.navigation.goBack();
        })
        .catch((error) => {
            this.setState({
                loading: false
            });
            console.log(error);
        })
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
                    <ScrollView>
                        {/* Main Title (different styling) */}
                        <Text>Login</Text>
                        
                        <View>
                            <Text>Email:</Text>
                            <TextInput 
                                placeholder="Type here..."
                                onChangeText={(email => this.setState({email}))}
                                value={this.state.email}
                            />
                        </View>

                        <View>
                            <Text>Password:</Text>
                            <TextInput 
                                secureTextEntry={true}
                                placeholder="Type here..."
                                onChangeText={(password => this.setState({password}))}
                                value={this.state.password}
                            />
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => this.login()}
                            >
                                <Text>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

export default Login;