import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userToken: ""
        }
    }

    newUser(){
        let sendData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then((respones) => {
            Alert.alert("New user created");
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
                    <Text>Create an Account</Text>
                    
                    <View>
                        <Text>First Name:</Text>
                        <TextInput 
                            placeholder="Type here..."
                            onChangeText={(firstName => this.setState({firstName}))}
                            value={this.state.firstName}
                        />
                    </View>

                    <View>
                        <Text>Last Name:</Text>
                        <TextInput 
                            placeholder="Type here..."
                            onChangeText={(lastName => this.setState({lastName}))}
                            value={this.state.lastName}
                        />
                    </View>

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
                            onPress={() => this.newUser()}
                        >
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }

}

export default SignUp;