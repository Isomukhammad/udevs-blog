import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIsAuthdropdownOpen, setIsAuthmenuOpen } from "../../store/authmenu/authmenu.action";

import { selectIsAuthdropdownOpen, selectIsAuthmenuOpen } from "../../store/authmenu/authmenu.selector";
import { selectCurrentUser, selectUserInfo } from "../../store/user/user.selector";

import { Button } from "@mui/material";

import './auth-button.styles.scss';
import AuthenticationPopup from "../auth-popup/auth-popup.component";
import AuthDropdown from "../auth-dropdown/auth-dropdown.component";

const AuthenticationButton = () => {
    const dispatch = useDispatch();

    const [profileIMG, setProfileIMG] = useState('');
    
    const userInfo = useSelector(selectUserInfo);
    const currentUser = useSelector(selectCurrentUser);
    const isAuthdropdownOpen = useSelector(selectIsAuthdropdownOpen);
    const isMenuOpen = useSelector(selectIsAuthmenuOpen);

    const toggleIsAuthdropdownOpen = () => dispatch(setIsAuthdropdownOpen(!isAuthdropdownOpen))
    const toggleIsAuthmenuOpen = () => dispatch(setIsAuthmenuOpen(!isMenuOpen));

    useEffect(() => {
        setProfileIMG(userInfo.photoURL);
    }, [userInfo]);

    return(
        <div className="auth-button-container">
            { !currentUser ? (
                <Button 
                    variant='contained' 
                    color = 'primary' 
                    style = {{textTransform: 'none'}}
                    onClick = {toggleIsAuthmenuOpen}
                    >
                        Войти
                </Button>
                ) : (
                <img 
                    src= {profileIMG} 
                    alt = {''} 
                    style = {{height: '40px', width: '40px'}} 
                    className = 'navigation-user-img' 
                    onClick = {toggleIsAuthdropdownOpen}
                />
            )}

            { !isAuthdropdownOpen ? null : (
                <div>
                    <div className='auth-dropdown-triangle'>▲</div>
                    <AuthDropdown/>
                </div>
            )}
        </div>
    )
}

export default AuthenticationButton;