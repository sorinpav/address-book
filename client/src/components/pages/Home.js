import React, {useContext, useEffect} from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../../components/contacts/ContactForm'
import ContactFilterForm from '../contacts/ContactFilterForm';
import AuthContext from '../../context/Authentication/AuthContext';
const Home = () => {
    
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        
        <div className="grid-2">
            <div>
            <ContactForm/>
            </div>
            <div>
            <ContactFilterForm/>
            <Contacts/>
            </div>
        </div>
    )
}

export default Home
