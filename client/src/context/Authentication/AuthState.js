// This file holds the initial state and actions (search users, make a request to github etc)
// Making requests to github as well in this file

// What happens is I call an action (make a request to github), get a response 
// and then I dispatch a response back to our reducer
// Most of the time it is an object which has a type 
// Sometimes a payload

import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), // stored in the browser's local storage
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    
    
    // Load user => checking which user is logged in, if any
    const loadUser = async () => {

      if (localStorage.token){
        setAuthToken(localStorage.token);
      }


      try {
        const res = await axios.get('/api/auth');
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      }catch (error) {
        dispatch({type: AUTH_ERROR});
      }
    
    
    }



    // Register user => sign up and get the token
    const registerUser = async formData => {
      const config = {
        headers: {
          'Content-Type':'application/json',
        }
      }

      try {
        const res = await axios.post('/api/users', formData, config); 
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
        loadUser();
      } catch (error) {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.msg
        })
      }
    }
    
    
    
    //Login user => login and get the token
    const loginUser = async formData => {
      const config = {
        headers: {
          'Content-Type':'application/json',
        }
      }
      try {

        const res = await axios.post('/api/auth', formData, config);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
        loadUser();
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.msg
        })
      }

    }



    //Logout => log the user out, set token back to null
    const logoutUser = () => {
      dispatch({
        type: LOGOUT
      })
    }
    
    
    //Clear errors => clear out any errors in this state
   const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    
   
   
   
   return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            loadUser, 
            registerUser,
            loginUser, 
            logoutUser, 
            clearErrors
        }}> 
        {props.children}
</AuthContext.Provider>
//making the above content available to our entire app
}

export default AuthState;