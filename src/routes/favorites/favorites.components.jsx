import FavoriteItems from '../../components/favorite-items/favorite-items.component';
import Footer from '../../components/footer/footer.component';

import './favorites.styles.scss';

const Favorites = () => {
    return(
        <div className="favorites-container">
            <h1>Избранные</h1>
            <FavoriteItems/>
            <Footer/>
        </div>
        
    )
}

export default Favorites;
