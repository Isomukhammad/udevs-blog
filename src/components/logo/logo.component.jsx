import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchBlogsAsync } from "../../store/blogs/blogs.action";

import { ReactComponent as UdevsLogo } from "../../assets/udevs.svg";

import './logo.styles.scss'

const Logo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToHomePage = () => {
        dispatch(fetchBlogsAsync());
        navigate('/');
    }

    return(
        <div className="logo-container">
            <UdevsLogo style = {{height: '40px', width: '115px'}} onClick = {() => goToHomePage()} />
        </div>
    )
}

export default Logo;