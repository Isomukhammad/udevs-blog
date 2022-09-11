import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteItems from '../../components/favorite-items/favorite-items.component';
import Footer from '../../components/footer/footer.component';
import Navigation from '../../components/navigation/navigation.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectBlogsMap } from '../../store/blogs/blogs.selector';
import { setLoading } from '../../store/loading/loading.action';
import { selectLoading } from '../../store/loading/loading.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { getFavorites } from '../../utils/firebase/favorites';

import styles from './favorites.module.scss';

const Favorites = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const blogs = useSelector(selectBlogsMap);
    const [favorites, setFavorites] = useState();
    const isLoading = useSelector(selectLoading);

    useEffect(()=> {
        dispatch(setLoading(true));
        if(currentUser != null){
            getFavorites(currentUser.uid).then((data) => {
                setFavorites(data);
                dispatch(setLoading(false));
            });
        }
    }, [currentUser, blogs])

    return(
        <>
        { isLoading === true ? (
            <Spinner />
        ) : (
            <div className={styles.favoritesContainer}>
                <Navigation/>
                <h1>Избранные</h1>
                <FavoriteItems favorites={favorites}/>
                <Footer/>
            </div>
        )}
        </>
    )
}

export default Favorites;
