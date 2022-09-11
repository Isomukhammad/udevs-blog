import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogItem from "../../components/blog-item/blog-item.component";
import Spinner from '../spinner/spinner.component'

import { selectBlogsMap } from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { getFavorites } from "../../utils/firebase/favorites";

import './favorite-items.styles.scss';
import { selectLoading } from "../../store/loading/loading.selector";

const FavoriteItems = ({favorites}) => {
    return(
        <div className="favorite-items-container">
            <div>
            {
                favorites?.map((blog) => (
                    <BlogItem key = {blog.id} blog = {blog} />
                ))
            }
            </div>
        </div>
        
    )
}

export default FavoriteItems;
