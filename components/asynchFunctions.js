import AsyncStorage from '@react-native-community/async-storage';

export const getUserToken = async() => {
    try{
        return await AsyncStorage.getItem('@user_token');
    } catch(e){
        console.log(e);
    }
}

export const setUserToken = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_token', value);
    } catch(e){
        console.log(e);
    }
}

export const getUserId = async() => {
    try{
        return await AsyncStorage.getItem('@user_id');
    } catch(e){
        console.log(e);
    }
}

export const setUserId = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_id', value);
    } catch(e){
        console.log(e);
    }
}

export const getUserFavourites = async() => {
    try{
        return await AsyncStorage.getItem('@user_favourites')
    } catch(e){
        console.log(e);
    }
}

export const setUserFavourites = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_favourites', value)
    } catch(e){
        console.log(e);
    }
}

export const getUserReviews = async() => {
    try{
        return await AsyncStorage.getItem('@user_reviews')
    } catch(e){
        console.log(e);
    }
}

export const setUserReviews = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_reviews', value)
    } catch(e){
        console.log(e);
    }
}