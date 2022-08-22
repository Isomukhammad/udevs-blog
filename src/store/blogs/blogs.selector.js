import {createSelector} from 'reselect';

const selectBlogsReducer = (state) => state.blogs;

export const selectBlogs = createSelector(
    [selectBlogsReducer],
    (blogsSlice) => blogsSlice.blogs
)

export const selectBlogsMap = createSelector(
    [selectBlogsReducer],
    (blogsSlice) => blogsSlice.blogs
)

export const selectBlogsMapIsLoading = createSelector(
    [selectBlogsReducer],
    (blogsSlice) => blogsSlice.isLoading
)