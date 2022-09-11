import { Fragment} from 'react';
import {Outlet} from 'react-router-dom';

import Logo from '../../components/logo/logo.component';
import NavLinks from '../../components/nav-links/nav-links.cmponent';
import AuthenticationButton from '../../components/auth-button/auth-button.component';
import AuthenticationPopup from '../../components/auth-popup/auth-popup.component';

import './navigation.styles.scss';

const Navigation = () => {
    return(
        <Fragment>
            <div className='navigation-container'>
                <Logo/>                    
                <NavLinks/>
                <div className='navigation-popup'>
                    <AuthenticationPopup/>
                </div>
                <AuthenticationButton/>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;