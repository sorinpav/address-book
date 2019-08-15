import React, { useContext, useEffect, Fragment } from 'react'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import ContactItem from './ContactItem'
import ContactsContext from '../../context/Contacts/ContactsContext';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactsContext = useContext(ContactsContext);

    const { contacts, filtered, loadContacts, loading } = contactsContext;

  useEffect(()=> {
    loadContacts();
    //eslint-disable-next-line
  }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Your address book is empty. Add a contact to see them here</h4>
    }

    return (
        
        <Fragment> 
          {contacts !== null && !loading ? (
          <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
            <CSSTransition key={contact._id} classNames='item' timeout={500}> 
            <ContactItem contact={contact}/>
            </CSSTransition>
            )) 
            : 
            contacts.map(contact => (
            <CSSTransition key={contact._id} classNames='item' timeout={500}>
              <ContactItem contact={contact} />
              </CSSTransition>
              ))}
    </TransitionGroup>) : <Spinner/>}
          
    </Fragment>
    
    )
}




export default Contacts
