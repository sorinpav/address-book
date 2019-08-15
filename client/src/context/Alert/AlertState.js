import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import uuid from 'uuid'; // we need a unique id for each alert in the array
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = []

    const [state, dispatch] = useReducer(AlertReducer, initialState);


    // Set alert 
    const setAlert = (msg,type, timeout=3000) => {
        const id = uuid.v4(); //generate a random id
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        })

        setTimeout(() => dispatch({
            type: REMOVE_ALERT,
            payload: id
        }), timeout);
    }


    return <AlertContext.Provider
        value={{
            alerts: state,
            setAlert
        }}> 
        {props.children}
</AlertContext.Provider>
//making the above content available to our entire app
}

export default AlertState;