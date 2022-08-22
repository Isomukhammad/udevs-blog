import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectBlogsMap } from "../../store/blogs/blogs.selector";
import { setStoriesMap } from "../../store/stories/stories.action";
import { selectStoriesMap } from "../../store/stories/stories.selector";

import StoryButton from "../story-button/story-button.component";

import './stories.styles.scss';

const StoriesRow = () => {
    const stories = useSelector(selectStoriesMap);
    const blogs = useSelector(selectBlogsMap);
    const [load, setLoad] = useState(true)
    const [story, setStory] = useState(''); 

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(load){
            let storyList = blogs.map((blog) => {
                const time = Math.round(Date.now()/1000) - blog.date.seconds;
                
                if(time < 86400){
                    return blog;
                }
            })

            storyList = storyList.filter(e => {
                return e !== undefined
            })

            dispatch(setStoriesMap(storyList))
        } 

        setLoad(false)
    }, [blogs])
    
    return(
        <div className="stories-container">
            {
                stories.map((story) => (
                    <StoryButton 
                        key = {story.id} 
                        story = {story} 
                        setStory = {setStory}
                    />
                ))
            }
        </div>
    )
}

export default StoriesRow;