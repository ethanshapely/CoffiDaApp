import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncHelp = {

    getUserToken: async() => {
        try{
            return await AsyncStorage.getItem('@user_token');
        } catch(e){
            console.log(e);
            return null;
        }
    },

    setUserToken: async(value) => {
        try{
            return await AsyncStorage.setItem('@user_token', value);
        } catch(e){
            console.log(e);
            return null;
        }
    },

    getUserId: async() => {
        try{
            return await AsyncStorage.getItem('@user_id');
        } catch(e){
            console.log(e);
            return null;
        }
    },

    setUserId: async(value) => {
        try{
            return await AsyncStorage.setItem('@user_id', value);
        } catch(e){
            console.log(e);
            return null;
        }
    },

    getUserFavourites: async() => {
        try{
            return await AsyncStorage.getItem('@user_favourites')
        } catch(e){
            console.log(e);
            return null;
        }
    },

    setUserFavourites: async(value) => {
        try{
            return await AsyncStorage.setItem('@user_favourites', value)
        } catch(e){
            console.log(e);
            return null;
        }
    },

    getUserReviews: async() => {
        try{
            return await AsyncStorage.getItem('@user_reviews')
        } catch(e){
            console.log(e);
            return null;
        }
    },

    setUserReviews: async(value) => {
        try{
            return await AsyncStorage.setItem('@user_reviews', value)
        } catch(e){
            console.log(e);
            return null;
        }
    }
}

export default asyncHelp;