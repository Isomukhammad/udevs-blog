import BLOGS_ACTION_TYPES from "./blogs.types";

import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchBlogsMapStart = () => 
    createAction(BLOGS_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchBlogsMapSuccess = (blogsArray) => 
    createAction(
        BLOGS_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        blogsArray
    );

export const fetchBlogsMapFailed = (error) => 
    createAction(
        BLOGS_ACTION_TYPES.FETCH_CATEGORIES_FAILED, 
        error
);

export const fetchBlogsAsync = () => {
    return async (dispatch) => {
        dispatch(fetchBlogsMapStart());
        try{
            const blogsArray = await getCategoriesAndDocuments("blogs");
            dispatch(fetchBlogsMapSuccess(blogsArray));
        } catch (error) {
            dispatch(fetchBlogsMapFailed(error));
        }
    }
}