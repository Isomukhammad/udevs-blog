import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './blog-item.styles.scss'

const BlogItem = ({blog}) => {
    const {title, description, category, imageURL, url, id} = blog;

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(`/${category}/${id}/${url}`);

    return(
        <div className="blog-item-container">  
            <img src={imageURL} onClick = {onNavigateHandler} alt = 'Blog'/>
            <div className='blog-item-description'>
                <div>
                    <h2 onClick={onNavigateHandler}>{title}</h2>
                    <p>{description}</p>
                </div>
                <div>
                   <Button variant = 'outlined' style = {{zIndex: '0'}} onClick = {onNavigateHandler}>Читать</Button>
                </div>    
            </div>
            
        </div>
    )
}

export default BlogItem;