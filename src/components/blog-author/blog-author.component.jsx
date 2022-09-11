import { useState, useEffect } from 'react';

import { addToFavorites, checkFavorites, deleteFromFavorites } from '../../utils/firebase/favorites';

import { Button } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { deleteBlog } from '../../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';

import styles from './blog-author.module.scss';

const BlogAuthor = ({profileData, user, newArray}) => {
    const [favorite, setFavorite] = useState(false);

    const navigate = useNavigate()
    const deleteThisBlog = () => {
        deleteBlog(newArray.id).then((data) => {
            if(data === true) {
                navigate('/');
            } else {
                alert('Ошибка при удалении новости. Попробуйте ещё!');
            }
        })
    }

    console.log(newArray)
    useEffect(() => {
        if(newArray.id){
            try{
                checkFavorites(user.uid, newArray.id).then((data) => {
                    if(data === true){
                        setFavorite(true);
                    } return false;
                });
            } catch (error){
                return false;
            }
        } 
    }, [newArray])

    return(
        <div className={styles.div}>
        {!profileData ? (null) : (
        <>
            <img src = {profileData.photoURL} className = 'author-img'/>
            <p>
                {!user ? profileData.displayName : (user.uid != newArray.uid ? null : 'Вы создали эту новость')}
            </p>
            
            {!user ? (
                null
            ) : (
                user.uid != newArray.uid ? (
                    null
                 ) : (
                    <Button 
                        variant='contained' 
                        color = 'error' 
                        size = 'small'
                        style = {{marginTop: '1em'}}
                        onClick = {deleteThisBlog}
                    >
                        Удалить новость
                    </Button>
                 )
            )
            }

            <div className = {styles.button}>
                {!user ? null : (
                    user.uid != newArray.uid ? (
                    <>
                        <Button variant="contained">Follow</Button>
                        <Button onClick  = {() => {
                            if(favorite === false){
                                setFavorite(true)
                                addToFavorites(user.uid, newArray.id).then((data) => {
                                    if(data === false){
                                        setFavorite(false);
                                    }
                                });
                            } else {
                                setFavorite(false);
                                deleteFromFavorites(user.uid, newArray.id).then((data) => { 
                                    if(data === false){
                                        setFavorite(true);
                                    }
                                })
                            }
                            }}variant='outlined'>
                                {

                                    !favorite ? 
                                    (<BookmarkBorderOutlinedIcon/>)
                                    : 
                                    (<BookmarkIcon/>)
                                }
                        </Button>
                    </>
                    ) : (null)
                )}
            </div>
        </>
        )}
        </div>
    )
}

export default BlogAuthor;