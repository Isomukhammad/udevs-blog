import { useNavigate } from 'react-router-dom';
import './story-button.styles.scss';

const StoryButton = (props) => {
    const {title, imageURL, id} = props.story;

    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(`/stories`);
    return(
        <div className='story-component'>
            <div>
                <img src={imageURL} alt={title} onClick={onNavigateHandler}/>
            </div>
        </div>
    )
}

export default StoryButton;