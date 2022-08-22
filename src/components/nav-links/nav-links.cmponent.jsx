import { Link } from "react-router-dom";

import { MenuItem } from "@mui/material";

import './nav-links.styles.scss';

const NavLinks = () => {
    return(
        <div className="nav-links-container">
            <MenuItem component = {Link} to = {`/vse-potoki`}>Все потоки</MenuItem>
            <MenuItem component = {Link} to = {`/razrabotka`}>Разработка</MenuItem>
            <MenuItem component = {Link} to = {'/administirovanie'} >Администрирование</MenuItem>
            <MenuItem component = {Link}  to = {'/desayn'} >Дизайн</MenuItem>
            <MenuItem component = {Link}  to = {'/menedjment'} >Менеджмент</MenuItem>
            <MenuItem component = {Link}  to = {'/marketing'} >Маркетинг</MenuItem>
            <MenuItem component = {Link}  to = {'/nauchpop'} >Научпоп</MenuItem>
        </div>
    )
}

export default NavLinks;