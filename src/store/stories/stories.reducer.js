import STORIES_ACTION_TYPE from "./stories.types";

const STORIES_INITIAL_STATE = {
    stories: []
}

export const storiesReducer = (state = STORIES_INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case STORIES_ACTION_TYPE.SET_STORIES_MAP:
            return {...state, stories: payload}
        
        default: 
            return state;
    }
}