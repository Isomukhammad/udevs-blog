import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Authentication from '../../routes/authentication/authentication.component';
import { setIsAuthmenuOpen } from '../../store/authmenu/authmenu.action';
import { selectIsAuthdropdownOpen, selectIsAuthmenuOpen } from '../../store/authmenu/authmenu.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import AuthDropdown from '../auth-dropdown/auth-dropdown.component';

import './auth-popup.styles.scss';

const AuthenticationPopup = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const isAuthdropdownOpen = useSelector(selectIsAuthdropdownOpen);
    const isMenuOpen = useSelector(selectIsAuthmenuOpen);

    const toggleIsAuthmenuOpen = () => dispatch(setIsAuthmenuOpen(!isMenuOpen));
    
    useEffect(() => {
        if(currentUser){
            dispatch(setIsAuthmenuOpen(false));
        }
    }, [currentUser]);

    return(
        <div className='auth-popup-container'>
            { !isMenuOpen ? null : (
                <div className='sign-up' onClick={toggleIsAuthmenuOpen}>
                    <Authentication/>
                </div>
            )}

            { !isAuthdropdownOpen ? null : (
                <div>
                    <div className='auth-dropdown-triangle'>▲</div>
                </div>
            )}
            <AuthDropdown/>
        </div>
    )
}

export default AuthenticationPopup;