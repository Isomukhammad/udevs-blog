import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectBlogsMapIsLoading } from '../../store/blogs/blogs.selector';

import { fetchBlogsAsync } from '../../store/blogs/blogs.action';

import Blogs from '../../components/blogs/blogs.component';
import Footer from '../../components/footer/footer.component';
import Spinner from '../../components/spinner/spinner.component';
import StoriesRow from '../../components/stories-row/stories-row.component';

import './home.styles.scss';

const Home = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectBlogsMapIsLoading);

    useEffect(() => {
        dispatch(fetchBlogsAsync());
    }, [])

    return(
        <div className='home-container'> 
            { isLoading ?
                <div className="home-spinner">
                    <Spinner/>
                </div> : 
                <div>
                    <StoriesRow/>
                    <Blogs/>
                    <Footer/>
                </div>
            }
        </div>
    )
}

export default Home;