import LOADING_ACTION_TYPES from "./loading.types";

export const LOADING_INITIAL_STATE = {
    loading: true
}

export const loadingReducer = (state = LOADING_INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOADING_ACTION_TYPES.SET_LOADING:
            return {
                ...state, 
                loading: payload
            };
        
        default:
            return state;
    }
}