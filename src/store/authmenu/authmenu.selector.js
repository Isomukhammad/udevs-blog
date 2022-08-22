import { createSelector } from 'reselect';

const selectAuthmenuReducer = state => state.authmenu;

export const selectIsAuthmenuOpen = createSelector(
    [selectAuthmenuReducer],
    (authmenu) => authmenu.isMenuOpen
)

export const selectIsAuthdropdownOpen = createSelector(
    [selectAuthmenuReducer],
    (authmenu) => authmenu.isAuthDropdownOpen
)
