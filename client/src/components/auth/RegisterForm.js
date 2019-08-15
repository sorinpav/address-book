import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/Alert/AlertContext';
import AuthContext from '../../context/Authentication/AuthContext';



const RegisterForm = props => {

    // const history = createBrowserHistory();

    const alertContext = useContext (AlertContext);
    const authContext = useContext (AuthContext);

    const {setAlert} = alertContext;
    const {registerUser, error, clearErrors, isAuthenticated} = authContext;
    
    
    useEffect(() => {

        //  if (isAuthenticated){
        //     props.history.push('/'); // redirect to homepage
        // }
        //@todo fix error with props.history.push()
        if(error==="The user already exists"){
            setAlert(error, 'danger'); // if error matches above, send out the error and show it to the user
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, isAuthenticated, props.history]); //this will run when the error changes as well, because the error value is added as a dependency to useEffect as well

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const {name, email, password, repeatPassword} = user;


    const onChange = e => setUser({...user,[e.target.name]:e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if(name==='' || email ==='' || password ==='' ){
            setAlert('Please enter all fields', 'danger');
        } else if (password !== repeatPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            registerUser({
                name,
                email,
                password
            })
            //some redirect needs to happen here
        }
    }
    
    
    return (
        <div className="form-container">
            <h1>Register <span className="text-primary">here</span></h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Enter your name" value={name} onChange={onChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Enter your email" value={email} onChange={onChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your Password" value={password} onChange={onChange} required minLength='6'/>
            </div>
            <div className="form-group">
                <label htmlFor="repeatPassword" >Repeat your password:</label>
            <input type="password" name="repeatPassword" placeholder="Enter your password again" value={repeatPassword} onChange={onChange} required minLength='6'/>
            </div>
            <input type="submit" value="Register" className="btn btn-primary btn-block"/>
        </form>
        </div>
    )
}
export default RegisterForm