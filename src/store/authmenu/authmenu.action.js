import AUTHMENU_ACTION_TYPES from "./authmenu.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsAuthmenuOpen = boolean => createAction(AUTHMENU_ACTION_TYPES.SET_IS_AUTHMENU_OPEN, boolean);

export const setIsAuthdropdownOpen = boolean => createAction(AUTHMENU_ACTION_TYPES.SET_IST_AUTHDROPDOWN_OPEN, boolean);