//  Ye request maaraga and data dispatch kar dega
// Fir koi bhi file uss data ko access kar sakti hai
import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
} from "../constants/userConstants";

export function login(email, password) {
    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: LOGIN_REQUEST
                }
            )
            let url = `/api/v1/login`
            //For POST req, 2nd parameter is the form data
            // And the 3rd parameter is the config which contains all sorts of crazy things

            const config = { headers: { "Content-Type": "application/json" } };
            const data = await axios.post(url, { email, password }, config)

            console.log('url (userAction) => ', url)
            console.log('data (userAction)', data)

            dispatch(
                {
                    type: LOGIN_SUCCESS,
                    payload: data
                }
            )
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST, success:"Abhi SUCCESS nhi hui" });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        console.log('data (userAction) => ', data.user)
        dispatch({
            type: REGISTER_USER_SUCCESS, payload: data.user ,success:"Han bahi Sucess ho gyi hai"
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export function loadUser() {
    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: LOAD_USER_REQUEST
                }
            )
            let url = `/api/v1/me`
            //For POST req, 2nd parameter is the form data
            // And the 3rd parameter is the config which contains all sorts of crazy things

            // const config = { headers: { "Content-Type": "application/json" } };
            const data = await axios.get(url);

            // console.log('url (userAction) => ', url)
            // console.log('data (userAction)', data)

            dispatch(
                {
                    type: LOAD_USER_SUCCESS,
                    payload: data
                }
            )
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

//Logout User
export function  logout(){
    return async (dispatch)=>{
        try {
            await axios.get(`api/v1/logout`)
            dispatch({
                type:LOGOUT_SUCCESS
            })
        }catch (e) {
            dispatch({
                type:LOGOUT_FAIL,
                payload:e.response.data.message
            })
        }
    }
}

//Update Profile
export function updateProfile(userData){
    return async (dispatch)=>{
        try {
            dispatch({
                type:UPDATE_PROFILE_REQUEST,
                customMessage: "Abhi Update Request par hai"
            })
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const url = `/api/v1/me/updateProfile`
            const {data} =  await axios.put(url,userData,config)

            console.log('url (userAction -updateProfile) => ', url)
            console.log('data (userAction -updateProfile)', data)

            dispatch({
                type:UPDATE_PROFILE_SUCCESS,
                customMessage: "Abhi Update Success par hai",
                payload: data.success
            })
        }catch (e) {
            dispatch({
                type:UPDATE_PROFILE_FAIL,
                errorMessage:e
            })
        }
    }
}

//Update Password
export function updatePassword(userData){
    return async (dispatch)=>{
        try {
            dispatch({
                type:UPDATE_PASSWORD_REQUEST,
                customMessage: "Abhi Update Password Request par hai"
            })
            // When you are not sending any image
            const config = { headers: { "Content-Type": "application/json" } };
            const url = `/api/v1/password/update`
            const {data} =  await axios.put(url,userData,config)

            console.log('url (userAction -updateProfile) => ', url)
            console.log('data (userAction -updateProfile)', data)

            dispatch({
                type:UPDATE_PASSWORD_SUCCESS,
                customMessage: "Abhi Update Success par hai",
                payload: {
                    "payload":"Ye payload ka object hai",
                    'payloadData':data
                }
            })
        }catch (e) {
            dispatch({
                type:UPDATE_PASSWORD_FAIL,
                errorMessage:e
            })
        }
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

// get Single User details
export const getUserDetails = (id) =>
    async (dispatch) =>{
    // console.log('reached user details')
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/v1/admin/user/${id}`);
        // console.log(data)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data.user
        })
    }catch (e) {
        dispatch({ type: USER_DETAILS_FAIL, payload: e.response.data.message });
    }
}

export const updateUser = (userId,userData)=>
    async (dispatch)=>{
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        })


        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post(`/api/v1/admin/updateUserRole/${userId}`,userData,config);
        // console.log(data)
        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload: data.user
        })
    }catch (e) {
        dispatch({ type: UPDATE_USER_FAIL, payload: e.response.data.message });
    }
}




















// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
        success: "Errors Cleared"
    })
}
