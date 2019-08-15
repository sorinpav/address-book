import React, {useContext, useRef, useEffect} from 'react'
import ContactsContext from '../../context/Contacts/ContactsContext'
const ContactFilterForm = () => {

    const contactsContext = useContext(ContactsContext);
    const text = useRef('');
    
    const {filterContacts, clearFilter, filtered} = contactsContext;

    useEffect(() => {
        if(filtered=== null) {
            text.current.value='';
        }
    })

    const onChange = e => {
        if (text.current.value !==''){
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilterForm
