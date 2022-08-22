import { useState } from 'react';
import { Link } from 'react-router-dom';

import './sign-in.styles.scss';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthmenuOpen } from '../../store/authmenu/authmenu.selector';
import { setIsAuthmenuOpen } from '../../store/authmenu/authmenu.action';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector(selectIsAuthmenuOpen);
    const toggleIsAuthmenuOpen = () => dispatch(setIsAuthmenuOpen(!isMenuOpen));
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-in-container" onClick = {(e) => e.stopPropagation()}>
            <div className="sign-in-title">
                <h2>Вход на udevs news</h2>
            </div>

            <form onSubmit = {handleSubmit}>
                <TextField 
                    label = 'Email'
                    variant = 'filled'
                    type="email"
                    required
                    name = 'email'
                    onChange={handleChange}
                />

                <TextField 
                    label = 'Password'
                    variant = 'filled'
                    type="password"
                    required
                    name = 'password'
                    placeholder='Пароль'
                    onChange={handleChange}
                />

                <div className='sign-in-button-container'>
                    <Button variant='contained' type = 'submit' style = {{backgroundColor: 'black'}}>Войти</Button>
                </div>
            </form>

            <Link to = '/signup' style = {{color: 'blue'}} onClick = {toggleIsAuthmenuOpen}>Нет аккаунта? Зарегестрируйтесь</Link>
        </div>
    )
}

export default SignIn;

