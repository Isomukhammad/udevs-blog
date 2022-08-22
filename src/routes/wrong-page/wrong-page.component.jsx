import {ReactComponent as ErrorLogo} from '../../assets/error.svg'

import './wrong-page.styles.scss';

const WrongPage = () => {
    return(
        <div className="wrong-page-container">
            <div className='wrong-page-error'>
                <ErrorLogo/>
            </div>       

            <div>
                <h1>Такой страницы не существует. Попробуйте ещё!</h1>
            </div>     
        </div>
    )
}

export default WrongPage;