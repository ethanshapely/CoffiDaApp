import AsyncStorage from '@react-native-community/async-storage';

const asyncHelp = {

    getUserToken = async() => {
        try{
            return await AsyncStorage.getItem('@user_token');
        } catch(e){
            console.log(e);
        }
    },

    setUserToken = async(value) => {
        try{
            return await AsyncStorage.setItem('@user_token', value);
        } catch(e){
            console.log(e);
        }
    },

    getUserId = async() => {
        try{
            return await AsyncStorage.getItem('@user_id');
        } catch(e){
            console.log(e);
        }
    },

    setUserId = async(value) => {
        try{
            return await AsyncStorage.setItem('@user_id', value);
        } catch(e){
            console.log(e);
        }
    },

    getUserFavourites = async() => {
        try{
            return await AsyncStorage.getItem('@user_favourites')
        } catch(e){
            console.log(e);
        }
    },

    setUserFavourites = async(value) => {
        try{
            return await AsyncStorage.setItem('@user_favourites', value)
        } catch(e){
            console.log(e);
        }
    },

    getUserReviews = async() => {
        try{
            return await AsyncStorage.getItem('@user_reviews')
        } catch(e){
            console.log(e);
        }
    },

    setUserReviews = async(value) => {
        try{
            return await AsyncStorage.setItem('@user_reviews', value)
        } catch(e){
            console.log(e);
        }
    }
}

export default asyncHelp;