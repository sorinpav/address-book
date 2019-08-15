import React, { useState, useContext, useEffect } from 'react';
import ContactsContext from '../../context/Contacts/ContactsContext';

const ContactForm = () => {

    const contactsContext = useContext(ContactsContext);


    const [contact, setContact] = useState({
        name:'',
        email: '',
        phone: '',
        type: 'personal'
    });
    
    const {name, email, phone, type} = contact;
    const {addContact, current, clearCurrent, updateContact} = contactsContext;
    
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name:'',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactsContext, current]);




    const onChange = e => setContact({
        ...contact,
        [e.target.name]: e.target.value
    });


    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();

    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange}/>
            <input type="text" placeholder="email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange}/>
            <h5>
                Contact Type: 
            </h5>
            <input type="radio" name="type" value="personal" checked={type==='personal'} onChange={onChange}/> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type==='professional'} onChange={onChange}/> Professional
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-dark btn-block"/>
            </div>
            {current && <div>
            <input type="submit" value='Clear fields' className="btn btn-light btn-block" onClick={clearAll}/>
            </div>}
        </form>
    )
}

export default ContactForm
