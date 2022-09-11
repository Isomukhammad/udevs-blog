import { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectStoriesMap } from "../../store/stories/stories.selector";

import Stories from 'react-insta-stories';
import {WithSeeMore} from 'react-insta-stories';

import Logo from "../../components/logo/logo.component";

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './story.styles.scss'
import { Button } from "@mui/material";

const Story = () => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate('/');
    const [isLoading, setIsLoading] = useState(true);
    const [stories, setStories] = useState([{}]);
    const [header, setHeaders] = useState([]);

    const selectStories = useSelector(selectStoriesMap);

    const customCollapsedComponent = ({ toggleMore, action }) => {
	    <h2>
		    Читать новость
	    </h2>
    }

    const pushStories = async () => {
        const storyArray = [];

        selectStories.map((story) => {
            const newObject = {
                url: story.imageURL,

                seeMoreCollapsed: ({toggleMore}) => {
                    return( 
                        <div className="see-more-button" onClick={toggleMore}>
                            <KeyboardArrowUpIcon/>
                            <h2>
                                Подробнее
                            </h2>
                        </div>
                    )
                },

                seeMore: ({ close }) => {
                    return (
                        <div onClick = {close} className = 'story-see-more'>
                            <div>{story.title}</div>
                            <Button component = {Link} target = '_blank' to = {`/${story.category}/${story.id}/${story.url}`}>Читать новость</Button> 
                        </div>
                    );
                },                
                header: {
                    heading: story.title,
                },
            }

            storyArray.push(newObject);
        });

        return storyArray;
    }

    useEffect(()=> {
        pushStories().then((data) => setStories(data));
        setIsLoading(false);
    }, [])

    return(
        <>
        { isLoading == true ? (null) : (
        <div className="story-container">
            <div className="story-nav">
                <Logo/>
                <CloseIcon color="primary" className = 'close-button' style = {{cursor: 'pointer'}} onClick = {onNavigateHandler}/>
            </div>

            <div className="story-display">
                <Stories 
                    minWidth={"800px"}
                    height={'90vh'}
                    stories={stories}
                    defaultInterval={5000}   
                    onAllStoriesEnd = {onNavigateHandler} 
                    keyboardNavigation = 'true'
                />
            </div>
        </div>
        )}
        </>
    )
}

export default Story;