import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            userID: "",
            userToken: "",
            loading: false
        }
    }

    login(){
        let sendData = {
            email: this.state.email,
            password: this.state.password
        }

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((response) => response.json())
        .then((respJson) => {
            this.setState({
                userID: respJson.user_id,
                userToken: respJson.session_token
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
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

export default Login;