import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import BlogItem from "../../components/blog-item/blog-item.component";
import Spinner from '../spinner/spinner.component'

import { selectBlogsMap } from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { getFavorites } from "../../utils/firebase/favorites";

import './favorite-items.styles.scss';

const FavoriteItems = () => {
    const currentUser = useSelector(selectCurrentUser);
    const blogs = useSelector(selectBlogsMap);
    const [favorites, setFavorites] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        if(currentUser != null){
            getFavorites(currentUser.uid).then((data) => {
                setFavorites(data);
                setIsLoading(false)
            });
        }
    }, [currentUser, blogs])

    return(
        <div className="favorite-items-container">
            <div>
            {isLoading ? (
                <div className="favorite-spinner">
                    <Spinner/>
                </div>
            ) :(
                favorites.map((blog) => (
                    <BlogItem key = {blog.id} blog = {blog} />
                ))
            )}
            </div>
        </div>
        
    )
}

export default FavoriteItems;
