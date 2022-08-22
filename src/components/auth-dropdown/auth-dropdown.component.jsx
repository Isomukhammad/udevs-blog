import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setIsAuthdropdownOpen } from '../../store/authmenu/authmenu.action';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectIsAuthdropdownOpen } from '../../store/authmenu/authmenu.selector';

import { MenuItem } from '@mui/material'

import './auth-dropdown.styles.scss';

const AuthDropdown = () => {
    const dispatch = useDispatch();

    const isAuthdropdownOpen = useSelector(selectIsAuthdropdownOpen)
    
    const toggleIsAuthdropdownOpen = () => dispatch(setIsAuthdropdownOpen(!isAuthdropdownOpen))

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && !event.target.classList.contains('navigation-user-img')) {
                    dispatch(setIsAuthdropdownOpen(false))
                }
            }

            document.addEventListener('mousedown', handleClickOutside);

            return() => document.removeEventListener("mousedown", handleClickOutside);
        }, [ref])
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return(
        <div className='auth-dropdown-container' ref = {wrapperRef}>
            {
                !isAuthdropdownOpen ? null : (
                    <div 
                        className='auth-dropdown-links' 
                        onClick={toggleIsAuthdropdownOpen}
                    >
                        <MenuItem component = {Link} to ='/writepost'>Написать публикацию</MenuItem>
                        <MenuItem component = {Link} to = '/favorites'>Избранные</MenuItem>
                        <MenuItem onClick = {() => {
                            signOutUser(); 
                            toggleIsAuthdropdownOpen()
                        }}>Выйти</MenuItem>
                    </div>
                )
            }
        </div>
    )
}

export default AuthDropdown;