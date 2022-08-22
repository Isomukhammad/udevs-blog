
const NavigationItems = () => {
    <div className='navigation-container'>
        <div className="logo-container">
            <Logo/>
        </div>

        <div className='nav-category'>
            <MenuItem component = {Link} to = {`/vse-potoki`}>Все потоки</MenuItem>
            <MenuItem component = {Link} to = {`/razrabotka`}>Разработка</MenuItem>
            <MenuItem component = {Link} to = {'/administirovanie'} >Администрирование</MenuItem>
            <MenuItem component = {Link}  to = {'/desayn'} >Дизайн</MenuItem>
            <MenuItem component = {Link}  to = {'/menedjment'} >Менеджмент</MenuItem>
            <MenuItem component = {Link}  to = {'/marketing'} >Маркетинг</MenuItem>
            <MenuItem component = {Link}  to = {'/nauchpop'} >Научпоп</MenuItem>
        </div>

        <div className="auth-container" onClick = {(e) => e.stopPropagation()}>
            {
                !currentUser ? (
                <Button 
                    variant='contained' 
                    color = 'primary' 
                    style = {{textTransform: 'none'}}
                    onClick = {toggleIsAuthmenuOpen}
                    >
                    Войти                        
                </Button>
                ) : (
                    <Button 
                        variant = 'container'
                        color = 'primary'
                        style = {{textTransform: 'none', borderRadius: '50%', minWidth: '44px', height: '44px'}}
                        className = 'authButton'
                        onClick = {toggleIsAuthdropdownOpen}
                        >
                            <img src= {profileIMG} alt="User Img" style = {{height: '40px', width: '40px'}} className = 'navigation-user-img'/>
                    </Button>
                )
            }
        </div>

        <div className='auth-popup'>               
            {
                !isMenuOpen ? null : (
                <div className='auth-popup-1' onClick={toggleIsAuthmenuOpen}>
                    <Authentication/>
                </div>
                ) 
            }

            {
                !isAuthdropdownOpen ? null : (
                    <div>
                        <div className='auth-dropdown-triangle'>▲</div>
                    </div>
                )
            }
            <AuthDropdown/>
        </div>
    </div>
}