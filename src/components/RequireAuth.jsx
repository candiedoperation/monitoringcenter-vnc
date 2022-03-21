import { Navigate } from 'react-router-dom';
import verifyAuthentication from '../controllers/authenticationController';

const RequireAuth = (props) => {
    if (verifyAuthentication() === true)
        return (props.children);
    else 
        return (<Navigate replace to="/login" />);
}

export default RequireAuth;