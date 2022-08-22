import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { writeUserData } from '../../utils/firebase/firebase.utils';

import { selectBlogsMap, selectBlogsMapIsLoading } from '../../store/blogs/blogs.selector';

import { setLocaleTime } from '../../utils/LocaleTime';

import './blog-preview.styles.scss';
import { selectCurrentUser } from '../../store/user/user.selector';
import { fetchBlogsAsync } from '../../store/blogs/blogs.action';
import BlogInfo from '../../components/blog-info/blog-info.component';
import BlogAuthor from '../../components/blog-author/blog-author.component';

const BlogPreview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogsAsync());
    }, [])

    const { id, url} = useParams();

    const blogs = useSelector(selectBlogsMap)
    const user = useSelector(selectCurrentUser);
    const isLoad = useSelector(selectBlogsMapIsLoading);

    const [profileData, setProfileData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [time, setTime] = useState();
    const [newArray, setNewArray] = useState([]);

    const getArray = async () => { 
        const data = await blogs.filter(function(e){
            return e.url == url;
        })

        return data;
    }

    useEffect(() => {
        if(!isLoad){
            getArray().then((data) => {
                setNewArray(data[0]);

                writeUserData(data[0].uid).then((data) => {
                    setProfileData(data);
                    setTime(setLocaleTime(data));
                    setIsLoading(false);
                })
            })
        }
    }, [blogs, isLoad]);

    return(
        <div className="blog-preview-container">
            {isLoading ? null : (
            <>
                <BlogAuthor 
                    profileData = {profileData} 
                    user = {user}
                    newArray = {newArray}
                />                
                <BlogInfo 
                    newArray = {newArray} 
                    time = {time} 
                    id = {id}
                />
            </>
            )}
        </div>
    )
}

export default BlogPreview;