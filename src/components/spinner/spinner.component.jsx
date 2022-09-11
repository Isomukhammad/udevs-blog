import ClipLoader from 'react-spinners/ClipLoader';

import styles from './spinner.module.scss'

const Spinner = () => {
    return(
        <div className={styles.spinner}>
            <ClipLoader color = {"#2196f3"} loading = {true} size = {50}/>
        </div>
    )
}

export default Spinner;