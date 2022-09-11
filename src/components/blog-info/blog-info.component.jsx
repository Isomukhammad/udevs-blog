import { useEffect } from 'react';

import { incrementView } from '../../utils/firebase/firebase.utils';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import './blog-info.styles.scss';

const BlogInfo = ({newArray, id, time}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            incrementView(id);
        }, 1000);
          
        return () => clearTimeout(timer);
    }, [])

    return(
        <div className="blog-info-container">
            <img 
                src={newArray.imageURL} 
                alt="Image"
                style = {{objectFit: 'cover'}}
            />
            <div className='author'><i>Фото: {newArray.author}</i></div>
            {!time ? (null) : (
                <div className='blog-time'>
                    <div>{time}</div>
                    |
                    <div><VisibilityOutlinedIcon/> <span>{newArray.views}</span></div>
                </div>
                
            )}
            <h1>{newArray.title}</h1>
            <p style = {{whiteSpace: 'pre-line'}}>{newArray.description}</p>
        </div>
    )
}

export default BlogInfo;