import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserToken = async() => {
    try{
        return await AsyncStorage.getItem('@user_token');
    } catch(e){
        console.log(e);
    }
}

const setUserToken = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_token', value);
    } catch(e){
        console.log(e);
    }
}

const getUserId = async() => {
    try{
        return await AsyncStorage.getItem('@user_id');
    } catch(e){
        console.log(e);
    }
}

const setUserId = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_id', value);
    } catch(e){
        console.log(e);
    }
}

const getUserFavourites = async(value) => {
    try{
        return await AsyncStorage.getItem('@user_favourites')
    } catch(e){
        console.log(e);
    }
}

const setUserFavourites = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_favourites', value)
    } catch(e){
        console.log(e);
    }
}

const getUserReviews = async(value) => {
    try{
        return await AsyncStorage.getItem('@user_reviews')
    } catch(e){
        console.log(e);
    }
}

const setUserReviews = async(value) => {
    try{
        return await AsyncStorage.setItem('@user_reviews', value)
    } catch(e){
        console.log(e);
    }
}

export default getUserToken;
export default setUserToken;
export default getUserId;
export default setUserId;
export default getUserFavourites;
export default setUserFavourites;
export default getUserReviews;
export default setUserReviews;