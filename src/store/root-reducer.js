import {combineReducers} from 'redux';
import { authmenuReducer } from './authmenu/authmenu.reducer';
import { userReducer } from './user/user.reducer';
import { blogsReducer } from './blogs/blogs.reducer';
import { storiesReducer } from './stories/stories.reducer';

export const rootReducer = combineReducers({
    authmenu: authmenuReducer,
    user: userReducer,
    blogs: blogsReducer,
    stories: storiesReducer,
})