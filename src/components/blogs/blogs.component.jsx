import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectBlogsMap } from '../../store/blogs/blogs.selector';
import BlogItem from '../blog-item/blog-item.component';
import PageButton from '../pages-button/pages-button.components';

import './blogs.styles.scss';

const Blogs = () => {
    const blogs = useSelector(selectBlogsMap);
    const blogsLength = Math.ceil(blogs.length/5);
    const [pageNumber, setPageNumber] = useState(1);

    return(
        <div className="blogs-container">
            {
                blogs.slice(5*(pageNumber-1), 5*pageNumber).map((blog) => (
                    <BlogItem key = {blog.id} blog = {blog} />
                ))
            }

            <PageButton blogsLength = {blogsLength} pageNumber = {pageNumber} setPageNumber = {setPageNumber}/>
        </div>
    )
}

export default Blogs;