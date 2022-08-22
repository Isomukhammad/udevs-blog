import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
    return(
        <div className='spinner-container'>
            <ClipLoader color = {"#2196f3"} loading = {true} size = {50}/>
        </div>
    )
}

export default Spinner;