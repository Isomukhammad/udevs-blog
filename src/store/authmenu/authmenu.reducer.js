import AUTHMENU_ACTION_TYPES from "./authmenu.types";

const AUTHMENU_INITIAL_STATE = {
    isMenuOpen: false,
    isAuthDropdownOpen: false
}

export const authmenuReducer = (state = AUTHMENU_INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case AUTHMENU_ACTION_TYPES.SET_IS_AUTHMENU_OPEN:
            return{
                ...state,
                isMenuOpen: payload
            }

        case AUTHMENU_ACTION_TYPES.SET_IST_AUTHDROPDOWN_OPEN:
            return{
                ...state,
                isAuthDropdownOpen: payload
            }

        default:
            return state;
    }
}