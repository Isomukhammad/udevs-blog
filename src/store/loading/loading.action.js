import { createAction } from "../../utils/reducer/reducer.utils";
import LOADING_ACTION_TYPES from "./loading.types";

export const setLoading = (boolean) => createAction(LOADING_ACTION_TYPES.SET_LOADING, boolean);
