import {ReactComponent as ErrorLogo} from '../../assets/error.svg'
import Navigation from '../../components/navigation/navigation.component';

import styles from './wrong-page.module.scss';

const WrongPage = () => {
    return(
        <div className={styles.div}>
            <Navigation/>
            <div className={styles.wrongPage}>
                <div className={styles.errorImg}>
                    <ErrorLogo/>
                </div>       

                <div>
                    <h1>Такой страницы не существует. Попробуйте ещё!</h1>
                </div>     
            </div>
        </div>
    )
}

export default WrongPage;