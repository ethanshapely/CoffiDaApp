import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import asyncHelp from './asynchFunctions';

class Logout extends Component{

    constructor(props){
        super(props);

        this.state = {
            userID: "",
            userToken: "",
            loading: false
        };

    }

    /* componentDidMount(){
        load state data (or add it to the constructor, probably through Async Storage)
    }*/

    logout(){
        this.setState({
            loading: true
        });
        const token = asyncHelp.getUserToken();

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                //'Content-Type': 'application/json',
                'X-Authorisation': token
            }
        })
        .then((response) => {
            if(response.status === 200){
                asyncHelp.setUserToken("");
                asyncHelp.setUserId("");
                asyncHelp.setUserFavourites("");
                this.props.navigation.goBack();
            } else if(response.status === 401){
                throw "Unauthorised: You must be logged in in order to logout"
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
                    <Button title="Logout" onPress={() => this.logout()} />
                    <Text>Are you sure you want to logout?</Text>
                </View>
            );
        }
    }
}

export default Logout;