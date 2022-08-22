import { Link } from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.component';

import './authentication.styles.scss'


const Authentication = () => {
    return(
        <div className="authentication-container">
            <SignIn/>
        </div>
    )
}

export default Authentication;