import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/Authentication/AuthContext';
import ContactsContext from '../../context/Contacts/ContactsContext';
const Navbar = ({title, icon}) => {
    
    const authContext = useContext(AuthContext);
    const contactsContext = useContext(ContactsContext);

    const {isAuthenticated, logoutUser, user} = authContext;
    const {clearContacts} = contactsContext;

    const onLogout = () => {
        logoutUser();
        clearContacts();
    }


    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}> <i className="fas fa-sign-out-alt"></i><span className='hide-sm'>Logout</span> </a>
            </li>
        </Fragment>

    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>

    )
    return (
    <nav className="navbar bg-dark">
        <h1>
            <i className={icon}></i> {title}
        </h1>
        <ul>
            {isAuthenticated ? authLinks : guestLinks}
        </ul>
    </nav>
    )
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}


export default Navbar
