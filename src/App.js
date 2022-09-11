import { useEffect } from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentUser } from './store/user/user.selector';

import { setCurrentUser, setUserInfo } from './store/user/user.action';

import { createUserDocumentFromAuth, onAuthStateListener, writeUserData } from './utils/firebase/firebase.utils';

import Home from './routes/home/home.component';
import SignUp from './components/sign-up/sign-up.component';
import Post from './routes/post/post.component';
import WrongPage from './routes/wrong-page/wrong-page.component';
import BlogPreview from './routes/blog-preview/blog-preview.component';
import Story from './routes/story/story.component';

import './App.css';
import Favorites from './routes/favorites/favorites.components';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
        
        writeUserData(user.uid).then((data) => {
          dispatch(setUserInfo(data))
        }, error => {
          console.log(error)
        })
        
      }
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  });
  
  return (
    <div className="App">
      <Routes>
        <Route index element = {<Home/>}/>
        <Route path = 'signup' element = {currentUser ? <Navigate to = '/' replace/> : <SignUp/>}/>
        <Route path = 'writepost' element = {currentUser ? <Post/> : <Navigate to = '/' replace/>}/>
        <Route path = 'favorites' element = {currentUser ? <Favorites/> : <Navigate to = '/' replace/>}/>
        <Route path = '/:category/:id/:url' element = {<BlogPreview/>}/>

        <Route path = '*' element = {<WrongPage/>}/>
        <Route path = '/stories/' element = {<Story/>}/>
      </Routes>
    </div>
  );
}

export default App;
