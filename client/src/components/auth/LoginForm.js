import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/Authentication/AuthContext';
import AlertContext from '../../context/Alert/AlertContext'
const LoginForm = (props) => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const {email, password} = user;
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);



    const {loginUser, error, clearErrors, isAuthenticated} = authContext;
    const {setAlert} = alertContext;


    useEffect(() => {

        //  if (isAuthenticated){
        //     props.history.push('/'); // redirect to homepage
        // }
         //@todo fix error with props.history.push()
        if(error==="Invalid Credentials"){
            setAlert(error, 'danger'); // if error matches above, send out the error and show it to the user
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, props.history, isAuthenticated]); //this will run when the error changes as well, because the error value is added as a dependency to useEffect as well


    const onChange = e => setUser({...user,[e.target.name]:e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if( email ==='' || password ==='' ){
            setAlert('Please enter all fields', 'danger');
        } else {
            loginUser({
                email,
                password
            })
        }
    }   
    
    return (
        <div className="form-container">
            <h1>Login <span className="text-primary">here</span></h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Enter your email" value={email} onChange={onChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your Password" value={password} onChange={onChange} required/>
            </div>
            <input type="submit" value="Login" className="btn btn-primary btn-block"/>
        </form>
        </div>
    )

}
export default LoginForm