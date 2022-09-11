import { Link, matchRoutes, useLocation, useRoutes } from "react-router-dom";

import { MenuItem } from "@mui/material";

import './nav-links.styles.scss';
import { useEffect } from "react";
import { useState } from "react";

const NavLinks = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState();

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(() => {
        console.log(currentPath)
    }, [currentPath])

    return(
        <>
        <div className="nav-links-container">
            <MenuItem 
                component = {Link} 
                to = {`/vse-potoki`}
                style = 
                    {currentPath == '/vse-potoki' ? {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} : null
                }
            >Все потоки</MenuItem>
            <MenuItem 
                component = {Link} 
                to = {`/razrabotka`}
                style = 
                    {currentPath == '/razrabotka' ? {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} : null
                }
            >Разработка</MenuItem>
            <MenuItem 
                component = {Link} 
                to = {'/design'} 
                style = 
                    {currentPath == '/design' ? {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} : null
                }
            >Дизайн</MenuItem>
            <MenuItem 
                component = {Link}  
                to = {'/menedjment'} 
                style = 
                {   currentPath == '/menedjment' ? 
                    {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} 
                    : null
                }
            >Менеджмент</MenuItem>

            <MenuItem 
                component = {Link}  
                to = {'/marketing'} 
                style = 
                {   currentPath == '/marketing' ? 
                    {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} 
                    : null
                }
            >Маркетинг</MenuItem>

            <MenuItem 
                component = {Link}  
                to = {'/nauchpop'} 
                style = 
                {   currentPath == '/nauchpop' ? 
                    {backgroundColor: '#2196f3', color: 'white', borderRadius: '.7em'} 
                    : null
                }
            >Научпоп</MenuItem>
        </div>
        </>
    )
}

export default NavLinks;