import { useState, useEffect } from 'react';

import { Button, TextField } from '@mui/material';

import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, storage } from '../../utils/firebase/firebase.utils';

import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, surname, email, password, confirmPassword} = formFields;
    const [profileIMG, setProfileIMG] = useState([]);
    const [photoURL, setPhotoURL] = useState('');
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const uploadImages = async (collectionRef, image) => {
        if(image == null) return;
    
        try{
            let imageRef = ref(storage, `${collectionRef}/${image.name}`);
            await uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((data) => {
                    setPhotoURL(data);
                })
            })
    
        } catch(error) {
            console.log('Error in uploading image', error);
        }
    }

    useEffect(() => {
        if(photoURL !== null){
            try{
                createUser();
            } catch (error) {
                console.log('Error in registering person', error)
            }

            resetFormFields();
        } return;
    }, [photoURL]);

    const createUser = async () => {
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName, email, photoURL});
            console.log('done');
            resetFormFields();
        } catch(error){
            console.log(error)
        }
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try{
            await uploadImages('userImages', profileIMG);    
        }catch(error) {
            console.log('Error', error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleFileInput = (event) => {
        setProfileIMG(event.target.files[0]);
    }
    return(
        <div className='sign-up-container'>
            <h1>Создайте аккаунт</h1>
            <form onSubmit = {handleSubmit} className = 'sign-up-form'>
                <TextField 
                    required
                    label = 'Имя'
                    variant = 'filled'
                    type="text"
                    name = 'displayName'
                    onChange={handleChange}
                    className = 'sign-up-input'
                    value={displayName}
                />

                <TextField
                    required
                    label = 'Фамилия' 
                    type="text"
                    variant = 'filled'
                    onChange = {handleChange}
                    name = 'surname'
                    placeholder = 'Enter surname'
                    className = 'sign-up-input'
                    value = {surname}
                />

                <TextField 
                    required
                    label = 'Электронная почта'
                    variant = 'filled'
                    type="email"
                    name = 'email'
                    onChange={handleChange}
                    className = 'sign-up-input'
                    value = {email}
                />

                <TextField
                    required
                    label = 'Пароль' 
                    type="password"
                    variant = 'filled'
                    onChange = {handleChange}
                    name = 'password'
                    className = 'sign-up-input'
                    value = {password}
                />

                <TextField
                    required
                    label = 'Подтвердить пароль' 
                    type="password"
                    variant = 'filled'
                    onChange = {handleChange}
                    name = 'confirmPassword'
                    className = 'sign-up-input'
                    value = {confirmPassword}
                />
                
                <label className='sign-up-file-input'>
                    Выбрать изображение профиля
                    <input type="file" accept="image/png, image/gif, image/jpeg" onChange = {handleFileInput}/>
                </label>              

                <Button type='submit' variant = 'contained' style = {{backgroundColor: 'black'}}>
                    Создать аккаунт
                </Button>
            </form>
        </div>
    )
}

export default SignUp;