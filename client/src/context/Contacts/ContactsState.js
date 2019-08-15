// This file holds the initial state and actions (search users, make a request to github etc)
// Making requests to github as well in this file

// What happens is I call an action (make a request to github), get a response 
// and then I dispatch a response back to our reducer
// Most of the time it is an object which has a type 
// Sometimes a payload

import React, { useReducer } from 'react';
import axios from 'axios';
import ContactsContext from './ContactsContext';
import ContactsReducer from './ContactsReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    LOAD_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER    
} from '../types';

const ContactsState = props => {
    const initialState = {
        contacts: null,
        current: null, 
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactsReducer, initialState);


    //Add contact // called in the ContactForm.js file
    
    const addContact = async (contact) => {
        const config = {
            headers: {
              'Content-Type':'application/json',
            }
          }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch( { 
                type:ADD_CONTACT,
                 payload: res.data
                });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            })    
        }
    }
    
    const loadContacts = async () => {

        if (localStorage.token){
          setAuthToken(localStorage.token);
        }
  
  
        try {
          const res = await axios.get('/api/contacts');
          dispatch({
            type: LOAD_CONTACTS,
            payload: res.data
          });
        }catch (error) {
          dispatch({
              type: CONTACT_ERROR,
              payload: error.response.data.msg 
        });
        }
      
      
      }
    
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS});
    }

    //Update contact 
    const updateContact = async (contact) => {
        const config = {
            headers: {
              'Content-Type':'application/json',
            }
          }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    //Delete Contact 
    const deleteContact = async (_id) => {
                await axios.delete(`/api/contacts/${_id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: _id
            });
        try {
            
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    //Filter contacts
    const filterContacts = (text) => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }
    //Clear filter 
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }  
    //Set current contact 
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }
    //Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }


    return <ContactsContext.Provider
        value={{
            contacts: state.contacts,
            error: state.error,
            current: state.current,  
            addContact,
            loadContacts, 
            deleteContact,
            updateContact,
            setCurrent,
            clearCurrent, 
            filtered: state.filtered,
            filterContacts,
            clearFilter,
            clearContacts

        }}> 
        {props.children}
</ContactsContext.Provider>
//making the above content available to our entire app
}

export default ContactsState;