import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { createBlogNews, storage } from '../../utils/firebase/firebase.utils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { translit } from '../../utils/CirToLat';

import './post.styles.scss'
import Navigation from '../../components/navigation/navigation.component';


const blogInfo = {
    url: '',
    uid: '',
    title: '',
    description: '',
    id: '',
    category: '',
    imageURL: '',
    createdAt: '',
}


const Post = () => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate('/');

    const [formFields, setFormFields] = useState(blogInfo);
    const {url, title, description, category, uid, imageURL} = formFields;
    const [blogIMG, setBlogIMG] = useState('');
    const [disable, setDisable] = useState(false);
    const [load, setLoad] = useState(0);
    const [imgButtonText, setImgButtonText] = useState("Загрузить изображение")

    const currentUser = useSelector(selectCurrentUser);

    const uploadImages = async (collectionRef, image) => {
        if(image == null) return;
    
        try{            
            let imageRef = ref(storage, `${collectionRef}/${image.name}`);
            await uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((data) => {
                    setFormFields({...formFields, imageURL: data});
                })
            }) 
        } catch(error) {
            console.log('Error in uploading image', error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleImageInput = (event) => {
        setImgButtonText(event.target.files[0].name);
        setBlogIMG(event.target.files[0]);
    } 

    const getAdditionalData = async () => {
        const userId = currentUser.uid;       
        const date = new Date().toString();
        const id = new Date().getTime().toString();
        const link = translit(title).replace(/\s+/g, '-').toLowerCase();
        setDisable(true);
        setFormFields({...formFields, uid: userId, createdAt: date, id: id, url: link});
    }

    useEffect(() => {
        if(load === 1){
            try{
                createBlogNews(formFields).then(() => {
                    onNavigateHandler('/');
                });           
            } catch(error) {
                console.log('Error is', error);
            }
        }
    }, [imageURL]);

    useEffect(() => { 
        if(load === 1){
            try{
                uploadImages('blogImages', blogIMG)
            } catch(error) {
                console.log('Error in uploading img', error)
            }
        } else {
            setLoad(1);
        }
    }, [uid, url])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            getAdditionalData();
        } catch(error) {
            console.log('Error in uploading image', error)
        }
    }

    return(
        <div className="post-container">
            <Navigation/>
            <h2>Настройки публикации</h2>
            
            <form onSubmit = {handleSubmit}>
                <label htmlFor = 'title'>Название</label>
                <TextField 
                    name = 'title'
                    multiline
                    inputProps={{maxLength: 120}}
                    onChange = {handleChange}
                    value = {title}
                    required
                />

                <label htmlFor = 'description'>Описание</label>
                <TextField 
                    name = 'description' 
                    multiline
                    onChange = {handleChange}
                    value = {description}
                    required
                />

                
                <InputLabel id='demo-simple-select-label'>Категория</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    name = 'category'
                    value = {category}
                    id = 'demo-simple-select'
                    onChange={handleChange}    
                    required
                >
                    <MenuItem value = 'social'>Общество</MenuItem>
                    <MenuItem value = 'economy'>Экономика</MenuItem>
                    <MenuItem value = 'politic'>Политика</MenuItem>
                    <MenuItem value = 'accident'>Происшествия</MenuItem>
                    <MenuItem value = 'sport'>Спорт</MenuItem>
                </Select>

                <Button 
                    name = 'submitImage'
                    variant = 'contained' 
                    component = 'label' 
                    className= {'button-label' }
                    disabled = {disable}
                >
                    <p>{imgButtonText}</p>
                    <input 
                        type="file" 
                        accept="image/png, image/gif, image/jpeg" 
                        hidden 
                        onChange = { handleImageInput } 
                        required
                    />
                </Button>

                <Button 
                    type = 'submit' 
                    variant = 'contained' 
                    disabled = {disable}
                >
                    Опубликовать
                </Button>
            </form>
        </div>
    )
}

export default Post;